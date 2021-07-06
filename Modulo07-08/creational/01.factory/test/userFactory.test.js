const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

// Pode estar em outro arquivo

const dbData = [{ name: "Fulana da Silva" }, { name: "Fulano de Tal" }];

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

// Pode estar em outro arquivo

rewiremock(() => require("./../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "FULANA DA SILVA" }, { name: "FULANO DE TAL" }];
    rewiremock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [{ name: "FERNANDO_LEITE" }];
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
