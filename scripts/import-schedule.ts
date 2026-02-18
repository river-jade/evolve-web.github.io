import csv from 'csvtojson';
import fs from 'fs';

// --- Google Sheets Config ---
// Map each year to a spreadsheet ID and day→GID mapping
const SHEETS: Record<string, { spreadsheetId: string; days: Record<string, string> }> = {
  '2026': {
    spreadsheetId: '1ROh4PM4yFxoDnSVIxh9DyX2x_Cahz2To7c-CO-vRS0s',
    days: {
      'Friday': '382714011',
      'Saturday': '124686118',
      'Sunday': '1286957533',
      'Monday': '759082878',
    }
  }
};

// Usage: npx tsx scripts/import-schedule.ts <year>
const year = process.argv[2];

if (!year || !SHEETS[year]) {
  console.error(`❌ Usage: npx tsx scripts/import-schedule.ts <year>`);
  console.error(`   Available years: ${Object.keys(SHEETS).join(', ')}`);
  process.exit(1);
}

const config = SHEETS[year];

const fetchSheet = async (gid: string): Promise<string> => {
  const url = `https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/export?format=csv&gid=${gid}`;
  console.log(`   Fetching gid=${gid}...`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch gid=${gid}: ${res.status} ${res.statusText}`);
  }
  return res.text();
};

const parseCSV = async (csvText: string, day: string) => {
  const json = await csv().fromString(csvText);

  // 1. Detect Venues (Headers that aren't "Time" or metadata)
  const headers = Object.keys(json[0]);
  const venues = headers.filter(h =>
    !['Time', 'field1', 'field2'].includes(h) && h.trim().length > 0
  );

  const events: any[] = [];

  // 2. Extract valid time rows only
  const timeRows = json.filter(row => row['Time'] && row['Time'].match(/\d{1,2}:\d{2}/));

  venues.forEach(venue => {
    let currentEvent: any = null;

    timeRows.forEach((row, index) => {
      const time = row['Time'];
      const content = row[venue]?.trim();

      // Determine the tentative end time (start of the next slot)
      const nextRow = timeRows[index + 1];
      const nextTime = nextRow ? nextRow['Time'] : null;

      if (!content) return; // Empty cell

      // CLEANUP: If the content is just "(continued)", we extend the previous event
      if (content.toLowerCase().includes('(continued)')) {
        if (currentEvent && nextTime) {
          currentEvent.end_time = nextTime;
        }
        return;
      }

      // NEW EVENT
      // Parse "Title with Facilitator"
      const withMatch = content.match(/^(.*)\s+with\s+(.*)$/i);

      let title = content;
      let facilitator = null;

      if (withMatch) {
        title = withMatch[1].trim();
        facilitator = withMatch[2].trim();
      }

      // Check for breaks
      const isBreak = ['lunch', 'dinner', 'break'].includes(title.toLowerCase());

      const newEvent = {
        id: `${year}-${venue}-${time}-${index}`,
        day,
        venue,
        start_time: time,
        end_time: nextTime || "Close",
        title: isBreak ? title : title,
        facilitator: facilitator,
        type: isBreak ? 'break' : 'workshop'
      };

      events.push(newEvent);
      currentEvent = newEvent;
    });
  });

  return events;
};

(async () => {
  try {
    console.log(`📥 Importing schedule for ${year} from Google Sheets...`);

    const allEvents: any[] = [];

    for (const [day, gid] of Object.entries(config.days)) {
      const csvText = await fetchSheet(gid);
      const events = await parseCSV(csvText, day);
      allEvents.push(...events);
      console.log(`   ✓ ${day}: ${events.length} events`);
    }

    // Output path matching your project structure
    const outputPath = `data/schedule-${year}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(allEvents, null, 2));

    console.log(`\n✅ Successfully generated ${outputPath}`);
    console.log(`   Items: ${allEvents.length}`);
    console.log(`   Days: ${Array.from(new Set(allEvents.map(e => e.day))).join(', ')}`);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();