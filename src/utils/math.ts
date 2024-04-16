export function getTanFromDegrees(degrees: number) {
  return Math.tan((degrees * Math.PI) / 180)
}

export function getSinX(radians: number, radius: number) {
  return Math.sin(radians) * radius
}

export function getCosX(radians: number, radius: number) {
  return Math.cos(radians) * radius
}
