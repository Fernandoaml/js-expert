const { describe, it } = require("mocha");
const request = require("supertest");
const assert = require("assert");

const app = require("./api");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("Should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      // console.log(response);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "Olá Mundo!!!!!");
    });
  });

  describe("/login", () => {
    it("Should be can login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Fernando Leite", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "Logging has succeeded!");
    });
    it("It should be not can login successfully on the login route and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "LOGIN ERRADO", password: "123" })
        .expect(401);

      // console.log("RESPONSE: ", response.unauthorized);
      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "Logging failed");
    });
  });
});
