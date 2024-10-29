import { Stack } from '@mui/system'
import React from 'react'

const Layout = ({children}) => {
  return (
    <Stack alignItems={"center"} justifyContent="center" height="100vh">
        <Stack sx={{width: '100%', height: '100%', maxWidth: 600}}>
            {children}
        </Stack>
    </Stack>
  )
}

export default Layout