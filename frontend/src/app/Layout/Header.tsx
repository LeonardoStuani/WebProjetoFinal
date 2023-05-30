import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import { AppBar, IconButton, Link, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  darkMode: boolean
  handleThemeChange: () => void
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  return (
    <AppBar position='static' sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Box sx={{ marginRight: 2 }}>
          <Link
            color='inherit'
            underline='none'
            variant='h6'
            component={NavLink}
            to='/'
          >
            Sistema de Serviço - Leonardo Stuani Godoi
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box>
          <IconButton
            color='inherit'
            aria-label='theme'
            onClick={handleThemeChange}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
