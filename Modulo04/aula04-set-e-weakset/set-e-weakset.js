const assert = require("assert");

// usado na maioria das vezes para listas de itens únicos.

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);

console.log("arr3", arr3.sort());
assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);
console.log("-----------------");

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

console.log("Set with add item per item:\n", set);
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);
// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);
console.log("-----------------\n");
console.log("set.keys: ", set.keys());
console.log("set.values: ", set.values());
console.log("-----------------\n");
// No array comum, para saber se um item existe:
// [].indexOf("1") !== -1 ou [0].includes(0)
assert.ok(set.has("3"));

// Mesma teoria do Map, mas você trabalha com a lista toda
// Não tem GET, então você pode saber se o item está ou não no array e é isso.
// na documentação tem exemplos sobre como fazer uma interceção, saber o que
// tem na lista e nao tem na outra, e assim por diante.

// tem nas duas listas:
const users1 = new Set(["Fernando", "Mariazinha", "Xuxa"]);

const users2 = new Set(["joaozinho", "julio", "Fernando"]);

const intersection = new Set([...users1].filter((user) => users2.has(user)));
console.log("Intersection: ", intersection);
assert.deepStrictEqual(Array.from(intersection), ["Fernando"]);
console.log("-----------------\n");
const difference = new Set([...users1].filter((user) => !users2.has(user)));
console.log("Difference: ", difference);
assert.deepStrictEqual(Array.from(difference), ["Mariazinha", "Xuxa"]);

// Weak Set segue a mesma ideia do Weak Map
