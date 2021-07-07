const ProductDataBuilder = require("./model/productDataBuilder");
const { expect } = require("chai");
const { it, describe } = require("mocha");
const { productValidator } = require("../src/index");

describe("Test Data Builder", () => {
  it("Should't return error with valid product", () => {
    const product = ProductDataBuilder.aProduct().build();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });
  describe("Product Validation Rules", () => {
    it("Should be return an object error when creating a Product with an invalid ID", () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build();
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
      const product = ProductDataBuilder.aProduct().withInvalidName().build();
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
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build();
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
      const product = ProductDataBuilder.aProduct()
        .withInvalidCategory()
        .build();
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
