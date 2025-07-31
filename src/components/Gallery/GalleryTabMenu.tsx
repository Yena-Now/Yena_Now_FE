import * as S from '@styles/components/Common/GalleryTabMenu'

type tabType = 'public' | 'following'
type Props = {
  currentTab: tabType
  onClickTab: (tab: tabType) => void
}

const GalleryHeader = ({ currentTab, onClickTab }: Props) => {
  return (
    <S.GalleryTabWrapper>
      <S.GalleryTabMenu>
        <S.GalleryTab
          className={currentTab === 'public' ? 'active' : ''}
          onClick={() => onClickTab('public')}
        >
          공개 갤러리
        </S.GalleryTab>
        <S.GalleryTab
          className={currentTab === 'following' ? 'active' : ''}
          onClick={() => onClickTab('following')}
        >
          친구 갤러리
        </S.GalleryTab>
      </S.GalleryTabMenu>
      <S.Divider />
    </S.GalleryTabWrapper>
  )
}

export default GalleryHeader
