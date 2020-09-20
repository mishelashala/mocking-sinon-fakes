const first = (xs) => xs[0];

function UserRepository() {
  const userList = [];

  function list(query) {
    if (!query) {
      return userList;
    }

    const [key, value] = first(Object.entries(query));
    return userList.filter((user) => user[key] === value);
  }

  return { list };
}

module.exports = {
  UserRepository,
};
