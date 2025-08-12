export const isHttpUrl = (u?: string) => !!u && /^https?:\/\//i.test(u || '')

const S3_BASE = 'https://yenanow.s3.ap-northeast-2.amazonaws.com/'

export const toAbsS3 = (u?: string, base = S3_BASE) => {
  if (!u) return ''
  if (isHttpUrl(u)) return u
  return new URL(u.replace(/^\/+/, ''), base).toString()
}
