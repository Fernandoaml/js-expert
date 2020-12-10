class fibonacci {
  *execute(input, current = 0, next = 1) {
    console.count("Executou");
    if (input === 0) {
      return 0;
    }
    //retorna o valor
    yield current;
    //yield* delega a função, mas nao retorna valor
    yield* this.execute(input - 1, next, current + next);
  }
}
module.exports = fibonacci;
