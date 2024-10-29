import mongoose from 'mongoose'

const GameSchema = mongoose.Schema({
    owner: {
        type: String, 
        default: ''
    },
    rival: {
        type: String, 
        default: ''
    },
    ownerName: {
        type: String, 
        default: ''
    },
    rivalName: {
        type: String, 
        default: ''
    },
    status: {
        type: String, 
        default: 'your move'
    },
    board: {
        type: Array, 
        default: ['', '', '', '', '', '', '', '', '']
    },
}, {timestamps: true})

const Game = mongoose.model('Game', GameSchema)
export default Game