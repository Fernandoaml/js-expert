"use strict";

const assert = require("assert");
// Garantir a semantica e segurança em objetos

// --- apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// Um problema que pode acontecer (raro)
// Function.prototype.apply = () => {throw new TypeError('Vixxx')}

// Esse pode acontecer

myObj.add.apply = function () {
  throw new TypeError("Vixxx");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Vixxx",
});

// Usando o reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// END apply

// --- defineProperty -> Que são questões semânticas
function MyDate() {}

// FEIO... Tudo é OBJECT, mas Object adicionando propiedade a uma Function???
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });

// Fica Semântico
Reflect.defineProperty(MyDate, "withReflect", { value: () => "Hey Dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there");
assert.deepStrictEqual(MyDate.withReflect(), "Hey Dude");

// END defineProperty

// --- deleteProperty
const withDelete = { user: "Fernando Leite" };
// imperformatico, evitar ao máximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

// Utilizando o Reflect, respeitamos o ciclo de vida do Js.
const withReflection = { user: "Fulano de Tal" };
Reflect.deleteProperty(withReflection, "user");
assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false);
// --- END deleteProperty

// -- GET

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual((1)["userName"], undefined);

// Utilizando o Reflection, uma exceção é lançada.
assert.throws(() => Reflect.get(1, "userName"), TypeError);
// -- END GET

//-- HAS

assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// -- END HAS

// -- OWNKEYS
// Se quiser pegar o Symbols e os objetos, devemos fazer duas chamadas
// diferentes quando utilizado o métodos de Object
const user = Symbol("user");
const databaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "Fernando Leite",
};

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];
console.log("objectKeys: ", objectKeys);
assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);
console.log("-----------");
// Utilizando reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  "id",
  Symbol.for("password"),
  user,
]);
