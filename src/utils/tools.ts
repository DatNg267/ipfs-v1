import { ethers } from 'ethers'
import { clone } from 'lodash'
import moment, { unitOfTime } from 'moment'
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}

export function addLeadingZero(num: number) {
  const numStr = num.toString()
  const numWithLeadingZero = numStr.padStart(2, '0')
  return numWithLeadingZero
}

export const truncateAddress = (address: string) => {
  const match = address.match(/^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/)
  if (!match) return address
  return `${match[1]}...${match[2]}`
}
export const formatEther = (number: string) => {
  if (number) {
    return ethers.utils.formatEther(number)
  } else return '0'
}
export const fixedNumber = (stringNumber: string, amountOfDigits = 2) => {
  if (stringNumber === '0' || stringNumber === '0.0') return '0'
  if (parseInt(stringNumber) > 0)
    return parseFloat(stringNumber).toFixed(amountOfDigits)
  else {
    let amountZeroEnd = 1
    while (true) {
      if (
        parseFloat(stringNumber) * Math.pow(10, amountZeroEnd) >
          Math.pow(10, amountOfDigits) ||
        amountZeroEnd === 10
      )
        break
      amountZeroEnd++
    }
    return parseFloat(stringNumber).toFixed(amountZeroEnd)
  }
}

export function formatFileSize(sizeInBytes?: number): {
  size: string
  unit: 'KB' | 'MB' | 'GB' | 'bytes' | 'TB'
} {
  if (!sizeInBytes) return { size: '0', unit: 'bytes' }
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
  const base = 1000
  const exponent = Math.floor(Math.log(sizeInBytes) / Math.log(base))
  const sizeFormatted = (sizeInBytes / Math.pow(base, exponent)).toFixed(2)

  return {
    size: sizeFormatted,
    unit: units[exponent],
  }
  // else if (size < 1024) {
  //   return { size: size.toString(), unit: 'bytes' }
  // } else if (size < 1024 * 1024) {
  //   return { size: (size / 1024).toFixed(2), unit: 'KB' }
  // } else if (size < 1024 * 1024 * 1024) {
  //   return { size: (size / (1024 * 1024)).toFixed(2), unit: 'MB' }
  // } else if (size < 1024 * 1024 * 1024 * 1024) {
  //   return { size: (size / (1024 * 1024 * 1024)).toFixed(2), unit: 'GB' }
  // } else {
  //   return { size: (size / (1024 * 1024 * 1024 * 1024)).toFixed(2), unit: 'TB' }
  // }
}
const SPECIAL_CHARS = '!@#$^&%*()+=-[]/{}|:<>?,.'
export function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
}

export const totalSizeFiles = (files: File[] | null) => {
  let sum = 0
  if (!files || files.length <= 0) return 0
  for (let index = 0; index < files.length; index++) {
    sum += files[index].size
  }
  return sum
}

export const IMAGE_TYPES = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']
export const VIDEO_TYPES = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv']
export const TEXT_TYPES = ['.txt', '.csv', '.json', '.xml', '.html', '.md']
export const AUDIO_TYPES = '.mp3'
export type FileType = 'img' | 'video' | 'text' | 'file' | 'audio' | 'json'
export const getTypeFileFromFileName = (fileName: string): FileType => {
  const isImage = IMAGE_TYPES.find((imageType) =>
    fileName.toLowerCase().includes(`${imageType}`)
  )
  const isVideo = VIDEO_TYPES.find((videoType) =>
    fileName.toLowerCase().includes(`${videoType}`)
  )
  const isText = TEXT_TYPES.find((textType) =>
    fileName.toLowerCase().includes(`${textType}`)
  )

  if (isVideo) return 'video'
  if (isImage) return 'img'
  if (isText) return 'text'
  return 'file'
}

const getUnitTime = (type: string) => {
  switch (type) {
    case 'hour':
      return 24
    default:
      return 60
  }
}
export function getTime(
  time: string,
  format: string = 'DD/MM/YYYY, hh:mm A',
  typeCompareTime: unitOfTime.Diff = 'minutes'
) {
  const now = moment()
  const compareTime = moment(time)
  if (now.diff(compareTime, typeCompareTime) >= getUnitTime(typeCompareTime)) {
    return moment(time).format(format)
  } else return moment(time).fromNow()
}

export function isNumeric(value: string) {
  return /^-?\d+$/.test(value)
}

export function clearEmptyKeys(newObj: any) {
  for (const key in newObj) {
    if (
      (key === null || key === undefined || key === '') &&
      (newObj[key] === null || newObj[key] === undefined || newObj[key] === '')
    ) {
      delete newObj[key]
    } else if (typeof newObj[key] === 'object') {
      clearEmptyKeys(newObj[key])
      if (Object.keys(newObj[key]).length === 0) {
        delete newObj[key]
      }
    }
  }
  return newObj
}

export function getRandomNumber(max: number, min: number) {
  var randomNumber = Math.random() * (max - min) + min
  return randomNumber
}
