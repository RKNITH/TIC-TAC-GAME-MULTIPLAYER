import express from 'express'
const router = express.Router()

import { allGames, newGame, getGame, updateGame } from '../controllers/gameControllers.js'

router.post('/new', newGame)
router.get('/', allGames)
router.get('/:id', getGame)
router.patch('/:id', updateGame)

export default router