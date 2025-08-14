import styled from 'styled-components'

export const GalleryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--spacing-6);
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-6);
  
  /* 반응형 그리드 */
  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
  
  @media (min-width: 1024px) and (max-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    padding: var(--spacing-3);
  }
`
