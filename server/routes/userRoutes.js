import express from 'express'
const router = express.Router()

import { getInfo } from '../controllers/userControllers.js'

router.get('/', getInfo)

export default router