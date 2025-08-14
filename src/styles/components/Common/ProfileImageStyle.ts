import styled from 'styled-components'

export const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-full);
  overflow: hidden;
  transition: all var(--transition);

  &:hover {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }
`

export const ProfileImage = styled.img<{ height: string; width: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  object-fit: cover;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
`
