const csv = require('csvtojson');

// Convert from file path
csv()
  .fromFile('./data.csv')
  .then((jsonObj) => {
    exportList = jsonObj.filter(workshop => workshop["I'm happy for you to post my workshop / picture / bio to the Facebook event"] === "Yes")
    .map(workshop => {
      const photoField = workshop["Facilitator or workshop photo"];
      const driveId = photoField?.match(/id=([^&]+)/)?.[1];
      const url = `https://drive.google.com/uc?export=view&id=${driveId}`
      const thumbnail = `https://drive.google.com/thumbnail?id=${driveId}`
      return {
        Name: workshop["Facilitator name(s)"],
        "Workshop name": workshop["Workshop title"],
        Details: workshop["Description of the workshop"],
        thumbnail_url: thumbnail,
        image_url: url
      }
    })
    console.log(JSON.stringify(exportList, null, 2))
  });
