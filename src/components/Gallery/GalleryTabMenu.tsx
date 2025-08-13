import * as S from '@styles/components/Common/GalleryTabMenu'

type tabType = 'PUBLIC' | 'FOLLOW'
type Props = {
  currentTab: tabType
  onClickTab: (tab: tabType) => void
}

const GalleryHeader = ({ currentTab, onClickTab }: Props) => {
  return (
    <S.GalleryTabWrapper>
      <S.GalleryTabMenu>
        <S.GalleryTab
          className={currentTab === 'PUBLIC' ? 'active' : ''}
          onClick={() => onClickTab('PUBLIC')}
        >
          공개 갤러리
        </S.GalleryTab>
        <S.GalleryTab
          className={currentTab === 'FOLLOW' ? 'active' : ''}
          onClick={() => onClickTab('FOLLOW')}
        >
          친구 갤러리
        </S.GalleryTab>
      </S.GalleryTabMenu>
      <S.Divider />
    </S.GalleryTabWrapper>
  )
}

export default GalleryHeader
