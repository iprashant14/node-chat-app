var expect = require('expect');
var {Users} = require('./users');

describe('Users',() => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id : "1",
        name : "Prashant",
        room : "node course"
      },
      {
        id : "2",
        name : "Ramesh",
        room : "react course"
      },
      {
        id : "3",
        name : "Suresh",
        room : "node course"
      }
    ];
  });

  it('should add new user ',() => {
    var users = new Users();
    var user = {
      id : "123Prashant",
      name : "Prashant",
      room : "1"
    }
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user',() => {
    var user = users.removeUser("1");
    expect(user.id).toBe("1");
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',() => {
    var user = users.removeUser("UsersFalseId");
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should get a user',() => {
    var user = users.getUser("1");
    expect(user.name).toBe("Prashant");
  });

  it('should not get a user',() => {
    var user = users.getUser("user");
    expect(user).toBeFalsy();
  });

  it('should return names for node course ',() => {
    var userList = users.getUserList("node course");
    expect(userList).toEqual(['Prashant','Suresh']);
  });

  it('should return names for node course ',() => {
    var userList = users.getUserList("react course");
    expect(userList).toEqual(['Ramesh']);
  });

});
