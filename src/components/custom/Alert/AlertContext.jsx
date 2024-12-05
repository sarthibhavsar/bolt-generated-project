import React, { createContext, useContext, useState, useCallback } from 'react'
import { CustomAlert } from './CustomAlert'



const AlertContext = createContext(undefined)

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    console.warn('AlertProvider not found. Falling back to default alert.')
    return {
      showAlert: (variant, title, message) => {
        return new Promise((resolve) => {
          const isConfirm = variant === 'delete' || variant === 'confirm'
          const fullMessage = `${variant.toUpperCase()}: ${title}\n\n${message}`
          
          if (isConfirm) {
            const result = window.confirm(fullMessage)
            resolve(result)
          } else {
            window.alert(fullMessage)
            resolve(true)
          }
        })
      }
    }
  }
  return context
}



export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    variant: 'success',
    title: '',
    message: '',
    resolve: null,
  })

  const showAlert = useCallback((variant, title, message) => {
    return new Promise((resolve) => {
      setAlertState({
        isOpen: true,
        variant,
        title,
        message,
        resolve,
      })
    })
  }, [])

  const handleConfirm = useCallback(() => {
    setAlertState((prev) => {
      if (prev.resolve) {
        prev.resolve(true)
      }
      return { ...prev, isOpen: false, resolve: null }
    })
  }, [])

  const handleCancel = useCallback(() => {
    setAlertState((prev) => {
      if (prev.resolve) {
        prev.resolve(false)
      }
      return { ...prev, isOpen: false, resolve: null }
    })
  }, [])

  const handleOpenChange = useCallback((open) => {
    setAlertState((prev) => {
      if (!open && prev.resolve) {
        prev.resolve(false)
      }
      return { ...prev, isOpen: open, resolve: open ? prev.resolve : null }
    })
  }, [])

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        variant={alertState.variant}
        title={alertState.title}
        message={alertState.message}
        isOpen={alertState.isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOpenChange={handleOpenChange}
      />
    </AlertContext.Provider>
  )
}
