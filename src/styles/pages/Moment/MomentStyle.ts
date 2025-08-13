import styled from 'styled-components'

export const Container = styled.div`
  --top-offset: 150px;

  height: calc(100vh - var(--top-offset));
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`
