import { writeFile, readFile } from "fs/promises";

export const save = async (data) => {
  // nao tem __filename, __dirname

  let { pathname: dataBaseFile } = new URL(
    "./../database.json",
    import.meta.url
  );
  const match = dataBaseFile.replace("/E:", "");
  console.log("DataBaseFileULR: ", match);

  const currentData = JSON.parse(await readFile(match));
  currentData.push(data);

  await writeFile(match, JSON.stringify(currentData));
};
