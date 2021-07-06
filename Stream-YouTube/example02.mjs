import http from "http";
import { readFileSync, createReadStream } from "fs";

// 2
// Comando a ser rodado:
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

// http
//   .createServer((req, res) => {
//     // const file = readFileSync(`big.file`); //.toString();
//     // res.write(file);
//     // res.end();
//
//     createReadStream("big.file ").pipe(res);
//   })
//   .listen(3000, () => console.log("running at 3000"));

//3
// Utilizando Socket
// import net from "net";
// net.createServer((socket) => socket.pipe(process.stdout)).listen(1338);

// node -e "process.stdin.pipe(require('net').connect(1338))"
