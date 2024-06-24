/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import moment from 'moment-timezone'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnauthorizedError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
export function formatDateToYYYYMMDD(date: string) {
  return date && moment(date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
}
export function formatDateToReadable(date: string) {
  const suffixes = ['th', 'st', 'nd', 'rd']

  const formattedDate = moment(date).tz('Asia/Ho_Chi_Minh')

  const day = formattedDate.date()
  const month = formattedDate.format('MMMM')
  const year = formattedDate.year()

  let suffix = suffixes[0]
  if (day >= 11 && day <= 13) {
    suffix = suffixes[0]
  } else {
    suffix = suffixes[day % 10] || suffixes[0]
  }

  const formattedString = `${month} ${day}${suffix}, ${year}`

  return formattedString
}

export function formatTimeToReadable(date: string) {
  return moment(date).tz('Asia/Ho_Chi_Minh').format('MMMM Do, YYYY h:mma')
}

export function formatTimeToDayMonth(date: string) {
  return moment(date).tz('Asia/Ho_Chi_Minh').format('MMM Do')
}

export function formatTimeToHourMinute(date: string) {
  return moment(date).tz('Asia/Ho_Chi_Minh').format('h:mma')
}
