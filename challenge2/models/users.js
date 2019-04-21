class User {
  constructor() {
    this.users = [];
  }

  //@create user
  create(data) {
    this.users.push(data);
    return data;
  }

  find(data) {
    const users = this.users.find(user => user.email === data);
    return users;
  }

  findById(id) {
    const users = this.users.find(user => user.id === id);
    return users;
  }
}

export default new User();
