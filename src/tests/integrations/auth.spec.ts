import request from 'supertest'
import app from '@/app'
import setupTestDB from '../utils/setupTestDB'
import { user } from '../fixtures/user.fixture'

setupTestDB()


let token: string

const registerUser = async () => {
  const res = await request(app).post('/register').send(user).expect(200)
  token = res.body.token
}

describe('Auth Routes', () => {
  let userLogin: any, wrongUserLogin: any

  beforeEach(async () => {
    userLogin = {
      email: user.email,
      password: user.password,
    }
    wrongUserLogin = {
      email: user.email,
      password: 'wrongpassword',
    }
    await registerUser()
  })

  describe('POST /login', () => {
    it('should return user token with 200 status', async () => {
      const res = await request(app).post('/login').send(userLogin).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('token')
    })

    it('should return 422 status if email and password are invalid', async () => {
      await request(app).post('/login').send(wrongUserLogin).expect(422)
    })

  })

  describe('GET /me', () => {
    it('should return user details with 200 status ', async () => {
      const res = await request(app).get('/me').set('Authorization', `bearer ${token}`).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).get('/me').expect(401)
    })
  })
})
