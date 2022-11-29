const readFolder = (path, folders, data) => {
  let filenames = fs.readdirSync(path);
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
