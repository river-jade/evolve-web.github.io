import csv from 'csvtojson';
import { slugify } from '../lib/utils.js';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import crypto from 'crypto';

// --- Google Sheets Config ---
// Map each year to a spreadsheet ID and GID for the workshops tab
const SHEETS: Record<string, { spreadsheetId: string; gid: string }> = {
  '2026': {
    spreadsheetId: '1gfzsn0zmP-0JXf-s9GCAWJdGTw5f4AhnfQ0L4INUzxo',
    gid: '2079811075',
  }
};

type Workshop = {
  facilitator_name: string;
  workshop_name: string;
  details: string;
  bio: string;
  slug?: string;
  image?: string;
  _driveId?: string; // internal use only
}

// Usage: npx tsx scripts/import-workshops.ts <year>
const year = process.argv[2];

if (!year || !SHEETS[year]) {
  console.error(`❌ Usage: npx tsx scripts/import-workshops.ts <year>`);
  console.error(`   Available years: ${Object.keys(SHEETS).join(', ')}`);
  process.exit(1);
}

const config = SHEETS[year];

const fetchSheet = async (): Promise<string> => {
  const url = `https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/export?format=csv&gid=${config.gid}`;
  console.log(`📥 Fetching workshops for ${year} from Google Sheets...`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet: ${res.status} ${res.statusText}`);
  }
  return res.text();
};

const downloadAndProcessImages = async (list: Workshop[]) => {
  const imageDir = path.join(process.cwd(), 'public/images/facilitator-images');
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

  console.log(`📸 Processing images for ${list.length} workshops...`);

  for (const item of list) {
    // Skip if no image provided
    if (!item._driveId) {
      delete item._driveId;
      continue;
    }

    // Construct unique filename: slug + driveID
    const shortHash = crypto.createHash('md5').update(item._driveId).digest('hex').slice(0, 6);
    const filename = `${item.slug}-${shortHash}.jpg`;
    const filepath = path.join(imageDir, filename);

    try {
      // Check if file exists on disk to save time
      if (!fs.existsSync(filepath)) {
        const response = await fetch(`https://drive.google.com/uc?export=download&id=${item._driveId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const buffer = await response.arrayBuffer();

        await sharp(Buffer.from(buffer))
          .rotate()
          .resize(800, 800, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(filepath);

        process.stdout.write('.'); // Downloaded
      } else {
        process.stdout.write('s'); // Skipped (already exists)
      }
    } catch (e) {
      console.error(`\n❌ Failed image for ${item.facilitator_name}: ${e.message}`);
    }

    // Assign final filename and clean up internal props
    item.image = filename;
    delete item._driveId;
  }
  console.log('\n');
}

(async () => {
  try {
    const csvText = await fetchSheet();
    const jsonObj = await csv().fromString(csvText);

    const exportList = jsonObj
      .filter(workshop => workshop["I'm happy for you to post my workshop / picture / bio to the Facebook event / Evolve website"] === "Yes")
      .filter(workshop => workshop["Include in Evolve"] === "Yes")
      .map(workshop => {
        const photoField = workshop["Facilitator or workshop photo"]

        const driveId = photoField?.match(/id=([^&]+)/)?.[1];
        const name = workshop["Facilitator name(s)"].trim()

        return {
          facilitator_name: name,
          workshop_name: workshop["Workshop title"].trim(),
          details: workshop["Description of the workshop"].trim(),
          bio: workshop["Facilitator Bio(s)"].trim(),
          slug: slugify(name),
          _driveId: driveId,
        }
      })
      .filter(({ workshop_name }) => !!workshop_name)

    await downloadAndProcessImages(exportList)

    const outputPath = `data/workshops-${year}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(exportList, null, 2))
    console.log(`✅ Successfully imported ${exportList.length} workshops for ${year}`)
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();