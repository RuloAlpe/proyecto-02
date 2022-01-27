import request from "supertest";
import app from "../src/app";

describe("Testing api", () => {

  describe("Valid request", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get('/api/search')
      .query({
        q: 'Londo',
        latitude: 43.70011,
        longitude: -79.4163,
      }).send();
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Invalid request", () => {
    test("should respond with a 401 status code", async () => {
      const response = await request(app).get('/api/search')
      .query({
        latitude: 43.70011,
        longitude: -79.4163,
      }).send();
      expect(response.statusCode).toBe(401);
    });
  });

  describe("Invalid request", () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app).get('/api/search')
      .query({
        q: 'SomeRandomCityInTheMiddleOfNowhere',
      }).send();
      expect(response.statusCode).toBe(400);
    });
  });

});
