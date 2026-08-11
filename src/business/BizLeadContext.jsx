import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const LeadContext = createContext(null)

export function LeadProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openLead = useCallback(() => setOpen(true), [])
  const closeLead = useCallback(() => {
    setOpen(false)
    if (window.location.hash === '#brief') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  useEffect(() => {
    const maybeOpen = () => {
      if (window.location.hash === '#brief') openLead()
    }

    maybeOpen()
    window.addEventListener('hashchange', maybeOpen)
    return () => window.removeEventListener('hashchange', maybeOpen)
  }, [openLead])

  const value = useMemo(
    () => ({
      open,
      openLead,
      closeLead,
    }),
    [open, openLead, closeLead],
  )

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>
}

export function useLead() {
  const context = useContext(LeadContext)
  if (!context) {
    throw new Error('useLead must be used within LeadProvider')
  }
  return context
}
