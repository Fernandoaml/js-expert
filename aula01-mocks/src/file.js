const { readFile } = require("fs/promises");
const User = require("./user");

const { error } = require("./constants");

const DEFAULTOPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    return File.parseCSVToJSON(content);
  }

  static async getFileContent(filePath) {
    // const fileName = join(__dirname, filePath);

    // Foi INSERIDO O () para que seja resolvido primeiro o READFILE e depois converta para toString com
    // encode UTF-8
    return (await readFile(filePath)).toString("utf-8");
  }

  static isValid(csvString, options = DEFAULTOPTION) {
    const [header, ...fileWithOutHeader] = csvString.split("\r\n"); // Para Windows
    // const [header, ...fileWithOutHeader] = csvString.split("\r\n"); // etc..
    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengthAccepted =
      fileWithOutHeader.length > 0 &&
      fileWithOutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }
    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split("\r\n");
    // console.log("LINES:", lines);
    // Shift remove o primeiro elemento do array adicionando na variavel e modificando o tamanho do array
    const firstLine = lines.shift();
    // console.log("FIRSTLINE:", firstLine);
    const header = firstLine.split(",");
    // console.log(header);
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      // console.log(user);
      return new User(user);
    });
    // console.log(users);
    return users;
  }
}

module.exports = File;
