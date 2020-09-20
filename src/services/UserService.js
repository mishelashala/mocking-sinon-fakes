// User = { id: string, age: number, name: string, email: string }

const first = (xs) => xs[0];

const CONNECTION_ERROR_MESSAGE =
  "Connection Error: Could not connect to data source";

function UserService(userRepository) {
  async function getAll() {
    return userRepository.list();
  }

  async function getOneByEmail(email) {
    try {
      const result = await userRepository.list({ email });

      if (!result.length) {
        throw new Error(`User Not Found with email: ${email}`);
      }

      return first(result);
    } catch (err) {
      if (err.message === CONNECTION_ERROR_MESSAGE) {
        return Promise.reject(
          new Error(
            `Service Unavailable: could not get user with email ${email}`
          )
        );
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
