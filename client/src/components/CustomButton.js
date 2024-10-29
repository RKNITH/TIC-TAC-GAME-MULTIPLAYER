import { Button } from '@mui/material'
import { blue, yellow } from '@mui/material/colors'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomButton = ({children, color, path, onClick, disabled}) => {
  return (
    <Link to={path}>
      <Button disabled={disabled} onClick={onClick} fullWidth variant='contained' sx={{textTransform: 'capitalize', color: 'white', py: 1.5, bgcolor: color, my: 1.2}}>{children}</Button>
    </Link>
  )
}

export default CustomButton