import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
      primary: {
        main: "#F2C94C"
      },
      secondary: {
        main: "#2F80ED"
      },
    },
    typography: {
      fontFamily: 'Epilogue',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    }
  })