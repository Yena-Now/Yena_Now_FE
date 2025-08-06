import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserInfo from '@components/GalleryDetail/UserInfo'
import PhotoSection from '@components/GalleryDetail/PhotoSection'
import PostSection from '@components/GalleryDetail/PostSection'
import CommentSection from '@components/GalleryDetail/CommentSection'
import LikeButton from '@components/GalleryDetail/LikeButton'
import * as S from '@styles/pages/Gallery/GalleryDetailStyle'
import Input from '@components/Common/Input'
import type { NCutDetail } from '@/types/NCutDetail'
import ShareButton from '@components/GalleryDetail/ShareButton'
import DownloadButton from '@components/GalleryDetail/DownloadButton'
import PostEditButton from '@components/GalleryDetail/PostEditButton'
import VisibilityIcon from '@components/GalleryDetail/VisibilityIcon'

const GalleryDetailPage: React.FC = () => {
  const { ncutUuid } = useParams<{ ncutUuid: string }>()
  const [detailData, setDetailData] = useState<NCutDetail | null>(null)

  // 글 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false)
  const [postContent, setPostContent] = useState('')

  // 공개 범위 상태
  const [visibility, setVisibility] = useState<'Public' | 'Follow' | 'Private'>(
    'Public',
  )

  useEffect(() => {
    const fetchData = async () => {
      const data: NCutDetail = {
        ncutUuid: ncutUuid || 'dummy-uuid',
        ncutUrl:
          'https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4',
        userUuid: 'user-uuid',
        nickname: '연히',
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6ywSWMBFVR3g-yXTaAW-K7WY6-q15ruZ1Q&s',
        content: '잠와 죽겠다',
        createdAt: '2025-07-28',
        likeCount: 0,
        commentCount: 1,
        isRelay: false,
        visibility: 'Follow',
        isMine: true,
      }
      setDetailData(data)
      setPostContent(data.content)
      setVisibility(data.visibility)
    }

    fetchData()
  }, [ncutUuid])

  if (!detailData) return <div>로딩 중...</div>

  return (
    <S.DetailBox>
      <S.LeftColumn>
        <S.PhotoHeader>
          <UserInfo
            profileUrl={detailData.profileUrl}
            nickname={detailData.nickname}
            createdAt={detailData.createdAt}
          />
          <S.ButtonBox>
            <ShareButton />
            {detailData.isMine && (
              <DownloadButton
                fileUrl={detailData.ncutUrl}
                ncutUuid={detailData.ncutUuid}
              />
            )}
          </S.ButtonBox>
        </S.PhotoHeader>
        <PhotoSection ncutUrl={detailData.ncutUrl} />
      </S.LeftColumn>

      <S.RightColumn>
        <S.CommentBox>
          <S.PostHeader>
            <LikeButton data={detailData} />
            <S.ButtonBox>
              <VisibilityIcon visibility={visibility} />
              {detailData.isMine && (
                <PostEditButton
                  onEdit={() => setIsEditing(true)}
                  initialVisibility={visibility}
                  onChangeVisibility={setVisibility} // PostEditButton에서 변경 반영
                />
              )}
            </S.ButtonBox>
          </S.PostHeader>

          <PostSection
            content={postContent}
            isMine={detailData.isMine}
            isEditingFromParent={isEditing}
            onUpdateContent={(newContent) => {
              setPostContent(newContent)
              setIsEditing(false)
            }}
            onFinishEdit={() => setIsEditing(false)}
          />

          <S.Divider />
          <CommentSection
            profileUrl={detailData.profileUrl}
            nickname={detailData.nickname}
            comment="집보내줘"
          />
        </S.CommentBox>

        <S.InputBox>
          <Input />
        </S.InputBox>
      </S.RightColumn>
    </S.DetailBox>
  )
}

export default GalleryDetailPage
