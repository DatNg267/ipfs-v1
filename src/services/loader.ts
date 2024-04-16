export function closeLoading() {
  const loader = document.getElementById('splash-screen')
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden')
    }, 300)
  }
}

export function openLoading() {
  const loader = document.getElementById('splash-screen')
  if (loader) {
    loader.classList.remove('hidden')
  }
}
