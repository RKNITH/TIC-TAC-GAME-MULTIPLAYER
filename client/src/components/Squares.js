import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import cross from '../assets/cross.png'
import circle from '../assets/circle.png'
import { useSelector } from 'react-redux'

const Squares = ({value, onClick, middle}) => {
  const [image, setImage] = React.useState('')
  const user = useSelector(state => state.user)
  const game = useSelector(state => state.game)
  
  useEffect(() => {
    if(game.owner === user.email){
      if(value == 'owner') setImage(cross)
      if(value == 'rival') setImage(circle)
    } else {
      if(value == 'owner') setImage(circle)
      if(value == 'rival') setImage(cross)
    }
  }, [value])
  
  return (
    <>
        {middle != true && <Button fullWidth variant='link' onClick={onClick} sx={{ bgcolor: 'white', borderRadius: '0px', height: 120}}>
          <img src={image}/>
        </Button>}
        {middle == true && <Button fullWidth variant='link' onClick={onClick} sx={{ bgcolor: 'white', borderRadius: '0px', mx: 1.5, height: 120}}>
          <img src={image}/>  
        </Button>}
    </>
  )
}

export default Squares