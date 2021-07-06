// process.stdin
//   .pipe(process.stdout)
//   .on("data", (msg) => console.log("Data terminal: ", msg.toString()));

// -----------------------------------------------------------------------//

// const stdin = process.stdin.on("data", (msg) =>
//   console.log("Data terminal: ", msg.toString())
// );
//
// stdin.pipe(process.stdout);
// -----------------------------------------------------------------------//

const stdin = process.stdin.on("data", (msg) =>
  console.log("Entrada terminal: ", msg.toString())
);

const stdout = process.stdout.on("data", (msg) =>
  console.log("Saida terminal: ", msg.toString())
);

stdin.pipe(stdout);
// Todos os eventos que estavam no stdin, foi jogado fora.
// Passando para frente e anexando o evento do stdout.

// olá
// Saida terminal:  olá
