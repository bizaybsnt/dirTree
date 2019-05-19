const fs = require("fs"),
  path = require("path");

if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " path/to/directory");
  process.exit(-1);
}

function dirTree(filename) {
  try {
    const stats = fs.lstatSync(filename),
      info = {
        path: filename,
        name: path.basename(filename)
      };

    if (stats.isDirectory()) {
      info.type = "folder";
      info.children = fs.readdirSync(filename).map(function(child) {
        return dirTree(filename + "\\" + child);
      });
    } else {
      info.type = "file";
    }

    return info;
  } catch (err) {
    console.error(err);
  }
}

function renderTree(parent, tab = "") {
  process.stdout.write(`${tab}${parent.name}\n`);
  parent.children &&
    parent.children.forEach(child => {
      renderTree(child, `${tab}|--`);
    });
}

const tree = dirTree(process.argv[2]);
console.log(tree);

renderTree(tree);
