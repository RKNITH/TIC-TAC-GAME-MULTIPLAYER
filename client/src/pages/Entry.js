import { Typography, Stack } from '@mui/material'

// components
import CustomButton from '../components/CustomButton'

// constants
import { blue, yellow } from '../constants/colors'

const Entry = () => {
  return (
    <Stack sx={{height: '100%', px: 2}}>
      <Stack sx={{mt: '3rem', height: '70%', justifyContent: 'center'}}>
        <Typography sx={{fontFamily: 'Bilbo', fontSize: '1.5rem'}} align='center'>async</Typography>
        <Typography sx={{fontFamily: 'Bilbo', fontSize: '5.5rem'}} align='center'>tic tac</Typography>
        <Typography sx={{fontFamily: 'Bilbo', fontSize: '5.5rem', mt: -4}} align='center'>toe</Typography>
      </Stack>
      <Stack sx={{mt: 'auto'}}>
        <CustomButton color={yellow} path="/login">Login</CustomButton>
        <CustomButton color={blue} path="/register">Register</CustomButton>
      </Stack>
    </Stack>
  )
}

export default Entry