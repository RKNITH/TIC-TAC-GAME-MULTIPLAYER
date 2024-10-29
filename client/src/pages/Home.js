import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Button, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// Components
import CustomButton from '../components/CustomButton'
import CustomCard from '../components/CustomCard'

// Constants
import { black1, yellow } from '../constants/colors'
import { url } from '../constants/url'

const Home = ({events}) => {
  const [games, setGames] = useState(null)

  useEffect(() => {
    axios.get(`${url}/api/game`, {
      withCredentials: true
    }).then((res) => {
      setGames(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [events])

  return (
    <>
    <Stack sx={{ px: 2, height: '100%', bgcolor: '#F5F5F5' }}>
      <Typography sx={{ fontSize: 32, fontWeight: 600, mt: 0.5 }}>Your Games</Typography>

      {games?.length === 0 ? (<Stack sx={{ height: '100%' }}>
        <Stack sx={{ mt: '3rem', height: '70%', justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Bilbo', fontSize: '5.5rem' }} align='center'>No Games</Typography>
          <Typography sx={{ fontFamily: 'Bilbo', fontSize: '5.5rem', mt: -4 }} align='center'>Found</Typography>
        </Stack>
        <Stack sx={{ mt: 'auto' }}>
          <CustomButton color={yellow} path="/new-game">Start a new game</CustomButton>
        </Stack>
      </Stack>) : <Stack sx={{ height: '100%' }}>
        {games && games.map((game) => (
          <CustomCard game={game}/>
        ))}
      </Stack>}
    </Stack>
    {games?.length !== 0 && <Stack sx={{position: 'fixed', bottom: 10, right: 10, bgcolor: black1, borderRadius: '10px'}}>
      <Link to='/new-game'>
        <Button startIcon={<AddIcon />} sx={{textTransform: 'capitalize', color: 'white', borderRadius: '10px', px: 1.5, py: 1}}>New Game</Button>
      </Link>
    </Stack>}
    </>
  )
}

export default Home