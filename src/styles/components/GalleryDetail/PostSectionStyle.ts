import styled from 'styled-components'

export const PostContainer = styled.div`
  width: 100%;
`

export const PostFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const PostContentInput = styled.input`
  width: 100%;
  min-height: 40px;
  padding: 8px 36px 8px 10px; /* 오른쪽 아이콘 공간 확보 */
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`

export const PostContent = styled.span`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`

export const EditIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`
