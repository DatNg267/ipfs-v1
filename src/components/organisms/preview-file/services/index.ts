// !WARNING WIDTH IS SET CONSTAINT -> REQUIRE FIX SOON
export const handleChangeTabPreview = (
  tabIndex: number,
  tab0Width = 152,
  tab1Width = 160
) => {
  const tab0 = document.querySelector('#tab-0') as HTMLElement
  const tab1 = document.querySelector('#tab-1') as HTMLElement
  const tabsRoot = document.querySelector('#tabs-root') as HTMLElement
  const tabIndicator = document.querySelector('#tab-indicator') as HTMLElement
  if (!tab0 || !tab1 || !tabsRoot || !tabIndicator) return

  if (tabIndex === 1) {
    if (
      !(
        parseInt(
          tab1.style.getPropertyValue('padding-left').replace('px', '')
        ) > 8
      )
    ) {
      tabIndicator.style.transform = `translateX(${
        tabsRoot.clientWidth - tab1Width - tabIndicator.clientWidth + 4
      }px)`
    } else {
      tabIndicator.style.transform = `translateX(${
        tabsRoot.clientWidth -
        tab1.offsetWidth -
        tabIndicator.clientWidth +
        32 -
        4
      }px)`
    }
    tab1.style.paddingLeft = `${32}px`
    tab1.style.border = `1px solid`

    tab0.style.paddingRight = `8px`
    tab0.style.border = `none`
  } else {
    if (
      !(
        parseInt(
          tab0.style.getPropertyValue('padding-right').replace('px', '')
        ) > 8
      )
    ) {
      tabIndicator.style.transform = `translateX(${tab0Width - 4}px)`
    } else {
      tabIndicator.style.transform = `translateX(${tab0Width - 6}px)`
    }

    tab1.style.paddingLeft = `8px`
    tab1.style.border = `none`
    tab0.style.border = `1px solid`

    tab0.style.paddingRight = `${32}px`
  }
}
