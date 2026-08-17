export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  const nav = document.querySelector('.emily-nav')
  const offset = (nav?.getBoundingClientRect().height || 64) + 10
  const top = target.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'smooth',
  })
}

export function handleSectionClick(event, id) {
  if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) return
  event?.preventDefault()
  scrollToSection(id)
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', `#${id}`)
  }
}
