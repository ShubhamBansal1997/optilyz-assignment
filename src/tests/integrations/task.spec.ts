import { ITask } from '@/models/task.model'
import faker from 'faker'
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

describe('Task Routes', () => {
  let newTask: ITask

  beforeEach(async () => {
    newTask = {
      title: faker.lorem.word(5),
      description: faker.lorem.word(5),
      completionTimeStamp: new Date('2020-09-02T00:41:19.481Z'),
      notificationTimeStamp: new Date('2020-09-02T00:41:19.481Z'),
      isCompleted: false,
    }
    await registerUser()
  })

  describe('POST /task', () => {
    it('should return task with 200 status', async () => {
      const res = await request(app).post('/task').set('Authorization', `bearer ${token}`).send(newTask).expect(200)
      expect(res.body).toHaveProperty('title')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('completionTimeStamp')
      expect(res.body).toHaveProperty('notificationTimeStamp')
      expect(res.body).toHaveProperty('isCompleted')
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).post('/task').send(newTask).expect(401)
    })

  })

  describe('GET /task', () => {
    it('should return tasks array with 200 status ', async () => {
      const res = await request(app).get('/task').set('Authorization', `bearer ${token}`).expect(200)
      expect(res.body).toEqual([])
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).get('/task').expect(401)
    })
  })

  describe('GET /task/:id', () => {
    it('should return task with 200 status ', async () => {
      const resInsert = await request(app).post('/task').set('Authorization', `bearer ${token}`).send(newTask).expect(200)
      const res = await request(app).get(`/task/${resInsert.body._id}`).set('Authorization', `bearer ${token}`).expect(200)
      expect(res.body).toHaveProperty('title')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('completionTimeStamp')
      expect(res.body).toHaveProperty('notificationTimeStamp')
      expect(res.body).toHaveProperty('isCompleted')
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).get('/task/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found task by id ', async () => {
      await request(app).get('/task/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })

  describe('PUT /task/:id', () => {
    it('should return task with 200 status ', async () => {
      const resInsert = await request(app).post('/task').set('Authorization', `bearer ${token}`).send(newTask).expect(200)

      const updateTask: ITask = {
        title: faker.lorem.word(5),
        description: faker.lorem.word(5),
        completionTimeStamp: new Date('2020-09-03T00:41:19.481Z'),
        notificationTimeStamp: new Date('2020-09-03T00:41:19.481Z'),
        isCompleted: true,
      }

      const res = await request(app)
        .put(`/task/${resInsert.body._id}`)
        .set('Authorization', `bearer ${token}`)
        .send(updateTask)
        .expect(200)
      expect(res.body.title).toEqual(updateTask.title)
      expect(res.body.description).toEqual(updateTask.description)
      expect(new Date(res.body.completionTimeStamp)).toEqual(updateTask.completionTimeStamp)
      expect(new Date(res.body.notificationTimeStamp)).toEqual(updateTask.notificationTimeStamp)
      expect(res.body.isCompleted).toEqual(updateTask.isCompleted)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).put('/task/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found task by id ', async () => {
      await request(app).put('/task/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })

  describe('DELETE /task/:id', () => {
    it('should delete task with 204 status ', async () => {
      const resInsert = await request(app).post('/task').set('Authorization', `bearer ${token}`).send(newTask).expect(200)
      await request(app).delete(`/task/${resInsert.body._id}`).set('Authorization', `bearer ${token}`).expect(204)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).delete('/task/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found task by id ', async () => {
      await request(app).delete('/task/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })
})
