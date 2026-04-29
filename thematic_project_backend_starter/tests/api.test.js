// Automated API tests for the Movie Database backend.
// These tests check the main Swagger/OpenAPI behaviours including
// users, login, logout, movie search, single movie lookup, and reviews.

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Movie Database API", function () {
    this.timeout(15000);

    const uniqueSuffix = Date.now();
    const testUser = {
        first_name: "Test",
        last_name: "User",
        email: `student_${uniqueSuffix}@example.com`,
        password: "StrongPass1!"
    };

    let userId;
    let sessionToken;
    let movieId;

    before(async () => {
        const res = await chai.request(app).get("/search");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        movieId = res.body[0].movie_id;
    });

    describe("User registration", () => {
        it("POST /users should return 201 and user_id with valid payload", async () => {
            const res = await chai.request(app).post("/users").send(testUser);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("user_id");
            userId = res.body.user_id;
        });

        it("POST /users should return 400 when required fields are missing", async () => {
            const res = await chai.request(app).post("/users").send({
                first_name: "OnlyName"
            });
            expect(res).to.have.status(400);
        });

        it("POST /users should return 400 when email is invalid", async () => {
            const res = await chai.request(app).post("/users").send({
                first_name: "Invalid",
                last_name: "Email",
                email: "not-an-email",
                password: "StrongPass1!"
            });
            expect(res).to.have.status(400);
        });

        it("POST /users should return 400 when password is weak", async () => {
            const res = await chai.request(app).post("/users").send({
                first_name: "Weak",
                last_name: "Password",
                email: `weak_${Date.now()}@example.com`,
                password: "weakpass"
            });
            expect(res).to.have.status(400);
        });

        it("POST /users should return 400 when duplicate email is used", async () => {
            const res = await chai.request(app).post("/users").send(testUser);
            expect(res).to.have.status(400);
        });
    });

    describe("Login", () => {
        it("POST /login should return 200, user_id, and session_token for valid credentials", async () => {
            const res = await chai.request(app).post("/login").send({
                email: testUser.email,
                password: testUser.password
            });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("user_id");
            expect(res.body).to.have.property("session_token");
            expect(res.body.user_id).to.equal(userId);
            sessionToken = res.body.session_token;
        });

        it("POST /login should return 400 for invalid credentials", async () => {
            const res = await chai.request(app).post("/login").send({
                email: testUser.email,
                password: "WrongPassword1!"
            });
            expect(res).to.have.status(400);
        });

        it("POST /login should return 400 when email or password is missing", async () => {
            const res = await chai.request(app).post("/login").send({
                email: testUser.email
            });
            expect(res).to.have.status(400);
        });
    });

    describe("Movie search", () => {
        it("GET /search should return 200 and an array", async () => {
            const res = await chai.request(app).get("/search");
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });

        it("GET /search with searchText should return 200 and filtered results", async () => {
            const res = await chai.request(app).get("/search").query({ searchText: "the" });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });

        it("GET /search with searchBudgetMin/searchBudgetMax should return 200", async () => {
            const res = await chai.request(app).get("/search").query({
                searchBudgetMin: 0,
                searchBudgetMax: 1000000000
            });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });

        it("GET /search with searchRevenueMin/searchRevenueMax should return 200", async () => {
            const res = await chai.request(app).get("/search").query({
                searchRevenueMin: 0,
                searchRevenueMax: 1000000000
            });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });

        it("GET /search with invalid numeric query values should return 400", async () => {
            const res = await chai.request(app).get("/search").query({
                searchBudgetMin: "not-a-number"
            });
            expect(res).to.have.status(400);
        });
    });

    describe("Single movie", () => {
        it("GET /movie/:id should return 200 for an existing movie", async () => {
            const res = await chai.request(app).get(`/movie/${movieId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("movie_id");
        });

        it("GET /movie/:id should return 404 for a non-existing movie", async () => {
            const res = await chai.request(app).get("/movie/99999999");
            expect(res).to.have.status(404);
        });
    });

    describe("Reviews", () => {
        it("GET /review/:id should return 200 and an array", async () => {
            const res = await chai.request(app).get(`/review/${movieId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });

        it("POST /review/:id should return 401 without token", async () => {
            const res = await chai.request(app).post(`/review/${movieId}`).send({
                review_body: "No token review"
            });
            expect(res).to.have.status(401);
        });

        it("POST /review/:id should return 401 with invalid token", async () => {
            const res = await chai.request(app)
                .post(`/review/${movieId}`)
                .set("X-Authorization", "invalid-token")
                .send({ review_body: "Invalid token review" });
            expect(res).to.have.status(401);
        });

        it("POST /review/:id should return 400 when review_body is missing or empty", async () => {
            const res = await chai.request(app)
                .post(`/review/${movieId}`)
                .set("X-Authorization", sessionToken)
                .send({ review_body: "" });
            expect(res).to.have.status(400);
        });

        it("POST /review/:id should return 200 or 201 with valid token and review_body", async () => {
            const res = await chai.request(app)
                .post(`/review/${movieId}`)
                .set("X-Authorization", sessionToken)
                .send({ review_body: `Automated review ${Date.now()}` });
            expect([200, 201]).to.include(res.status);
        });

        it("POST /review/:id should return 404 when movie does not exist", async () => {
            const res = await chai.request(app)
                .post("/review/99999999")
                .set("X-Authorization", sessionToken)
                .send({ review_body: "Movie does not exist" });
            expect(res).to.have.status(404);
        });
    });

    describe("Logout", () => {
        it("POST /logout should return 401 when no X-Authorization token is provided", async () => {
            const res = await chai.request(app).post("/logout");
            expect(res).to.have.status(401);
        });

        it("POST /logout should return 200 when a valid token is provided", async () => {
            const res = await chai.request(app)
                .post("/logout")
                .set("X-Authorization", sessionToken);
            expect(res).to.have.status(200);
        });

        it("POST /logout should return 401 when an invalid token is provided", async () => {
            const res = await chai.request(app)
                .post("/logout")
                .set("X-Authorization", "definitely-invalid-token");
            expect(res).to.have.status(401);
        });
    });
});
