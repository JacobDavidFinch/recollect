// we will use supertest to test HTTP requests/responses
const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
// we also need our app for the correct routes!

// Jest Common Examples 
// toBeDefined
// toBeGreaterThan / toBeLessThan
// toBe (uses === to compare)
// toEqual (for deep object comparison)
// toContain (see if a value is inside of a collection)

describe("GET REQUESTS ", () => {
    test("It should respond with an object regarding the user", async () => {

      const response = await request.get("api/jfinch").then(res => console.log(res)).catch(err => console.log(err));
      console.log(response);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // .toMatchObject({
    //     "_id": "5e8911902ea3a04590765936",
    //     "userName": "jfinch",
    //     "cards": [],
    //     "tests": [],
    //     "lastLogin": "6811996664656560129"
    // });
    });

    // test("It should return a card", async () => {
    //   const response = await request(app).get("api/jfinch/cards");
    //   expect(response.body).toEqual({});
    //   expect(response.statusCode).toBe(200);
    // })

    // test("It should return test 1", async () => {
    //   const response = await request(app).get("api/jfinch/test/1");
    //   expect(response.body).toEqual({});
    //   expect(response.statusCode).toBe(200);
    // })
  });

// describe("PUT REQUESTS ", () => {
//     test("It should respond with an object regarding the user", async () => {
//       const response = await request(routes).get("/jfinch");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     });

//     test("It should return a card", async () => {
//       const response = await request(routes).get("/jfinch/cards");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     })

//     test("It should return test 1", async () => {
//       const response = await request(routes).get("/jfinch/test/1");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     })
//   });

// describe("POST REQUESTS ", () => {
//     test("It should respond with an object regarding the user", async () => {
//       const response = await request(routes).get("/jfinch");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     });

//     test("It should return a card", async () => {
//       const response = await request(routes).get("/jfinch/cards");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     })

//     test("It should return test 1", async () => {
//       const response = await request(routes).get("/jfinch/test/1");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     })
//   });

// describe("DELETE REQUESTS ", () => {
//     test("It should respond with an object regarding the user", async () => {
//       const response = await request(routes).get("/jfinch");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     });

//     test("It should return a card", async () => {
//       const response = await request(routes).get("/jfinch/cards");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     })

//     test("It should return test 1", async () => {
//       const response = await request(routes).get("/jfinch/test/1");
//       expect(response.body).toEqual({});
//       expect(response.statusCode).toBe(200);
//     })
//   });
