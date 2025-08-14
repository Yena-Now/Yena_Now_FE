import styled from 'styled-components'

export const MainImagePreview = styled.div`
  width: 300px;
  height: 200px;
  margin: var(--spacing-6) 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    width: 280px;
    height: 180px;
    margin: var(--spacing-4) 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 260px;
    height: 160px;
    margin: var(--spacing-3) 0;
  }
`

export const FilterOptionsContainer = styled.div`
  display: flex;
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-2);
    margin-top: var(--spacing-3);
  }
`

export const FilterOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  border: 2px solid
    ${(props) => (props.$isSelected ? 'var(--color-primary)' : 'transparent')};
  background: ${(props) =>
    props.$isSelected ? 'var(--color-primary-light)' : 'transparent'};
  transition: all var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }
`

export const FilterThumbnail = styled.div`
  width: 80px;
  height: 60px;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-2);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    width: 70px;
    height: 50px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 45px;
  }
`

export const FilterName = styled.span`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  text-align: center;
`

export const PreviewImage = styled.img<{ selectedFilter: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  filter: ${(props) => props.selectedFilter || 'none'};
  transition: filter var(--transition);
`

export const ThumbnailImage = styled.img<{ filterStyle: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
  filter: ${(props) => props.filterStyle || 'none'};
`
