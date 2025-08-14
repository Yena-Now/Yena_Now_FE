import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background: var(--color-surface-2);
  overflow-y: auto;
  scroll-behavior: smooth;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-surface-3);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-light);
  }
`
