export const maskPhone = (value: string) =>
  value.length < 4 ? value : `${value.slice(0, 3)}****${value.slice(-2)}`

export const maskGhanaCard = (value: string) =>
  value.length < 6 ? value : `${value.slice(0, 4)}******${value.slice(-2)}`

export const isValidHexColor = (value: string) => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)

export const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '')
  const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized
  const int = parseInt(full, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
