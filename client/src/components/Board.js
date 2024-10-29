import { Stack } from '@mui/system'
import React from 'react'
import { lightYellow } from '../constants/colors'
import Squares from './Squares'
import { useSelector } from 'react-redux'

const Board = ({ handleChange }) => {
  const squares = useSelector(state => state.game.board)

  return (
    <Stack sx={{bgcolor: lightYellow}} alignItems="center">
        <Stack direction={"row"} sx={{width: '100%', mb: 1.5}}>
            <Squares value={squares[0]} onClick={() => handleChange(0)}/>
            <Squares middle={true} value={squares[1]} onClick={() => handleChange(1)}/>
            <Squares value={squares[2]} onClick={ () => handleChange(2)} />
        </Stack>
        <Stack direction={"row"} sx={{width: '100%', mb: 1.5}}>
            <Squares value={squares[3]} onClick={() => handleChange(3)}/>
            <Squares middle={true} value={squares[4]} onClick={() => handleChange(4)}/>
            <Squares value={squares[5]} onClick={() => handleChange(5)}/>
        </Stack>
        <Stack direction={"row"} sx={{width: '100%'}}>
            <Squares value={squares[6]} onClick={() => handleChange(6)}/>
            <Squares middle={true} value={squares[7]} onClick={() => handleChange(7)}/>
            <Squares value={squares[8]} onClick={() => handleChange(8)}/>
        </Stack>
    </Stack>
  )
}

export default Board