import mongoose from 'mongoose'
import { DB_URI } from '../../config/config'

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI, {})
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany({})),
    )
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
}

export default setupTestDB
