const request = require("supertest");
const fs = require("fs");
const { app } = require("../app");
const { User, Menu, Order } = require("../models/index");
const Helper = require("../helpers/helper");
let token;
let tokenStaff;
let dataMenu;

beforeAll(async () => {
  try {
    let user = await User.create({
      fullName: "initest",
      email: "testing@email.com",
      password: "testing",
      role: "admin",
    });

    let userStaff = await User.create({
      fullName: "initest",
      email: "testingStaff@email.com",
      password: "testing",
    });

    token = Helper.signToken({ id: user.id });
    tokenStaff = Helper.signToken({ id: userStaff.id });

    dataMenu = {
      name: "menuTes",
      calories: 5,
      image: "ini.png",
      price: 50000,
    };
    
    for (let i = 0; i < 10; i++) {
      await Menu.create(dataMenu);
    }


    // console.log(token, "<<<< ini token");
  } catch (error) {
    console.log(error, "<<<<<<<<<<");
  }
});

describe("POST /menu", () => {
  test("addMenu on success", async () => {
    const dummy = {
      name: "menuTes",
      calories: 5,
      image: "ini.png",
      price: 50000,
    };

    const response = await request(app)
      .post("/menu")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy);

    // console.log(response.body, "<<< ini menu");
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("addMenu failed non admin detect", async () => {
    const dummy = {
      name: "menuTes",
      calories: 5,
      image: "ini.png",
      price: 50000,
    };

    const response = await request(app)
      .post("/menu")
      .set("Authorization", `Bearer ${tokenStaff}`)
      .send(dummy);

    // console.log(response.body, "<<< ini menu");
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied");
  });

  test("addMenu failed token", async () => {
    const dummy = {
        name: "menuTes",
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .post("/menu")
      .set("Authorization", "Bearer TokenFailed")
      .send(dummy);

    // console.log(response.body, "<<< ini menu");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Token Failed");
  });

  test("addLoging failed request body", async () => {
    const dummy = {
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .post("/menu")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy);

    // console.log(response.body, "<<< ini menu");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });
});

describe("GET /menu", () => {
  test("success get menu", async () => {
    const response = await request(app)
      .get("/menu")
      .set("Authorization", `Bearer ${token}`)

    // console.log(response.body, '<<< ini body menu');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("page");
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("totalData");
    expect(response.body).toHaveProperty("totalPage");
  });

  test("unsuccess get menu on null token", async () => {
    const response = await request(app)
      .get("/menu")
      .set("Authorization", null);

    // console.log(response.body, "<<< ini body menu");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Silahkan login dahulu");
  });

  test("addLoging failed token", async () => {
    const response = await request(app)
      .get("/menu")
      .set("Authorization", "Bearer TokenFailed");

    // console.log(response.body, "<<< ini menu");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Token Failed");
  });
});

describe("GET /menu/:id", () => {
  test("success get detail menu", async () => {
    let dummy = await Menu.findByPk(1);

    const response = await request(app)
      .get("/menu/1")
      .set("Authorization", `Bearer ${token}`);

    // console.log(response.body, dummy, '<<<< body menu:id');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.menu).toHaveProperty("id", dummy.id);
    expect(response.body.menu).toHaveProperty("name");
  });

  test("unsuccess get detail menu on null token", async () => {
    let dummy = await Menu.findByPk(1);

    const response = await request(app)
      .get("/menu/1")
      .set("Authorization", null);

    console.log(response.body, "<<< ini body menu");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Silahkan login dahulu");
  });

  test("unsuccess get detail menu on not login", async () => {
    const response = await request(app)
      .get("/menu/1")
      .set("Authorization", "Bearer TokenFailed");

    // console.log(response.body, "<<< ini body menu");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Token Failed");
  });

  test("unsuccess get detail menu invalid data id", async () => {
    const response = await request(app)
      .get("/menu/50")
      .set("Authorization", `Bearer ${token}`);

    // console.log(response, "<<< ini response");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Tidak ada data");
  });
});

describe("PUT /menu/:id", () => {
  test("success edit menu", async () => {
    let dummyEdit = {
        name: "menuTesedit",
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .put("/menu/1")
      .set("Authorization", `Bearer ${token}`)
      .send(dummyEdit);

    let data = await Menu.findByPk(1);

    // console.log(response.body, '<<< ini body put');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.menu).toHaveProperty("name", data.name);
    expect(response.body.menu).toHaveProperty("price", data.price);
  });

  test("failed because of not login", async () => {
    let dummyEdit = {
        name: "menuTesedit",
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .put("/menu/1")
      .set("Authorization", null)
      .send(dummyEdit);

    // console.log(response.body, '<<< ini bodynya');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Silahkan login dahulu");
  });

  test("failed because of invalid token", async () => {
    let dummyEdit = {
        name: "menuTesedit",
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .put("/menu/1")
      .set("Authorization", "Bearer FailedToken")
      .send(dummyEdit);

    // console.log(response.body, '<<< ini bodynya');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Token Failed");
  });

  test("failed because of get id", async () => {
    let dummyEdit = {
        name: "menuTesedit",
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .put("/menu/50")
      .set("Authorization", `Bearer ${token}`)
      .send(dummyEdit);

    // console.log(response.body, '<<< ini bodynya');
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Tidak ada data");
  });

  test("failed because of forbiden", async () => {
    let dummyEdit = {
        name: "menuTesedit",
        calories: 5,
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .put("/menu/1")
      .set("Authorization", `Bearer ${tokenStaff}`)
      .send(dummyEdit);

    // console.log(response.body, '<<< ini bodynya');
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied");
  });

  test("failed because of body invalid", async () => {
    let dummyEdit = {
        name: "",
        calories: "5feaf",
        image: "ini.png",
        price: 50000,
    };

    const response = await request(app)
      .put("/menu/1")
      .set("Authorization", `Bearer ${token}`)
      .send(dummyEdit);

    // console.log(response.body, "<<< ini bodynya");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", response.body.message);
  });
});

describe("DELETE /menu/:id/delete", () => {
  test("success delete", async () => {
    const response = await request(app)
      .delete("/menu/2")
      .set("Authorization", `Bearer ${token}`);

    // console.log(response.body, '<<<< ini body del');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "menu successfully deleted"
    );
    expect(response.body.data).toHaveProperty("name", "menuTes");
  });

  test("fail delete not login", async () => {
    const response = await request(app)
      .delete("/menu/1")
      .set("Authorization", null);

    // console.log(response.body, '<<<< ini body del');
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Silahkan login dahulu");
  });

  test("fail delete invalid token", async () => {
    const response = await request(app)
      .delete("/menu/5")
      .set("Authorization", `Bearer ${tokenStaff}`);

    console.log(response.body, '<<<< ini body del');
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Access denied");
  });

  test("fail delete no id it has", async () => {
    const response = await request(app)
      .delete("/menu/20")
      .set("Authorization", `Bearer ${token}`);

    // console.log(response.body, '<<<< ini body del');
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Tidak ada data");
  });
});



afterAll(async () => {
  await Order.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Menu.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
