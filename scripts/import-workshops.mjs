import csv from 'csvtojson';
import {slugify} from '../app/lib/utils.ts';

const year = process.argv[2];

if (!year) {
  console.error("❌ Error: Please provide a year. Usage: node scripts/import-workshops.js 2025");
  process.exit(1);
}
csv()
  .fromFile('./data.csv')
  .then((jsonObj) => {
    const exportList = jsonObj.filter(workshop => workshop["I'm happy for you to post my workshop / picture / bio to the Facebook event"] === "Yes")
      .map(workshop => {
        const photoField = workshop["Facilitator or workshop photo"];
        const driveId = photoField?.match(/id=([^&]+)/)?.[1];
        const url = `https://drive.google.com/uc?export=view&id=${driveId}`
        const thumbnail = `https://drive.google.com/thumbnail?id=${driveId}`
        const name = workshop["Facilitator name(s)"].trim()
        return {
          facilitator_name: name,
          workshop_name: workshop["Workshop title"].trim(),
          details: workshop["Description of the workshop"].trim(),
          thumbnail_url: thumbnail,
          image_url: url,
          bio: workshop["Facilitator Bio(s)"].trim(),
          slug: slugify(name)
        }
      })
      .filter(({ workshop_name }) => !!workshop_name)
    console.log(JSON.stringify(exportList, null, 2))
  });
