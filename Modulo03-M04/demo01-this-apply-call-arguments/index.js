"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("This: ", this);
    console.log("arguments: ", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   // console.log("Index.js: ", event, filename);
//   console.log((await readFile(filename)).toString());
// });

const file = new File();
// Desta forma, ele ignora o This da classe File
// herda o This do Watch
// watch(__filename, file.watch);

// Primeira alternativa:
// Para herdar o this da função:
// Opção porca
// watch(__filename, (event, filename) => file.watch(event, filename));

//----------------------------------------------//
// watch(__filename, file.watch.bind(file));
// O que o bind fez?
// subistituiu o this da FSWATCH
// criando uma nova função com o contexto do file
//----------------------------------------------//

file.watch.call(
  { showContent: () => console.log("Call: Hey Sinon!") },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log("Apply: Hey Sinon!") }, [
  null,
  __filename,
]);
