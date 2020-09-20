const { fake } = require("sinon");
const { UserService } = require("../../src/services/UserService");

describe("UserService", () => {
  describe("#getOneByEmail", () => {
    it("should search by email and return a single user", async () => {
      const expectedUser = { name: "John Doe", email: "john@doe.com" };
      const list = fake.resolves([expectedUser]);
      const userService = UserService({ list });
      const result = await userService.getOneByEmail("john@doe.com");

      expect(list.callCount).toBe(1);
      expect(list.firstArg).toEqual({ email: "john@doe.com" });
      expect(result).toEqual(expectedUser);
    });

    it("should throw an error if user is not found", async () => {
      const errMessage = "User Not Found with email: john@doe.com";
      const list = fake.resolves([]);
      const userService = UserService({ list });

      try {
        await userService.getOneByEmail("john@doe.com");
      } catch (err) {
        expect(list.callCount).toBe(1);
        expect(list.firstArg).toEqual({ email: "john@doe.com" });
        expect(err.message).toEqual(errMessage);
      }
    });

    it("should throw an error if could not connect to data source", async () => {
      const errMessage =
        "Service Unavailable: could not get user with email john@doe.com";
      const list = fake.rejects(
        new Error("Connection Error: Could not connect to data source")
      );
      const userService = UserService({ list });

      try {
        await userService.getOneByEmail("john@doe.com");
      } catch (err) {
        expect(list.callCount).toBe(1);
        expect(list.firstArg).toEqual({ email: "john@doe.com" });
        expect(err.message).toEqual(errMessage);
      }
    });
  });
});
