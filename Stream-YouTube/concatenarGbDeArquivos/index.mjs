// console.log(await Promise.resolve(true));
// console.log(import.meta.url);
import { dirname, join } from "path";
import { promisify } from "util";
import { promises, createReadStream, createWriteStream } from "fs";
import { pipeline, Transform } from "stream";
const pipelineAsync = promisify(pipeline);

import csvToJson from "csvtojson";
import jsonToCsv from "json-to-csv-stream";
import StreamConcat from "stream-concat";

const { readdir } = promises;
import debug from "debug";
const log = debug("app:concat");

const { pathname: currentFile } = new URL(import.meta.url);

// console.log(`Endereço do arquivo atual: ${currentFile}`);
const cwd = dirname(currentFile);
// console.log(`Endereço da pasta do arquivo atual: ${cwd}`);

const fileDir = `${cwd}/dataset`;
const filepath = fileDir.replace("/E:", "");
const output = `${cwd}/final.csv`;
const outputFile = output.replace("/E:", "");
// console.log(`${fileDir} \n ${output}`);

console.time("concat-data");
const files = (await readdir(filepath)).filter(
  (item) => !!!~item.indexOf(".zip")
);
log(`Processing: ${files}`);
const ONE_SECOND = 1000;
setInterval(() => process.stdout.write("."), ONE_SECOND).unref();
// setTimeout(() => {
//   // console.log("ok");
// }, 20000);

// const combinedStreams = createReadStream(join(filepath, files[0]));
const streams = files.map((item) => createReadStream(join(filepath, item)));
const combinedStreams = new StreamConcat(streams);
const finalStream = createWriteStream(outputFile);
const handleStream = new Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk);
    const output = {
      id: data.Respondent,
      country: data.Country,
    };
    // console.log("output", output);
    return callback(null, JSON.stringify(output));
  },
});
await pipelineAsync(
  combinedStreams,
  csvToJson(),
  handleStream,
  jsonToCsv(),
  finalStream
);
log(`${files.length} files merged! on ${outputFile}`);
console.timeEnd("concat-data");
