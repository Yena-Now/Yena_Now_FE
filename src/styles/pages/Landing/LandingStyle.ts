import styled from 'styled-components'

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to right,
    #f5dd97ff 0%,
    #ffffff 20%,
    #ffffff 80%,
    #f5dd97ff 100%
  );
  position: relative;
  overflow: hidden;
`

export const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 20%;
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
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
  height: 80%;
`

export const PhotoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

export const PhotoCard1 = styled.p`
  width: 250px;
  height: 600px;
  img {
    width: auto;
    height: 700px;
    object-fit: cover;
  }
`

export const PhotoCard2 = styled.p`
  width: 250px;
  height: 600px;
  rotate: 10deg;
  margin-left: -50px;
  img {
    width: auto;
    height: 700px;
    object-fit: cover;
  }
`

export const StartButton = styled.button`
  background-color: #fff0c3;
  width: 200px;
  height: 75px;
  font-size: 20px;
  position: relative;
  transform: translateX(100%) translateY(-200%);
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
    transform: translateY(10%);
  }

  &:hover {
    background-color: #ffe0a1;
  }
`
