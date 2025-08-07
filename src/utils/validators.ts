export const validator = {
  isValidatePassword: (password: string): boolean => {
    const regex = /^[A-Za-z@$!%*?&#]{8,16}$/
    return regex.test(password)
  },
  isValidatePhoneNumber: (phoneNumber: string): boolean => {
    const regex = /^010-\d{4}-\d{4}$/
    return regex.test(phoneNumber)
  },
}
