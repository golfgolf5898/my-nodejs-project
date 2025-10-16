import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    {
      type: "input",
      message: "Type in URL:",
      name: "URL",
    },
  ])
  .then((answer) => {
    const url = answer.URL;
    const qr_svg = qr.image(url, { type: "png" });


    qr_svg.pipe(fs.createWriteStream("qr.png"));

    console.log("✅ QR code generated as 'qr.png'");

  fs.writeFile("url.txt", url, (err) => {
      if (err) throw err;
      console.log("the file has been saved!✅✅✅");
    });
  })

  .catch((error) => {
    if (error.isTtyError) {
      console.error("This terminal does not support inquirer.");
    } else {
      console.error("An error occurred:", error);
    }
  });
