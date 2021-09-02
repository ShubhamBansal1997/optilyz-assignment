import { User } from '@/models/user.model'

class AuthService {
  private static instance: AuthService

  private constructor() {}

  /**
   * Implements Singleton Approach
   */
  static get(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * @description Create User
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {User}
   */
  async createUser(name: string, email: string, password: string) {
    try {
      const user = new User()
      user.name = name
      user.email = email
      user.setPassword(password)
      await user.save()
      return user
    } catch (e) {
      throw e
    }
  }

  /**
   * @description Validate Email and Password
   * @param {string} email
   * @param {string} password
   * @returns {User|null}
   */
  async validateEmailPassword(email: string, password: string) {
    try {
      const user = await User.findOne({ email })
      if (!user || !user.validPassword(password)) return null
      return user
    } catch (e) {
      throw e
    }
  }
}

const authService = AuthService.get()

export { authService as AuthService }
