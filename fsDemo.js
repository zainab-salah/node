//import fs from 'fs';
import fs from "fs/promises";
// fs.readFile('path', 'encoding', callback) is asynchronous
// fs.readFile('./text.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
//     }
// );

// readFileSync is synchronous v
// const data = fs.readFileSync('./text.txt', 'utf8');
// console.log(data)

// readFile - Promise .Then() or async/await

fs.readFile("./text.txt", "utf8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// async await

const readText = async () => {
  try {
    const data = await fs.readFile("./text.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const writeText = async () => {
  try {
    await fs.writeFile("./text.txt", "Hello World");
    console.log("File written");
  } catch (err) {
    console.error(err);
  }
};

const appendText = async () => {
  try {
    await fs.appendFile("./text.txt", "Hello World ");
    console.log("File appended");
  } catch (err) {
    console.error(err);
  }
};
writeText();
appendText();
readText();
