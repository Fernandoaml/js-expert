const ProductMotherObject = require("./model/ProductMotherObject");
const { expect } = require("chai");
const { it, describe } = require("mocha");
const { productValidator } = require("../src/index");

describe("Test Mother Object", () => {
  it("Should't return error with valid product", () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });
  describe("Product Validation Rules", () => {
    it("Should be return an object error when creating a Product with an invalid ID", () => {
      const product = ProductMotherObject.withInvalidId();
      const result = productValidator(product);

      const expected = {
        errors: [
          "id: invalid length, current [1] expected to be between 2 and 20",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("Should be return an object error when creating a Product with an invalid NAME", () => {
      const product = ProductMotherObject.withInvalidName();
      const result = productValidator(product);

      const expected = {
        errors: [
          "name: invalid value, the current [abc123] expected to have only words",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("Should be return an object error when creating a Product with an invalid PRICE", () => {
      const product = ProductMotherObject.withInvalidPrice();
      const result = productValidator(product);

      const expected = {
        errors: [
          "price: invalid value, the current [1999] expected to be between 1 and 1000",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("Should be return an object error when creating a Product with an invalid CATEGORY", () => {
      const product = ProductMotherObject.withInvalidCategory();
      const result = productValidator(product);

      const expected = {
        errors: [
          "category: invalid value, the current [mechanic] expected to be either electronic or a organic.",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
