'use client'
import { createContext, useState, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const SnackbarContext = createContext({ showSnackbar: undefined })

export const useSnackbarContext = () => {
  return useContext(SnackbarContext)
}

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState('info')
  const [message, setMessage] = useState('')

  const showSnackbar = (type, message) => {
    setOpen(true)
    setSeverity(type)
    setMessage(message)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <SnackbarContext.Provider value={{ showSnackbar }}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
