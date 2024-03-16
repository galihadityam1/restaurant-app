const request = require("supertest");
const {app} = require("../app");
const { User } = require("../models/index");
const Helper = require("../helpers/helper");
let token;

beforeAll(async () => {
  try {
    let user = await User.create({
      fullName: "initest",
      email: "testing@email.com",
      password: "testing",
    });

    // console.log(user, '<<<< ini user');

    token = Helper.signToken({ id: user.id });
    // console.log(token, "<<<< ini token");
  } catch (error) {
    console.log(error, "<<<<<<<<<<");
  }
});

describe("post /login", () => {
  test("login success", async () => {
    let dummy = {
      email: "testing@email.com",
      password: "testing",
    };

    const response = await request(app).post("/login").send(dummy);

    // console.log(response.body, "<<< ini body");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "success login");
    expect(response.body).toHaveProperty("access_token", response.body.access_token);
  });

  test("throw error on null email", async () => {
    const dummy = {
      password: "testing",
    };

    const response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is Required");
  });

  test("throw error on unregistered email", async () => {
    const dummy = {
      email: "iniini@email.com",
      password: "testing",
    };

    const response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Silahkan daftar dahulu");
  });

  test("throw error on null password", async () => {
    const dummy = {
      email: "iniini@email.com",
    };

    const response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is Required");
  });

  test("throw error on wrong password", async () => {
    const dummy = {
      email: "testing@email.com",
      password: 'asalasal'
    };

    const response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
  });
});

describe("POST /register", () => {
  test("register on success", async () => {
    const dummy = {
      fullName: "initest",
      email: "testing1@mail.com",
      password: " testing1",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy)

    // console.log(response.body, '<<< ini body');
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "User created");
    expect(response.body.newUser).toHaveProperty("id", expect.any(Number));
    expect(response.body.newUser).toHaveProperty("email", dummy.email);
  });

  test("throw error on unique register", async () => {
    const dummy = {
      email: "testing@email.com",
      password: "testing",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "udh terdaftar, cari email lain"
    );
  });

  test("throw error on null email", async () => {
    const dummy = {
      password: "testing",
      fullName: "jadsl",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email cannot be empty");
  });

  test("throw error on empty email", async () => {
    const dummy = {
      email: "",
      password: "testing",
      fullName: "jadsl",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email cannot be empty");
  });

  test("throw error on not email format", async () => {
    const dummy = {
      email: "testing",
      password: "testing",
      fullName: "jadsl",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "must be email format");
  });

  test("throw error on null password", async () => {
    const dummy = {
      email: "dummy@mail.com",
      phoneNumber: "0000",
      address: "jadsl",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password cannot be empty");
  });

  test("throw error on empty password", async () => {
    const dummy = {
      email: "dummy@mail.com",
      password: "",
      fullName: "jadsl",
    };

    const response = await request(app)
      .post("/register")
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password cannot be empty");
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
