const assert = require("assert");
const myMap = new Map();

// Pode ter qualquer coisa como chave

myMap
  .set(1, "one")
  .set("Fernando", { text: "two" })
  .set(true, () => "hello");

// Usando um construtor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

console.log("myMap: ", myMap);
console.log("----------");
console.log("myMap.get(1): ", myMap.get(1));
console.log("----------");
assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Fernando"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em Objects a chave só pode ser string ou symbol (number é coergido a string).
const onlyWorksByNameReference = { id: 1 };
myMap.set(onlyWorksByNameReference, { name: "Fernando Leite" });
console.log("get", myMap.get(onlyWorksByNameReference));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyWorksByNameReference), {
  name: "Fernando Leite",
});
console.log("----------");
// Utilitários
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// Para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito correto em Object é ({name: 'Fernando'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyWorksByNameReference));

// para remover um item do objeto
// delete item.id
// imperformático para o Js
assert.ok(myMap.delete(onlyWorksByNameReference));

// Não da para iterar em Objects diretamente.
// "Dá utilizando o (for in), vai pegar o index, que vai pegar a chave e
// retornar o valor."
// Se quiser pegar chave/valor tem que transformar com Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Fernando", { text: "two" }],
    [true, () => {}],
  ])
);

for (const [key, value] of myMap) {
  console.log(key, value);
}
console.log("----------");

// Object é inseguro, pois dependendo do nome da chave, pode substituir
// algum comportamento
// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey' -> Vai quebrar o programa

// Qualquer chave pode colidir, com as propiedades herdadas do objeto, como
// constructor, toString, valueOf e etc.

const actor = {
  name: "Xuxa da Silva",
  toString: "Lixo: Xuxa da Silva",
};

// Não tem restrição de nome de chave
myMap.set(actor);
assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não da para limpar um Objeto sem reassina-lo
// Passar undefined para cada propriedade ou deletar o Objeto..
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

const weakMap = new WeakMap();
const hero = { name: "Flash" };

weakMap.has(hero);
console.log(weakMap.get(hero));
