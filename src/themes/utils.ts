export function opacify(amount: number, hexColor: string): string {
  if (!hexColor.startsWith('#')) {
    return hexColor
  }
  if (hexColor.length !== 7) {
    // throw new Error(
    //   `opacify: provided color ${hexColor} was not in hexadecimal format (e.g. #000000)`
    // );
    return '#000'
  }
  if (amount < 0 || amount > 100) {
    throw new Error('opacify: provided amount should be between 0 and 100')
  }
  const opacityHex = Math.round((amount / 100) * 255).toString(16)
  const opacifySuffix = opacityHex.length < 2 ? `0${opacityHex}` : opacityHex
  return `${hexColor.slice(0, 7)}${opacifySuffix}`
}

export function generateColor(baseHexColor: string, numberOfRanges: number[]) {
  if (!baseHexColor.startsWith('#')) return '#000000'
  if (baseHexColor.length !== 7) return '#000000'
  let res = {}
  numberOfRanges
    .map((_number, _index) => {
      return {
        [_number]: opacify(_number, baseHexColor),
      }
    })
    .forEach((item, index) => {
      res = {
        ...res,
        ...item,
      }
    })
  return res
}
