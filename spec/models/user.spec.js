const mongoose = require("mongoose");

require("../mongdb_helper");
const User = require("../../models/users");

describe("User model", () => {
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            done();
        });
    });
    it("has a first name", () => {
        const user = new User( {
            firstName: "Jane",
            lastName: "Smith",
            email: "someone@example.com",
            password: "password",
        });
        expect(user.firstName).toEqual("Jane");
    });

    it("has a last name", () => {
        const user = new User({
            firstName: "Jane",
            lastName: "Smith",
            email: "someone@example.com",
            password: "password",
        });
        expect(user.lastName).toEqual("Smith");
    });
});

it("can list all the users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
});

it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });




  



