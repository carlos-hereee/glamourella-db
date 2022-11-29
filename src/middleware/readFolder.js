const fs = require("fs");
const { v4 } = require("uuid");

const readFolder = (path, folders, data) => {
  let filenames = fs.readdirSync(path);
  let randomNum = (num1, num2) => {
    return Math.floor(Math.random() * (num1 - num2 + 1) + num2);
  };
  let lorem =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit." +
    "Dolor facilis commodi qui optio, quos quidem odio a vitae" +
    "nulla facere? Rem facilis esse cum earum amet, enim iure" +
    "tempora eveniet.";
  filenames.forEach((file) => {
    // if file has an extension its an assets
    const extension = file.split(".");
    const artistName =
      extension[0].includes("unsplash") && extension[0].split("-").join(" ");
    if (extension[1]) {
      const type = path.split("/");
      return data.push({
        uid: v4(),
        artistName,
        file,
        path: `${path}/${file}`,
        src: `${process.env.DB_URL}gallery/photo/?path=${path}/${file}`,
        cost: randomNum(10, 50),
        description: lorem,
        type: type[type.length - 1],
      });
      // else its a folder
    } else {
      folders.push(`${path}/${file}`);
    }
  });
};

module.exports = readFolder;
