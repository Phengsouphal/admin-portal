export function isVideoFile(fileName: string) {
  const fileExtension = fileName?.split('.')?.pop()?.toLowerCase() || ''
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv']
  return videoExtensions.includes(fileExtension)
}

export function isVideoMimeType(mimeType: string) {
  const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
  return videoMimeTypes.includes(mimeType)
}

export function generateRandomCode(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  // Ensure at least one number and one alphabet character
  let hasNumber = false
  let hasAlphabet = false

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    const character = characters.charAt(randomIndex)

    // Check if the character is a number or an alphabet
    if (/[0-9]/.test(character)) {
      hasNumber = true
    } else {
      hasAlphabet = true
    }

    result += character
  }

  // If either a number or an alphabet character is missing, regenerate the code
  if (!hasNumber || !hasAlphabet) {
    return generateRandomCode(length)
  }

  return result?.toUpperCase()
}
