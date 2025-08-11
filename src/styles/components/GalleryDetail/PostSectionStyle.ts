import styled from 'styled-components'

export const PostContainer = styled.div`
  width: 100%;
`

export const EditWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PostContentInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
`

export const SaveButton = styled.button`
  background-color: #4dabf7;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #339af0;
  }
`

export const PostContent = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`
