const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    console.log(result);
    const expected = [
      {
        name: "Fernando Leite",
        id: 123,
        profession: "desenvolvedor",
        birthDay: 1991,
      },
      {
        name: "Juliana Santana",
        id: 234,
        profession: "supervisora",
        birthDay: 1990,
      },
      {
        name: "Fulano de Tal",
        id: 345,
        profession: "estudante",
        birthDay: 1996,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
