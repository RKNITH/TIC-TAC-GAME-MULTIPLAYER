import Game from '../models/gameModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { checkWinner } from '../utils/engine.js'

export const newGame = async (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Access Denied")
    console.log(token)

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verified) return res.status(401).json("Access Denied")

        console.log(verified)

        const game1 = await Game.find({rival: req.body.rival, owner: verified.email}) 
        const game2 = await Game.find({owner: req.body.rival, rival: verified.email})   
        const game = game1.concat(game2)
        game.sort((a, b) => {return b.updatedAt - a.updatedAt})

        console.log(game[0])
        
        if(game[0] !== undefined && (game[0].status == "owners move" || game[0].status == "rivals move")){ 
            console.log(true)
            return res.status(409).json({message: "You already have a game with this player"})
        }

        console.log("first")
        const email = verified.email
        console.log(email)
        if(email == req.body.rival) return res.status(409).json({message: "You can't play with yourself"})
        
        const rival = await User.find({email: req.body.rival})
        console.log(rival)
        if(rival.length === 0) return res.status(409).json({message: "This player doesn't exist"})


        const newGame = new Game({
            owner: email,
            ownerName: verified.username,
            rival: req.body.rival,
            rivalName: rival[0].username,
            status: "owners move",
        })

        await newGame.save()
        res.status(201).json(newGame)
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const allGames = async (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verified) return res.status(401).json("Access Denied")

        const email = verified.email

        const games1 = await Game.find({owner: email})
        const games2 = await Game.find({rival: email})

        const games = games1.concat(games2)

        games.sort((a, b) => {
            return b.updatedAt - a.updatedAt
        })

        res.send(games)
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const getGame = async (req, res) => {
    const id = req.params.id
    try {
        const game = await Game.findById(id)
        res.status(200).json(game)
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const updateGame = async (req, res) => {
    const id = req.params.id
    const token = req.cookies.access_token

    if(!token) return res.status(401).json("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verified) return res.status(401).json("Access Denied")

        const email = verified.email

        const game = await Game.findById(id)

        if(game.owner === email && game.status === "owners move") {
            const winner = checkWinner(req.body.board)
            if(winner === "owner")
                await Game.updateMany({_id: id}, {$set:{ board: req.body.board}, status: "owner wins"})
            else if(winner === "draw")
                await Game.updateMany({_id: id}, {$set:{ board: req.body.board}, status: "draw"})
            else 
                await Game.updateMany({_id: id}, {$set:{ board: req.body.board}, status: "rivals move"})

            res.status(200).json("updated")
        } else if(game.rival === email && game.status === "rivals move") {
            const winner = checkWinner(req.body.board)
            if(winner === "rival")
                await Game.updateMany({_id: id}, {$set:{ board: req.body.board}, status: "rival wins"})
            else if(winner === "draw")
                await Game.updateMany({_id: id}, {$set:{ board: req.body.board}, status: "draw"})
            else 
                await Game.updateMany({_id: id}, {$set:{ board: req.body.board}, status: "owners move"})

            res.status(200).json("updated")
        } else {
            res.status(409).json({message: "wait for your turn"})
        }
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}