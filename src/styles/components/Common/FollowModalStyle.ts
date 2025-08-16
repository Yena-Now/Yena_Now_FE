import styled from 'styled-components'

export const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  cursor: pointer;
`

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  max-width: 30vw;
  width: 90%;
  max-height: 50vh;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
`

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
  padding: 0;
  color: #666;
  display: flex;
  align-items: center;

  &:hover {
    color: #333;
  }
`

export const UserList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 16px;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
`

export const UserListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`

export const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 2px 1vw;
`

export const UserItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
`

export const UserNickName = styled.div`
  font-weight: bold;
  font-size: 24px;
`

export const UserName = styled.div`
  font-size: 18px;
  color: #666;
  margin-top: 2px;
`

export const UserItemButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFollowing',
})<{
  isMe?: boolean
  isFollowing?: boolean
  onClick?: () => void
}>`
  background-color: ${({ isFollowing }) =>
    isFollowing ? '#f0f0f0' : '#59B4FF'};
  color: ${({ isFollowing }) => (isFollowing ? '#000' : '#fff')};
  width: 100px;
  height: 40px;
  display: ${({ isMe }) => (isMe ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: ${({ isFollowing }) =>
      isFollowing ? '#0056b3' : '#e0e0e0'};
  }
`

export const EmptyState = styled.div`
  padding: 40px 16px;
  text-align: center;
  color: #9a9a9a;
  font-size: 14px;
`
