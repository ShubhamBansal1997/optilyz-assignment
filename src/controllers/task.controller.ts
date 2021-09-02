import { INext, IRequest, IResponse } from '@/interfaces/vendors'
import { TaskService } from '@/services'
import ApiError from '@/utils/ApiError'
import httpStatus from 'http-status'

class TaskController {
  private static instance: TaskController

  private constructor() {}

  /**
   * Implements Singleton Approach
   */
  static get(): TaskController {
    if (!TaskController.instance) {
      TaskController.instance = new TaskController()
    }
    return TaskController.instance
  }

  /**
   * @description List all Task
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async listTask(req: IRequest, res: IResponse, next: INext) {
    try {
      const tasks = await TaskService.getAllTasks()
      res.json(tasks)
    } catch (e) {
      next(e)
    }
  }

  /**
   * @description Get Single Task by Id
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async getSingleTask(req: IRequest, res: IResponse, next: INext) {
    try {
      const { id } = req.params
      const task = await TaskService.getTaskById(id)
      if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
      res.json(task)
    } catch (e) {
      next(e)
    }
  }

  /**
   * @description Create New Task
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async createTask(req: IRequest, res: IResponse, next: INext) {
    try {
      const { title, description, completionTimeStamp, notificationTimeStamp, isCompleted } = req.body
      const task = await TaskService.createTask(
        title,
        description,
        completionTimeStamp,
        notificationTimeStamp,
        isCompleted,
      )
      res.json(task)
    } catch (e) {
      next(e)
    }
  }

  /**
   * @description Delete Single Task by Id
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async deleteTask(req: IRequest, res: IResponse, next: INext) {
    try {
      const { id } = req.params
      const task = await TaskService.deleteTaskById(id)
      res.status(httpStatus.NO_CONTENT).json(task)
    } catch (e) {
      next(e)
    }
  }

  /**
   * @description Update Single Task by Id
   * @param {IRequest} req
   * @param {IResponse} res
   * @param {INext} next
   */
  async updateTask(req: IRequest, res: IResponse, next: INext) {
    try {
      const { id } = req.params
      const { title, description, completionTimeStamp, notificationTimeStamp, isCompleted } = req.body
      const task = await TaskService.updateTaskById(
        id,
        title,
        description,
        completionTimeStamp,
        notificationTimeStamp,
        isCompleted,
      )
      res.json(task)
    } catch (e) {
      next(e)
    }
  }
}

const taskController = TaskController.get()

export { taskController as TaskController }
