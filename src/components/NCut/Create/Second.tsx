import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/SecondStyle'
import { useState } from 'react'

interface SecondCreateStepProps {
  backgroundImageUrl: string | null
  isImageUploaded: boolean
  onFormDataChange: (data: { selectedFilter: string }) => void
}

const filters = [
  {
    name: '기본',
    value: 'basic',
    style: 'none',
  },
  { name: '흑백', value: 'blackwhite', style: 'grayscale(100%)' },
  {
    name: '흐림',
    value: 'blur',
    style: 'blur(5px)',
  },
]

function SecondCreateStep({
  backgroundImageUrl,
  isImageUploaded,
  onFormDataChange,
}: SecondCreateStepProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('basic')

  const handleFilterSelect = (filterValue: string, filterStyle: string) => {
    setSelectedFilter(filterValue)
    onFormDataChange({ selectedFilter: filterStyle })
  }

  const getFilterStyle = (filterValue: string) => {
    const filter = filters.find((f) => f.value === filterValue)
    return filter ? filter.style : 'none'
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 부스 생성</G.NcutCreateHeader>
      <G.NcutCreateDescription>필터를 지정해주세요.</G.NcutCreateDescription>
      {isImageUploaded && backgroundImageUrl && (
        <>
          <S.MainImagePreview>
            <S.PreviewImage
              selectedFilter={getFilterStyle(selectedFilter)}
              src={backgroundImageUrl}
              alt="미리보기"
            />
          </S.MainImagePreview>

          <S.FilterOptionsContainer>
            {filters.map((filter) => (
              <S.FilterOption
                key={filter.value}
                onClick={() => handleFilterSelect(filter.value, filter.style)}
                $isSelected={selectedFilter === filter.value}
              >
                <S.FilterThumbnail>
                  <S.ThumbnailImage
                    filterStyle={filter.style}
                    src={backgroundImageUrl}
                    alt={filter.name}
                  />
                </S.FilterThumbnail>
                <S.FilterName>{filter.name}</S.FilterName>
              </S.FilterOption>
            ))}
          </S.FilterOptionsContainer>
        </>
      )}
    </G.NCutCreateContentContainer>
  )
}

export default SecondCreateStep
