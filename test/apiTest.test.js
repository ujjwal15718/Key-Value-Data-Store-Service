

const request = require("supertest");
const app = require("../middleware/app");
const generateToken = require("./generateToken"); // Import the token generator

describe("POST /api/object", () => {
  it("should create a new key-value pair", async () => {
    const token = generateToken(); // Generate a valid JWT token
    const res = await request(app)
      .post("/api/object")
      .set("Authorization", `Bearer ${token}`) // Set the Authorization header
      .send({
        key: "testkeyy",
        data: { value: "testdata" }, // Ensure data is a valid JSON object
        ttl: 3600,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });
});

describe("GET /api/object/:key", () => {
  it("should retrieve a key-value pair", async () => {
    const token = generateToken(); // Generate a valid JWT token
    const res = await request(app)
      .get("/api/object/testkeyy") // Use the same key as in the POST request
      .set("Authorization", `Bearer ${token}`); // Set the Authorization header
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("key", "testkeyy"); // Use the same key as in the POST request
    expect(res.body).toHaveProperty("data");
  });

  it("should return 404 for a non-existent key", async () => {
    const token = generateToken(); // Generate a valid JWT token
    const res = await request(app)
      .get("/api/object/nonexistentkey")
      .set("Authorization", `Bearer ${token}`); // Set the Authorization header
    expect(res.statusCode).toEqual(404);
  });
});

describe("DELETE /api/object/:key", () => {
  it("should delete a key-value pair", async () => {
    const token = generateToken(); // Generate a valid JWT token
    const res = await request(app)
      .delete("/api/object/testkeyy") // Use the same key as in the POST request
      .set("Authorization", `Bearer ${token}`); // Set the Authorization header
    expect(res.statusCode).toEqual(204);
  });

  it("should return 404 for a non-existent key", async () => {
    const token = generateToken(); // Generate a valid JWT token
    const res = await request(app)
      .delete("/api/object/nonexistentkey")
      .set("Authorization", `Bearer ${token}`); // Set the Authorization header
    expect(res.statusCode).toEqual(404);
  });
});
