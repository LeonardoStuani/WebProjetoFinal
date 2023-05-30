import { ThemeProvider } from '@emotion/react'
import { Container, createTheme, CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header'
import HomePage from '../../features/home/HomePage'
import CustomerPage from '../../features/customers/CustomerPage'
import AddCustomer from '../../features/customers/AddCustomer'
import UpdateWorkOrder from '../../features/workOrders/UpdateWorkOrder'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers/add' element={<AddCustomer />} />
          <Route path='/customers/:id' element={<CustomerPage />} />
          <Route path='/work-orders/:id' element={<UpdateWorkOrder />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
