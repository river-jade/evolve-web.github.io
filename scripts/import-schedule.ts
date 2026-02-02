import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

// Usage: node scripts/import-schedule.ts 2025 "data/Saturday.csv" "data/Sunday.csv" ...
const args = process.argv.slice(2);
const year = args[0];
const files = args.slice(1);

if (!year || files.length === 0) {
  console.error("❌ Usage: node scripts/import-schedule.ts <year> <csv_file_1> [csv_file_2 ...]");
  process.exit(1);
}

const parseFile = async (filePath: string) => {
  const json = await csv().fromFile(filePath);
  
  // 1. Detect Venues (Headers that aren't "Time" or metadata)
  // We grab the first row to check keys
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
      // Regex: Matches "Something with Someone" case-insensitive
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
        id: `${year}-${venue}-${time}-${index}`, // unique key
        // Infer Day from filename is simplest (e.g., "Saturday.csv") 
        day: path.basename(filePath).split('.')[0].trim(), 
        venue,
        start_time: time,
        end_time: nextTime || "Close", // Default end if last slot
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
    const allEvents = (await Promise.all(files.map(parseFile))).flat();
    
    // Output path matching your project structure
    const outputPath = `data/schedule-${year}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(allEvents, null, 2));

    console.log(`✅ Successfully generated ${outputPath}`);
    console.log(`   Items: ${allEvents.length}`);
    console.log(`   Days found: ${Array.from(new Set(allEvents.map(e => e.day))).join(', ')}`);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();