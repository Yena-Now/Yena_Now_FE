import styled, { keyframes } from 'styled-components'

// 플로팅 애니메이션 정의
const floatAnimation = keyframes`
  0%, 100% {
    transform: rotate(-5deg) translateY(0px);
  }
  50% {
    transform: rotate(-5deg) translateY(-15px);
  }
`

const floatAnimation2 = keyframes`
  0%, 100% {
    transform: rotate(8deg) translateY(0px);
  }
  50% {
    transform: rotate(8deg) translateY(-15px);
  }
`

const floatAnimationMobile = keyframes`
  0%, 100% {
    transform: rotate(-3deg) translateY(0px);
  }
  50% {
    transform: rotate(-3deg) translateY(-10px);
  }
`

const floatAnimation2Mobile = keyframes`
  0%, 100% {
    transform: rotate(3deg) translateY(0px);
  }
  50% {
    transform: rotate(3deg) translateY(-10px);
  }
`

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    #fff8e1 20%,
    #fff8e1 80%,
    var(--color-primary) 100%
  );
  position: relative;
  overflow: hidden;
  padding: var(--spacing-6);

  /* 글로벌 스타일 리셋 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  position: relative;
  z-index: 2;
`

export const PhotoCardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: var(--spacing-8);

  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 40px;
    background: radial-gradient(
      ellipse,
      rgba(0, 0, 0, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-4);

    &::before {
      width: 200px;
      height: 30px;
    }
  }
`

export const PhotoCard1 = styled.div`
  width: 280px;
  background: transparent;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  z-index: 2;

  /* 기본 플로팅 애니메이션 */
  animation: ${floatAnimation} 3s ease-in-out infinite;

  /* 호버 시 애니메이션 일시정지 및 효과 */
  &:hover {
    animation-play-state: paused;
    transform: translateY(-12px);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background: transparent;
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 360px;
    animation: ${floatAnimationMobile} 3s ease-in-out infinite;

    &:hover {
      transform: rotate(-2deg) translateY(-8px);
    }
  }
`

export const PhotoCard2 = styled.div`
  width: 280px;
  background: transparent;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  margin-left: -160px;
  z-index: 1;

  /* 두 번째 카드는 약간 다른 타이밍으로 애니메이션 */
  animation: ${floatAnimation2} 3s ease-in-out infinite;
  animation-delay: 1.5s;

  /* 호버 시 애니메이션 일시정지 및 효과 */
  &:hover {
    animation-play-state: paused;
    transform: rotate(6deg) translateY(-12px);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background: transparent;
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 360px;
    margin-left: 0;
    margin-top: -60px;
    animation: ${floatAnimation2Mobile} 3s ease-in-out infinite;
    animation-delay: 1.5s;

    &:hover {
      transform: rotate(2deg) translateY(-8px);
    }
  }
`

export const StartButton = styled.button`
  background: var(--color-primary);
  color: var(--color-text-strong);
  width: 200px;
  height: 60px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  box-shadow:
    0 8px 24px rgba(247, 190, 59, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 3;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    background: transparent;
  }

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-4px);
    box-shadow:
      0 12px 32px rgba(247, 190, 59, 0.4),
      0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px var(--color-primary-focus),
      0 8px 24px rgba(247, 190, 59, 0.3);
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 50px;
    font-size: var(--font-size-base);
  }
`
