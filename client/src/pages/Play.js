import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import BackButton from '../components/BackButton'
import cross from '../assets/cross.png'
import CustomButton from '../components/CustomButton'
import { lightYellow } from '../constants/colors'
import Board from '../components/Board'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { gameInfo, resetGame, updateGame } from '../features/gameSlice'
import { url } from '../constants/url'

const Play = ({ events }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector(state => state.user)

  const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', ''])
  const [game, setGame] = useState('')

  useEffect(() => {
    axios.get(`${url}/api/game/${id}`, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data)
      dispatch(gameInfo(res.data))
      setGame(res.data)
      setSquares(res.data.board)
    }).catch((err) => {
      console.log(err)
    })

    if (user.email == game.owner) {
      if (game.status == 'owner wins') setStatus(0)
      else if (game.status == 'draw') setStatus(1)
      else if (game.status == 'rival wins') setStatus(2)
      else if (game.status == 'owners move') setStatus(31)
      else if (game.status == 'rivals move') setStatus(4)
    } else {
      if (game.status == 'rival wins') setStatus(0)
      else if (game.status == 'draw') setStatus(1)
      else if (game.status == 'owner wins') setStatus(2)
      else if (game.status == 'rivals move') setStatus(32)
      else if (game.status == 'owners move') setStatus(4)
    }


  }, [id, events])

  const gameStatus = new Map([
    [0, "You won!"],
    [1, "It's a Draw!"],
    [2, "You Lost!"],
    [31, `${game.rivalName} just made their move! It's your turn to play now`],
    [4, "You've made your move! Waiting for them."],
    [32, `${game.ownerName} just made their move! It's your turn to play now.`]
  ])

  const [status, setStatus] = useState('')

  const buttonClicked = (err) => {
    console.log(err)
  }

  useEffect(() => {
    if(game.status === "owner wins" || game.status === "rival wins" || game.status === "draw"){
      dispatch(resetGame())
    }
  },[game.status])

  const handleChange = (index) => {
    const newSquares = [...squares]
    if (newSquares[index] != '') return
    if (user.email === game.rival && gameStatus === "owners turn") return
    if (user.email === game.owner && gameStatus === "rivals turn") return

    if (user.email === game.owner)
      newSquares[index] = 'owner'

    if (user.email === game.rival)
      newSquares[index] = 'rival'

    axios.patch(`${url}/api/game/${id}`, {
      board: newSquares
    }, {
      withCredentials: true
    }).then((res) => {
      dispatch(updateGame({
        board: newSquares,
        status: res.data.status
      }))

      console.log(res.data)
    }).catch((err) => {
      buttonClicked(err.message)
    })

    setSquares(newSquares)
  }

  return (
    <>
      <Stack sx={{ height: '100%' }}>
        <BackButton path='/home' />

        <Stack sx={{ px: 2, py: 1, height: '100%' }} >
          <Stack sx={{ mt: 2 }}>
            {game.owner == user.email && <Typography sx={{ fontSize: 32, fontWeight: 600, mt: 0.5 }}>Game with {game.rivalName}</Typography>}
            {game.rival == user.email && <Typography sx={{ fontSize: 32, fontWeight: 600, mt: 0.5 }}>Game with {game.ownerName}</Typography>}

            <Typography sx={{ fontSize: 17, fontWeight: 300 }}>Your piece</Typography>
            <img src={cross} style={{ width: 80 }} />
          </Stack>

          <Stack sx={{ mt: 3 }}>
            <Stack sx={{ bgcolor: lightYellow, py: 2 }} alignItems="space-between">
              {(game.status == "rivals move" && user.email == game.rival) &&
                <Typography align='center' sx={{ fontWeight: 300 }}>Your move</Typography>}

              {(game.status == "rivals move" && user.email == game.owner) &&
                <Typography align='center' sx={{ fontWeight: 300 }}>Their move</Typography>}

              {(game.status == "owners move" && user.email == game.owner) &&
                <Typography align='center' sx={{ fontWeight: 300 }}>Your move</Typography>}

              {(game.status == "owners move" && user.email == game.rival) &&
                <Typography align='center' sx={{ fontWeight: 300 }}>Their move</Typography>}

              {(game.status == "draw") &&
                <Typography align='center' sx={{ fontWeight: 300, bgcolor: 'orange', py: 1 }}>It's a Draw!</Typography>}

              {(game.status == "rival wins" && user.email == game.rival) &&
                <Typography align='center' sx={{ fontWeight: 300, bgcolor: 'green', py: 1 }}>You won!</Typography>}

              {(game.status == "rival wins" && user.email == game.owner) &&
                <Typography align='center' sx={{ fontWeight: 300, bgcolor: 'red', py: 1 }}>You Lost!</Typography>}

              {(game.status == "owner wins" && user.email == game.owner) &&
                <Typography align='center' sx={{ fontWeight: 300, bgcolor: 'green', py: 1 }}>You won!</Typography>}

              {(game.status == "owner wins" && user.email == game.rival) &&
                <Typography align='center' sx={{ fontWeight: 300, bgcolor: 'red', py: 1 }}>You Lost!</Typography>}
            </Stack>

            <Board handleChange={handleChange} />
          </Stack>

          <Stack sx={{ mt: 'auto' }}>
            {((game.status == "rivals move" && user.email == game.rival) ||
              (game.status == 'owners move' && user.email == game.owner)) &&
              <CustomButton>Make your move!</CustomButton>}

            {((game.status == "owners move" && user.email == game.rival) ||
              (game.status == "rivals move" && user.email == game.owner)) &&
              <CustomButton disabled={true}>Wait for your turn!</CustomButton>}

            {(game.status == 'rival wins' || game.status == 'owner wins' || game.status == 'draw') &&
              <CustomButton path={'/new-game'}>Start Another!</CustomButton>}
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Play