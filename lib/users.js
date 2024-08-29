let users = [];

export function addUser(user) {
  users.push(user);
}

export function findUser(username) {
  return users.find(user => user.username === username);
}

export function getAllUsers() {
  return users;
}
