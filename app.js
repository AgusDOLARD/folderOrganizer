const chokidar = require("chokidar");
const notifier = require("node-notifier");
const path = require("path");
const fs = require("fs");

const homedir = require("os").homedir();

const originDir = "Downloads";

const watchFolder = path.join(homedir, originDir);
const { filetypes } = require("./filetypes");

const watcher = chokidar.watch(watchFolder, {
  persistent: true,
  ignoreInitial: false,
  recursive: false,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

const moveFile = (filePath, finalDirectory) => {
  const file = path.relative(homedir, finalDirectory).split("/");
  if (fs.existsSync(path.join(homedir, ...file)))
    fs.mkdirSync(path.join(homedir, ...file));

  try {
    fs.renameSync(filePath, finalDirectory);
    const message = `${file.pop()} was moved to ${path.join(...file)}`;
    console.log(message);
    notifier.notify({
      title: "File moved successfully!",
      message,
    });
  } catch (err) {
    console.error(err);
    notifier.notify({
      title: "Error moving file",
      message: "There it was an error when trying to move the file",
    });
  }
};

watcher.on("ready", () =>
  notifier.notify({
    title: "File Organizer",
    message: "Ready to move! ✌🏿",
  })
);

watcher.on("add", (filePath) => {
  const fileName = filePath.split("/").pop();

  filetypes.forEach((element) => {
    const type = element[0];
    const newFilePath = path.join(element[1], fileName);

    if (fileName.endsWith(type)) {
      moveFile(filePath, newFilePath);
    }
  });
});
