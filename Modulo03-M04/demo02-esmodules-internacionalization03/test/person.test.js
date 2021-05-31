import mocha from "mocha";
const { describe, it } = mocha;
import chai from "chai";
const { expect } = chai;
import Person from "./../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Carro 20000 2020-01-01 2020-02-01"
    );
    const expected = {
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      id: "1",
      kmTraveled: "20000",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("Should be format the values: ", () => {
    const person = new Person({
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      id: "1",
      kmTraveled: "20000",
    });
    const result = person.formatted("pt-BR");

    const expected = {
      id: 1,
      vehicles: "Bike e Carro",
      kmTraveled: "20.000 km",
      from: "01 de janeiro de 2020",
      to: "01 de fevereiro de 2020",
    };

    expect(result).to.be.deep.equal(expected);
  });
});