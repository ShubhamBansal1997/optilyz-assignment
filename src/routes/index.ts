import express from 'express'

import task from './task.route'
import auth from './auth.route'

const router = express.Router()

router.use(auth)
router.use('/task', task)

export default router
