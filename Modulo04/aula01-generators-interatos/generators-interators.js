const assert = require("assert");

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "Mundo";
  yield* calculation(2, 2);
  // Passar a função sem um * ele nao vai executar
}

const generator = main();
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "Mundo", done: false });
assert.deepStrictEqual(generator.next(), { value: 4, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ["Hello", "-", "Mundo", 4]);
assert.deepStrictEqual([...main()], ["Hello", "-", "Mundo", 4]);

//-----Async Interators
const { readFile, stat, readdir } = require("fs/promises");
function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey Dude");
}

async function* sytemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString("utf8", 0, 1) };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

// console.log("Promisified: ", [...promisified()]);

// Promise.all([...promisified()]).then(
//   (result) => console.log("Promisified: ", result) //.toString())
// );

// (async () => {
//   for await (const item of promisified()) {
//     console.log(item);
//   }
// })();

(async () => {
  for await (const item of sytemInfo()) {
    console.log(item);
  }
})();
