import faker from 'faker'

const password = 'thisispassword'

export const user = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password
}