import styled from 'styled-components'

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    to right,
    #f5dd97ff 0%,
    #ffffff 20%,
    #ffffff 80%,
    #f5dd97ff 100%
  );
  position: relative;
  overflow: hidden;
  padding: 20px;
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  z-index: 10;

  img {
    width: 120px;
    height: auto;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  transform: translateX(-15%);

  width: 100%;
  max-width: 1200px;
  height: calc(100% - 140px);
`

export const PhotoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

export const PhotoCard1 = styled.p`
  width: 250px;
  height: 810px;
`

export const PhotoCard2 = styled.p`
  width: 250px;
  height: 810px;
  rotate: 10deg;
  margin-left: -50px;
`

export const StartButton = styled.button`
  background-color: #fff0c3;
  width: 200px;
  height: 75px;
  font-size: 20px;
  position: relative;
  transform: translateX(100%) translateY(-50%);
  text-align: center;
  color: black;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 4px rgba(0, 0, 0, 0.1);

  img {
    margin: 0 10px;
    width: 24px;
    height: auto;
  }

  &:hover {
    background-color: #ffe0a1;
  }
`
