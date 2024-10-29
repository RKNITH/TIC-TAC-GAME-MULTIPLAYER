import { Stack } from '@mui/system'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const BackButton = ({path}) => {
  return (
    <Stack justifyContent={'center'} sx={{mt: 1}}>
        <Link to={path}>
            <Stack sx={{"&:hover": {bgcolor: 'lightgray'}, justifyContent: 'center', width: '40px', height: '40px', alignItems: 'center', borderRadius: '50%'}}>
                <ArrowBackIosIcon />
            </Stack>
        </Link>
    </Stack>
  )
}

export default BackButton