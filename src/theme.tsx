import createTheme, { ThemeOptions } from '@mui/material/styles/createTheme'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.6rem',
    },
    h3: {
      fontSize: '2.3rem',
    },
    fontSize: 16,
  },
  shape: {
    borderRadius: 4,
  },
}
export const theme = createTheme(themeOptions)
