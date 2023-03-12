const request = require("supertest");
const app = require("../../config/app")
const mongoDB = require("../../config/database")

describe('Testing Admin App', () => {
  beforeEach(()=>{
    mongoDB.connect()
  })

describe('Testing User Module'), async () => {
  const response = await request(app).get("/GetAllUsers")
  expect(response.body.code).toBe(200)
}
describe('POST /login', () => { 

  let data = {
    "email": "ziadeid555@gmail.com",
    "password": "Zizo2045@"
}



  test('should sign in a user', async () => { 
    const response = await request(app).post('/login').send(data)
    expect(response.body.code).toBe(200)

   })
 })


  afterAll((done )=>{
    mongoDB.disconnect(done);
  })
});
