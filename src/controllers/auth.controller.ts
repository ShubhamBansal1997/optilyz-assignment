import { IRequest, IResponse, INext } from '@/interfaces/vendors'
import httpStatus from 'http-status'
import ApiError from '@/utils/ApiError'
import { AuthService } from '@/services'

class AuthController {
  private static instance: AuthController

  private constructor() {}

  /**
   * Implements Singleton Approach
   */
  static get(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController()
    }
    return AuthController.instance
  }

  /**
   * @description Register User
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async register(req: IRequest, res: IResponse, next: INext) {
    try {
      const { name, email, password } = req.body
      const user = await AuthService.createUser(name, email, password)
      res.json(user.toAuthJSON())
    } catch (e) {
      if (e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)
      next(e)
    }
  }

  /**
   * @description Login User
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async login(req: IRequest, res: IResponse, next: INext) {
    try {
      const { email, password } = req.body
      const user = await AuthService.validateEmailPassword(email, password)
      if (!user) throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid email or password')
      res.json(user.toAuthJSON())
    } catch (e) {
      next(e)
    }
  }

  /**
   * @description Logged in User
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async me(req: IRequest, res: IResponse, next: INext) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { name, email } = req.user
    res.send({ name, email })
  }
}

const authController = AuthController.get()

export { authController as AuthController }
