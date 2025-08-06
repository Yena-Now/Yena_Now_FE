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
import VisibilityIcon from '@components/GalleryDetail/VisivilityIcon'
import ShareButton from '@components/GalleryDetail/ShareButton'

const GalleryDetailPage: React.FC = () => {
  const { ncutUuid } = useParams<{ ncutUuid: string }>()
  const [detailData, setDetailData] = useState<NCutDetail | null>(null)

  useEffect(() => {
    // 🚀 API 연동 전까지는 더미데이터 사용
    const fetchData = async () => {
      // const res = await fetch(`/api/ncut/${ncutUuid}`)
      // const data: NCutDetail = await res.json()

      const data: NCutDetail = {
        ncutUuid: ncutUuid || 'dummy-uuid',
        ncutUrl:
          'https://image.fmkorea.com/files/attach/new3/20230916/486616/638012495/6186131518/67e5fcdd951103d74559a420ff5bb8c2.jpeg',
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
          <ShareButton ncutUrl={detailData.ncutUrl} />
        </S.PhotoHeader>
        <PhotoSection ncutUrl={detailData.ncutUrl} />
      </S.LeftColumn>

      <S.RightColumn>
        <S.CommentBox>
          <S.PostHeader>
            <LikeButton data={detailData} />
            <VisibilityIcon visibility={detailData.visibility} />
          </S.PostHeader>
          <PostSection content={detailData.content} />
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
