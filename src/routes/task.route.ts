import express from 'express'
import passport from 'passport'
import { TaskController } from '@/controllers'

const router = express.Router()

router.get('/', passport.authenticate(['jwt'], { session: false }), TaskController.listTask)

router.post('/', passport.authenticate(['jwt'], { session: false }), TaskController.createTask)

router.get('/:id', passport.authenticate(['jwt'], { session: false }), TaskController.getSingleTask)

router.put('/:id', passport.authenticate(['jwt'], { session: false }), TaskController.updateTask)

router.delete('/:id', passport.authenticate(['jwt'], { session: false }), TaskController.deleteTask)

export default router
