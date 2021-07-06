import { pipeline, Readable, Writable } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);
const readableStream = new Readable({
  read: function () {
    this.push("Hello Dude!! 0");
    this.push("Hello Dude!! 1");
    this.push("Hello Dude!! 2");
    this.push(null); // para falar que o processo acabou
  },
});

const writableStream = Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

await pipelineAsync(
  readableStream,
  // process.stdout,
  writableStream
);
