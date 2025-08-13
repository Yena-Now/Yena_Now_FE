import styled from 'styled-components'

export const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 5px 0;
  width: 100%;
`

export const CommentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  min-width: 0;
`

export const CommentUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  flex: 0 0 60px;
`

export const Nickname = styled.span`
  display: block;
  font-weight: 500;
  font-size: 14px;
  margin-top: 5px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
`

export const Comment = styled.p`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-word;
`
export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  &:hover {
    opacity: 0.7;
  }
`
export const EditInput = styled.input`
  padding: 6px 10px;
  font-size: 14px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 6px;
`

export const SaveButton = styled.button`
  margin-left: 8px;
  padding: 4px 8px;
  font-size: 12px;
  background: #4cafef;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #3b9dd6;
  }
`
