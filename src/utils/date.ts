export const formatKoreanDateTime = (iso: string) => {
  const d = new Date(iso)

  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')

  return `${y}년 ${m}월 ${day}일 ${hh}:${mm}`
}
