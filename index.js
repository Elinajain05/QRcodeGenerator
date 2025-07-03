import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    // Extract main domain name (like youtube from https://www.youtube.com)
    const domain = url.replace(/^https?:\/\//, '')     // removing http:// or https://
                      .replace(/^www\./, '')           // remove www.
                      .split('.')[0];                  // take only the first part

    const fileName = `qr_img_${domain}.png`;

    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(fileName));
    fs.appendFile("URL.txt", url + "\n", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

