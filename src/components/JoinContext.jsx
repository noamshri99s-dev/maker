import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const JoinContext = createContext(null)

export function JoinProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openJoin = useCallback(() => setOpen(true), [])
  const closeJoin = useCallback(() => {
    setOpen(false)
    if (window.location.hash === '#join') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  useEffect(() => {
    const maybeOpen = () => {
      if (window.location.hash === '#join') openJoin()
    }

    maybeOpen()
    window.addEventListener('hashchange', maybeOpen)
    return () => window.removeEventListener('hashchange', maybeOpen)
  }, [openJoin])

  const value = useMemo(
    () => ({
      open,
      openJoin,
      closeJoin,
    }),
    [open, openJoin, closeJoin],
  )

  return <JoinContext.Provider value={value}>{children}</JoinContext.Provider>
}

export function useJoin() {
  const context = useContext(JoinContext)
  if (!context) {
    throw new Error('useJoin must be used within JoinProvider')
  }
  return context
}
