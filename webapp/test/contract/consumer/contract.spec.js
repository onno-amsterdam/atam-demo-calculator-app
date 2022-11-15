const { pactWith } = require("jest-pact");
const { Interaction, Matchers } = require("@pact-foundation/pact");

const { postAddUpRequest } = require("../../../public/script/script");

const jestPactOptions = {
  consumer: "Add-up calculator app",
  provider: "Add-up calculator service",
  dir: "./pacts",
  logDir: "./pacts/logs",
  logLevel: "info",
  port: 4000,
  host: "localhost",
};

pactWith(jestPactOptions, (provider) => {
  describe("Calculate Service - Add up", () => {
    beforeEach(() => {
      const interaction = new Interaction()
        .given("A sum 5 with 5")
        .uponReceiving("A request to add up two numbers")
        .withRequest({
          method: "POST",
          path: "/add-up",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: { num1: 5, num2: 5 },
        })
        .willRespondWith({
          status: 200,
          body: Matchers.somethingLike({ result: 5 }),
        });

      return provider.addInteraction(interaction);
    });

    it("GET /add-up should return a successful body with result", async () => {
      await postAddUpRequest(
        5,
        5,
        jestPactOptions.host,
        jestPactOptions.port
      ).then((result) => {
        expect(result).toEqual(JSON.stringify({ result: 5 }));
      });
    });
  });
});
