export const validator = {
  isValidatePassword: (password: string): boolean => {
    const regex = /^[A-Za-z@$!%*?&#]{8,16}$/
    return regex.test(password)
  },
}
