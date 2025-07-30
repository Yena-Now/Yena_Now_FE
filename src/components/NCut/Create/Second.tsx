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
    style: '',
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
  const [selectedFilter, setSelectedFilter] = useState<string>('')

  const handleFilterSelect = (filterValue: string) => {
    setSelectedFilter(filterValue)
    onFormDataChange({ selectedFilter: filterValue })
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
            <img
              src={backgroundImageUrl}
              alt="미리보기"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
                filter: selectedFilter
                  ? getFilterStyle(selectedFilter)
                  : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </S.MainImagePreview>

          <S.FilterOptionsContainer>
            {filters.map((filter) => (
              <S.FilterOption
                key={filter.value}
                onClick={() => handleFilterSelect(filter.value)}
                $isSelected={selectedFilter === filter.value}
              >
                <S.FilterThumbnail>
                  <img
                    src={backgroundImageUrl}
                    alt={filter.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      filter: filter.style,
                    }}
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
