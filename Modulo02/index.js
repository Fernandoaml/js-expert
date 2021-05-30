const item = {
  name: "Fernando Leite",
  age: 31,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: "dude" };
    // return 007;
  },
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to: ", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "007",
    };
    return types[coercionType] || types.string;
  },
};

console.log("String: ", String(item));
console.log("Number", Number(item));
console.log("Default", new Date(item));
