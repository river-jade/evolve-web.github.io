import csv from 'csvtojson';
import { slugify } from '../lib/utils.js';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import crypto from 'crypto';

const import_file = process.argv[2];
const year = process.argv[3];

type Workshop = {
  facilitator_name: string;
  workshop_name: string;
  details: string;
  bio: string;
  slug?: string;
  image?: string;
  _driveId?: string; // internal use only
}

const usage = "Usage: node scripts/import-workshops.js <import_file> <year>";
if (!import_file) {
  console.error(`❌ Error: Please provide an import file. ${usage}`);
  process.exit(1);
}
if (!year) {
  console.error(`❌ Error: Please provide a year. ${usage}`);
  process.exit(1);
}
csv()
  .fromFile(import_file)
  .then(async (jsonObj) => {
    const exportList = jsonObj.filter(workshop => workshop["I'm happy for you to post my workshop / picture / bio to the Facebook event / Evolve website"] === "Yes")
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
          // Temporary internal fields for the image processor
          _driveId: driveId,
        }
      })
      .filter(({ workshop_name }) => !!workshop_name)
    await downloadAndProcessImages(exportList)
    fs.writeFileSync(`data/workshops-${year}.json`, JSON.stringify(exportList, null, 2))
    console.log(`✅ Successfully imported ${exportList.length} workshops for ${year} from ${import_file}`)
  });

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
      // Check if file exists on disk to save time (optional)
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