const { evaluateRegex } = require("./util");

// O objetivo do Fluent API é executar tarefas como um pipeline
// step by step e no fim, chama o build.
// Muito similar ao padrão builder a diferença que aqui é sobre
// processos, o Builder sobre construcao de objetos.

class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );
    const onlyPerson = this.#content.match(matchPerson);
    this.#content = onlyPerson;
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));
    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpaces, ""))
    );

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
