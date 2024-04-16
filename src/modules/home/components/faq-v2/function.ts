export function handleChangeArrowColor(arrColor: any) {
  const arrowWrapper = document.querySelector('#arrow-wrap') as HTMLDivElement
  const arr = new Array(6).fill(0)
  if (arrowWrapper) {
    arr.forEach((element, index) => {
      arrowWrapper.style.setProperty(
        `--arrow-color-${(index + 1) * 100}`,
        arrColor[(index + 1) * 100 + 300]
      )
    })
  }
}
