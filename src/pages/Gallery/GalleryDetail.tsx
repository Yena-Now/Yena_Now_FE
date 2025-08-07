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

// 더미 데이터 (나의 UUID)
const myUuid = 'user-01'

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

  // 댓글 리스트 (더미 데이터)
  const [comments, setComments] = useState([
    {
      commentUuid: 'c1',
      userUuid: 'user-01',
      profileUrl: 'https://picsum.photos/50/50?random=1',
      nickname: '연히',
      content: '내가 쓴 댓글이에요',
    },
    {
      commentUuid: 'c2',
      userUuid: 'user-02',
      profileUrl: 'https://picsum.photos/50/50?random=2',
      nickname: '철수',
      content: '남이 쓴 댓글이에요',
    },
  ])

  useEffect(() => {
    const fetchData = async () => {
      const data: NCutDetail = {
        ncutUuid: ncutUuid || 'dummy-uuid',
        ncutUrl:
          'https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4',
        userUuid: 'user-01', // 게시글 작성자
        nickname: '연히',
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6ywSWMBFVR3g-yXTaAW-K7WY6-q15ruZ1Q&s',
        content: '잠와 죽겠다',
        createdAt: '2025-07-28',
        likeCount: 0,
        commentCount: 2,
        isRelay: false,
        visibility: 'Follow',
        isMine: true, // 내 글 여부
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
            userUuid={detailData.userUuid}
            nickname={detailData.nickname}
            createdAt={detailData.createdAt}
            onClick={() => console.log('UserInfo clicked')}
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
                  onChangeVisibility={setVisibility}
                />
              )}
            </S.ButtonBox>
          </S.PostHeader>

          <PostSection
            content={postContent}
            isEditingFromParent={isEditing}
            onUpdateContent={(newContent) => {
              setPostContent(newContent)
              setIsEditing(false)
            }}
            onFinishEdit={() => setIsEditing(false)}
          />

          <S.Divider />
          <S.CommentContainer>
            {comments.map((c) => (
              <CommentSection
                key={c.commentUuid}
                profileUrl={c.profileUrl}
                nickname={c.nickname}
                comment={c.content}
                userUuid={c.userUuid} // 댓글 작성자의 UUID'
                isMyComment={c.userUuid === myUuid} // 내가 쓴 댓글인지 판별
                isMine={detailData.isMine} // 내 글 여부
                onEdit={(newComment) => {
                  console.log('수정된 댓글:', newComment)
                  setComments((prev) =>
                    prev.map((cm) =>
                      cm.commentUuid === c.commentUuid
                        ? { ...cm, content: newComment }
                        : cm,
                    ),
                  )
                }}
                onDelete={() => {
                  console.log('내 댓글 삭제:', c.commentUuid)
                  setComments((prev) =>
                    prev.filter((cm) => cm.commentUuid !== c.commentUuid),
                  )
                }}
                onOwnerDelete={() => {
                  console.log('내 글 + 타인 댓글 삭제:', c.commentUuid)
                  setComments((prev) =>
                    prev.filter((cm) => cm.commentUuid !== c.commentUuid),
                  )
                }}
              />
            ))}
          </S.CommentContainer>
          <S.InputBox>
            <Input />
          </S.InputBox>
        </S.CommentBox>
      </S.RightColumn>
    </S.DetailBox>
  )
}

export default GalleryDetailPage
