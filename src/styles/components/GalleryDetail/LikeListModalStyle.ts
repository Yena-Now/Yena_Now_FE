import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const Modal = styled.div`
  width: 520px;
  max-height: 70vh;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`

export const Header = styled.div`
  position: relative;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  row-gap: 16px;

  padding: 20px 24px 18px;
`

export const Title = styled.h3`
  grid-column: 1 / -1;
  justify-self: center;
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`

export const Close = styled.button`
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
  border: 0;
  background: none;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
`

export const CountRow = styled.div`
  grid-column: 1 / -1;
  justify-self: center;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #333;
  /* margin-top: 4px; */
`

export const Heart = styled.span`
  font-size: 18px;
  line-height: 1;
`

export const List = styled.div`
  overflow: auto;
  padding: 4px 0 8px;
  margin: 0 4px 8px;
  flex: 1;
`

export const Row = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  border: 0;
  background: none;
  padding: 12px 16px;
  cursor: pointer;
  text-align: left;
  &:hover {
    background: #fafafa;
  }
`

export const Avatar = styled.div`
  flex: 0 0 44px;
  margin-right: 12px;
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`

export const Nick = styled.div`
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Sub = styled.div`
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Chevron = styled.div`
  color: #bbb;
`

export const Empty = styled.div`
  padding: 28px;
  text-align: center;
  color: #777;
`

export const Skeleton = styled.div`
  height: 68px;
  margin: 6px 12px;
  border-radius: 12px;
  background: linear-gradient(90deg, #eee, #f6f6f6, #eee);
  background-size: 200% 100%;
  animation: shine 1.2s infinite;
  @keyframes shine {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
`
