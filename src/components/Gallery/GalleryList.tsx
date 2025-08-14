import React from 'react'
import GalleryCard from '@components/Common/GalleryCard'
import type { NCut } from '@/types/NCutList'
import * as S from '@styles/pages/Gallery/GalleryListStyle'

interface GalleryListProps {
  data: NCut[]
  onItemClick?: (item: NCut) => void
  showOwnerAvatar?: boolean
}

const GalleryList: React.FC<GalleryListProps> = ({
  data,
  onItemClick,
  showOwnerAvatar = true,
}) => {
  return (
    <S.GalleryList>
      {data.map((item) => (
        <GalleryCard
          key={item.ncutUuid}
          {...item}
          onClick={() => onItemClick?.(item)}
          showOwnerAvatar={showOwnerAvatar}
        />
      ))}
    </S.GalleryList>
  )
}

export default GalleryList
