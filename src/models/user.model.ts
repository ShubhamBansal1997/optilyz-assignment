import { Schema, Document, model } from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE, JWT_SECRET } from '@/config/config'

export interface IUser {
  name: string
  email: string
  hash_password: string
  salt: string
}

export interface IUserToAuthJSON {
  name: string
  email: string
}

export default interface IUserModel extends Document, IUser {
  setPassword(password: string): void
  validPassword(password: string): boolean
  toAuthJSON(): IUserToAuthJSON
  generateJWT(): string
  generateAccessJWT(): string
  name: string
}

const schema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      private: true,
    },
    salt: {
      type: String,
      private: true,
    },
  },
  {
    timestamps: true,
  },
)

schema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash_password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

schema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash_password === hash
}

schema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    },
  )
}

schema.methods.toAuthJSON = function () {
  const { name, email } = this
  return {
    name,
    email,
    token: this.generateJWT(),
  }
}

export const User = model<IUserModel>('User', schema)
