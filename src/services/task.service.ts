import { Task } from '@/models/task.model'
import ApiError from '@/utils/ApiError'
import httpStatus from 'http-status'

class TaskService {
  private static instance: TaskService

  private constructor() {}

  /**
   * Implements Singleton Approach
   */
  static get(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService()
    }
    return TaskService.instance
  }

  /**
   * @description Get All Tasks
   * @returns {[]Task}
   */
  async getAllTasks() {
    try {
      return await Task.find()
    } catch (e) {
      throw e
    }
  }

  /**
   * @description Get Single Task by Id
   * @param {string} taskId
   * @returns {Task}
   */
  async getTaskById(taskId: string) {
    try {
      return await Task.findOne({ _id: taskId })
    } catch (e) {
      throw e
    }
  }

  /**
   * @description Create New Task
   * @param {string} title
   * @param {string} description
   * @param {string} completionTimeStamp
   * @param {string} notificationTimeStamp
   * @param {boolean} isCompleted
   * @returns {Task}
   */
  async createTask(
    title: string,
    description: string,
    completionTimeStamp: string,
    notificationTimeStamp: string,
    isCompleted: boolean,
  ) {
    try {
      const task = new Task()
      task.title = title
      task.description = description
      task.completionTimeStamp = new Date(completionTimeStamp)
      task.notificationTimeStamp = new Date(notificationTimeStamp)
      task.isCompleted = isCompleted
      await task.save()
      return task
    } catch (e) {
      throw e
    }
  }

  /**
   * @description Delete Single Task by Id
   * @param {string} taskId
   * @returns {Task}
   */
  async deleteTaskById(taskId: string) {
    try {
      const task = await Task.findOne({ _id: taskId })
      if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
      await task.delete()
      return task
    } catch (e) {
      throw e
    }
  }

  /**
   * @description Update Single Task by Id
   * @param {string} id
   * @param {string} title
   * @param {string} description
   * @param {string} completionTimeStamp
   * @param {string} notificationTimeStamp
   * @param {boolean} isCompleted
   * @returns {Task}
   */
  async updateTaskById(
    id: string,
    title: string,
    description: string,
    completionTimeStamp: string,
    notificationTimeStamp: string,
    isCompleted: boolean,
  ) {
    try {
      const task = await Task.findOne({ _id: id })
      if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
      task.title = title
      task.description = description
      task.completionTimeStamp = new Date(completionTimeStamp)
      task.notificationTimeStamp = new Date(notificationTimeStamp)
      task.isCompleted = isCompleted
      await task.save()
      return task
    } catch (e) {
      throw e
    }
  }
}

const taskService = TaskService.get()

export { taskService as TaskService }
