// O objetivo do Fluent API é executar tarefas como um pipeline
// step by step e no fim, chama o build.
// Muito similar ao padrão builder a diferença que aqui é sobre
// processos, o Builder sobre construcao de objetos.

class TextProcessorFluentAPI {
    #content
    constructor(content) {
        this.#content = content;
    }

    extractPeopleData() {
        return this;
    }

    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI