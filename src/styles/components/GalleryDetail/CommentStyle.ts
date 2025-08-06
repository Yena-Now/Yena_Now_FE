import styled from 'styled-components'

export const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const CommentUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Comment = styled.p`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 15px;
  white-space: pre-wrap; /* 줄바꿈 및 띄어쓰기 유지 */
  word-break: break-word; /* 긴 단어도 줄바꿈 */
`

export const Nickname = styled.span`
  font-weight: 500;
  font-size: 12px;
  margin-top: 5px;
`
