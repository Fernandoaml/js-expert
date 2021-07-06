import { pipeline, Readable, Writable, Transform } from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";

const pipelineAsync = promisify(pipeline);
const readableStream = new Readable({
  read: function () {
    for (let index = 0; index < 1e5; index++) {
      const person = { id: Date.now() + index, name: `Fernando-${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }
    this.push(null);
  },
});

const writableMapToCSV = new Transform({
  transform(chunk, encoding, callback) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    callback(null, result);
  },
});

const setHeader = new Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return callback(null, chunk);
    }
    this.counter += 1;
    return callback(null, "Id,Name\n".concat(chunk));
  },
});

const writableStream = new Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

await pipelineAsync(
  readableStream,
  writableMapToCSV,
  setHeader,
  createWriteStream("my.csv")
  // process.stdout
  // writableStream
);
