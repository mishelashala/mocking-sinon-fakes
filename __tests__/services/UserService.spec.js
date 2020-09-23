const { fake } = require("sinon");
const { UserService } = require("../../src/services/UserService");

describe("UserService", () => {
  describe("#getAll", () => {
    it("should return a list of users", async () => {
      const userList = [{ name: "juan perez", email: "juan@perez.com" }];
      const find = fake.resolves(userList);
      const userService = UserService({ find });

      const result = await userService.getAll();

      expect(find.callCount).toBe(1);
      expect(find.firstArg).toBe(undefined);
      expect(result).toEqual(userList);
    });

    it("should throw an error if the cannot stablish a db conn", async () => {
      const err = new Error("Could Not Connect To DB");
      const find = fake.rejects(err);

      try {
        const userService = UserService({ find });
        await userService.getAll();
      } catch (err) {
        expect(find.callCount).toBe(1);
        expect(find.firstArg).toBe(undefined);
        expect(err.message).toEqual("Unavailable Service");
      }
    });
  });

  describe("#getOneByEmail", () => {
    it("should return a user by email", async () => {
      const user = { name: "juan perez", email: "juan@perez.com" };
      const find = fake.resolves([user]);
      const userService = UserService({ find });

      const result = await userService.getOneByEmail("juan@perez.com");

      expect(find.callCount).toBe(1);
      expect(find.firstArg).toEqual({ email: "juan@perez.com" });
      expect(result).toEqual(user);
    });

    it("should return null when user is not found", async () => {
      const find = fake.resolves(null);
      try {
        const userService = UserService({ find });
        await userService.getOneByEmail("no-existe@hehe.com");
      } catch (err) {
        expect(find.callCount).toBe(1);
        expect(find.firstArg).toEqual({ email: "no-existe@hehe.com" });
        expect(err.message).toEqual("User Not Found");
      }
    });

    it("should throw an error if the cannot stablish a db conn", async () => {
      const err = new Error("Could Not Connect To DB");
      const find = fake.rejects(err);

      try {
        const userService = UserService({ find });
        await userService.getOneByEmail("juan@perez.com");
      } catch (err) {
        expect(find.callCount).toBe(1);
        expect(err.message).toEqual("Unavailable Service");
      }
    });
  });
});
