import { Schema, Document, model } from 'mongoose'

export interface ITask {
  title: string
  description: string
  completionTimeStamp: Date
  notificationTimeStamp: Date
  isCompleted: boolean
}

export default interface ITaskModel extends Document, ITask {}

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completionTimeStamp: {
      type: Date,
      required: true,
    },
    notificationTimeStamp: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const Task = model<ITaskModel>('Task', schema)
