export const getVerifyStatus = (verify?: number) => {
  switch (verify) {
    case 0:
      return 'UnVerify'
    case 1:
      return 'Verify'
    case 2:
      return 'Ban'
  }
}
export const getBadgeColor = (verify?: number) => {
  switch (verify) {
    case 0:
      return 'gray' // Unverify
    case 1:
      return 'green' // Verify
    case 2:
      return 'red' // Ban
  }
}
export const getTypeTicket = (type: number) => {
  switch (type) {
    case 0:
      return 'Report'
    case 1:
      return 'Feedback'
  }
}

export const getBadgeColorTicket = (type: number) => {
  switch (type) {
    case 0:
      return 'red'
    case 1:
      return 'blue'
  }
}
export function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)
  return [head, ...chunk(tail, size)]
}
