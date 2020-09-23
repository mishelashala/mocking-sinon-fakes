// User = { name: string, email: string }

// find :: Query -> [User]
// findOneById :: Id -> User | null
// save :: User -> User
// delete :: User -> null

const head = (xs) => xs[0];

function UserService(userRepository) {
  async function getAll() {
    try {
      const result = await userRepository.find();
      return result;
    } catch (err) {
      if (err.message === "Could Not Connect To DB") {
        throw new Error("Unavailable Service");
      }

      throw err;
    }
  }

  async function getOneByEmail(email) {
    try {
      const result = await userRepository.find({ email });

      if (result === null) {
        throw new Error("User Not Found");
      }

      return head(result);
    } catch (err) {
      if (err.message === "Could Not Connect To DB") {
        return Promise.reject(new Error("Unavailable Service"));
      }

      return Promise.reject(err);
    }
  }

  return {
    getAll,
    getOneByEmail,
  };
}

module.exports = {
  UserService,
};
