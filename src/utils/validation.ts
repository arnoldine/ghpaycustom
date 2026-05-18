export const maskPhone = (value: string) =>
  value.length < 4 ? value : `${value.slice(0, 3)}****${value.slice(-2)}`

export const maskGhanaCard = (value: string) =>
  value.length < 6 ? value : `${value.slice(0, 4)}******${value.slice(-2)}`
