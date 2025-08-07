import styled from 'styled-components'

export const DetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  padding: 30px;
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const PhotoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 15px;
`
export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 40px;
  width: 620px;
  height: 700px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
`
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  height: 100%;
`
export const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const Divider = styled.hr`
  border: none;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
  width: 100%;
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`
