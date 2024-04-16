export const handleToggleNavbar = () => {
  // let layout = document.querySelector('#document-layout') as HTMLElement
  let navbar = document.querySelector('#document-navbar') as HTMLElement
  let wrapper = document.querySelector('#document-wrapper') as HTMLElement
  let body = document.querySelector('body') as HTMLElement
  if (navbar && wrapper && body) {
    if (navbar.classList.contains('open')) {
      navbar.classList.remove('open')
      navbar.style.transform = 'translate(-110%, 0px)'
      body.style.overflowY = 'unset'
      navbar.style.display = 'flex'
      wrapper.style.overflow = 'unset'
      // layout.style.overflow = 'unset'
    } else {
      navbar.classList.add('open')
      navbar.style.transform = 'translate(0%, 0px)'
      body.style.overflowY = 'hidden'
      navbar.style.display = 'flex'
      wrapper.style.overflow = 'hidden'
      // layout.style.overflow = 'hidden'
    }
  }
}
