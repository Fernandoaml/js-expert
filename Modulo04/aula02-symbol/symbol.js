const assert = require("assert");

// -- Chaves

const uniqueKey = Symbol("userName");
// Garante que esta chave é única em referência a endereço de memória.
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for symbol";

// console.log("getting normal Objects", user.userName);
// console.log("Failed to get Symbol Object", user[Symbol("userName")]);
// console.log("Failed to get Symbol Object", user[uniqueKey]);

assert.deepStrictEqual(user.userName, "value for normal Objects");

// Sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for symbol");

// console.log("Symbols", Object.getOwnPropertySymbols(user));
// É difícil de pegar o valor contido, mas não é secreto.
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// Well Know Symbols
// Poderia ser qualquer coisa.
const obj = {
  //iterators === * da função por debaixo dos panos
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        //retorna o último valor e o remove.
        value: this.items.pop(),
      };
    },
  }),
};
// console.log(Array.from(obj));
// console.log(...obj);
// for (const item of obj) {
//   console.log(item);
// }
assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const itens = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );
    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(itens);
  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }
  async *[Symbol.iterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
  get [Symbol.toStringTag]() {
    return "WHAT?";
  }
}
const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);

const expectedDates = [new Date(2020, 3, 1), new Date(2018, 2, 2)];

console.log(myDate);
// assert.deepStrictEqual(Object.prototype.toString.call(myDate), null);
assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object" + " WHAT?]"
);
// Coerção implicita para forçar o erro.
assert.throws(() => myDate + 1, TypeError);

// Coerção explicita para chamar o toPrimitive
console.log("String(myDate): ", String(myDate));
assert.deepStrictEqual(
  String(myDate),
  "01 de abril de 2020 e 02 de março de" + " 2018"
);

// Implementa o interator
assert.deepStrictEqual([...myDate], expectedDates);

// (async () => {
//   for await (const item of myDate) {
//     console.log("asyncIterator: ", item);
//   }
// })();

// (async () => {
//   const dates = await Promise.all([...myDate]);
//   assert.deepStrictEqual(dates, expectedDates);
// })();

(async () => {
  const dates = [];

  for await (const date of collection) {
    console.log(date);
    dates.push(date);
  }

  const expectedDatesInISOString = expectedDates.map((item) =>
    item.toISOString()
  );

  assert.deepStrictEqual(dates, expectedDatesInISOString);
})();
