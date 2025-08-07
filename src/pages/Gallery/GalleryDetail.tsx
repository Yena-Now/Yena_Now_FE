import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserInfo from '@components/GalleryDetail/UserInfo'
import PhotoSection from '@components/GalleryDetail/PhotoSection'
import PostSection from '@components/GalleryDetail/PostSection'
import CommentSection from '@components/GalleryDetail/CommentSection'
import LikeButton from '@components/GalleryDetail/LikeButton'
import * as S from '@styles/pages/Gallery/GalleryDetailStyle'
import Input from '@components/Common/Input'
import ShareButton from '@components/GalleryDetail/ShareButton'
import DownloadButton from '@components/GalleryDetail/DownloadButton'
import PostEditButton from '@components/GalleryDetail/PostEditButton'
import VisibilityIcon from '@components/GalleryDetail/VisibilityIcon'
import { useToast } from '@/hooks/useToast'
import { nCutDetail } from '@/api/ncutdetail'
import type { NCutDetailType } from '@/types/NCutDetail'
import type { Comment } from '@/types/Comment'
import { commentAPI } from '@/api/comment'

const myUuid = 'user-01'

const GalleryDetailPage: React.FC = () => {
  const { ncutUuid } = useParams<{ ncutUuid: string }>()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const [detailData, setDetailData] = useState<NCutDetailType | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [visibility, setVisibility] = useState<'PUBLIC' | 'FOLLOW' | 'PRIVATE'>(
    'PUBLIC',
  )
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const USE_DUMMY = true

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (USE_DUMMY) {
          const dummy: NCutDetailType = {
            ncutUuid: 'dummy-uuid',
            ncutUrl:
              'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            userUuid: 'user-01',
            nickname: '더미유저',
            profileUrl: 'https://picsum.photos/50/50',
            content: '🐰 테스트용 더미 게시글입니다.',
            createdAt: new Date().toISOString(),
            likeCount: 10,
            commentCount: 0,
            isRelay: false,
            visibility: 'PUBLIC',
            isMine: true,
          }

          const dummyComments: Comment[] = [
            {
              commentUuid: 'comment-1',
              comment: '첫 번째 더미 댓글입니다.',
              userUuid: 'user-02',
              nickname: '댓글유저1',
              profileUrl: 'https://picsum.photos/seed/c1/40/40',
              createdAt: new Date().toISOString(),
            },
            {
              commentUuid: 'comment-2',
              comment: '두 번째 댓글은 나야!',
              userUuid: 'user-01',
              nickname: '나',
              profileUrl: 'https://picsum.photos/seed/c2/40/40',
              createdAt: new Date().toISOString(),
            },
          ]

          setDetailData(dummy)
          setPostContent(dummy.content)
          setVisibility(dummy.visibility)
          setComments(dummyComments)
          return
        }

        if (!ncutUuid) return

        const detail = await nCutDetail.getNCutDetail(ncutUuid)
        const commentRes = await commentAPI.getComments(ncutUuid)

        setDetailData(detail)
        setPostContent(detail.content)
        setVisibility(detail.visibility)
        setComments(commentRes.comments)
      } catch {
        error('데이터 불러오기 실패')
      }
    }
    fetchData()
  }, [ncutUuid])

  const handleUpdatePost = async (newContent: string) => {
    if (!detailData) return
    try {
      await nCutDetail.updateNCut(detailData.ncutUuid, newContent)
      setPostContent(newContent)
      success('게시글이 수정되었습니다.')
    } catch {
      error('게시글 수정 실패')
    }
  }

  const handleChangeVisibility = async (
    newValue: 'PUBLIC' | 'FOLLOW' | 'PRIVATE',
  ) => {
    if (!detailData) return
    try {
      await nCutDetail.updateVisibility(detailData.ncutUuid, newValue)
      setVisibility(newValue)
      success('공개 범위가 변경되었습니다.')
    } catch {
      error('공개 범위 변경 실패')
    }
  }

  const handleDeletePost = async () => {
    if (!detailData) return
    try {
      await nCutDetail.deleteNCut(detailData.ncutUuid)
      success('게시글이 삭제되었습니다.')
      navigate('/gallery')
    } catch {
      error('게시글 삭제 실패')
    }
  }

  const handleAddComment = async () => {
    if (!ncutUuid || !newComment.trim()) return
    try {
      const comment = await commentAPI.addComment(ncutUuid, newComment)
      setComments((prev) => [...prev, comment])
      setNewComment('')
      success('댓글이 작성되었습니다.')
    } catch {
      error('댓글 작성 실패')
    }
  }

  const handleEditComment = async (commentUuid: string, newContent: string) => {
    try {
      await commentAPI.updateComment(commentUuid, newContent)
      setComments((prev) =>
        prev.map((c) =>
          c.commentUuid === commentUuid ? { ...c, comment: newContent } : c,
        ),
      )
      success('댓글이 수정되었습니다.')
    } catch {
      error('댓글 수정 실패')
    }
  }

  const handleDeleteComment = async (commentUuid: string) => {
    try {
      await commentAPI.deleteComment(commentUuid)
      setComments((prev) => prev.filter((c) => c.commentUuid !== commentUuid))
      success('댓글이 삭제되었습니다.')
    } catch {
      error('댓글 삭제 실패')
    }
  }

  if (!detailData) return <div>로딩 중...</div>

  return (
    <S.DetailBox>
      <S.LeftColumn>
        <S.PhotoHeader>
          <UserInfo
            profileUrl={detailData.profileUrl}
            nickname={detailData.nickname}
            createdAt={detailData.createdAt}
            onClick={() => {}}
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
                  onChangeVisibility={handleChangeVisibility}
                  onDelete={handleDeletePost}
                />
              )}
            </S.ButtonBox>
          </S.PostHeader>

          <PostSection
            content={postContent}
            isMine={detailData.isMine}
            isEditingFromParent={isEditing}
            onUpdateContent={handleUpdatePost}
            onFinishEdit={() => setIsEditing(false)}
          />

          <S.Divider />
          <S.CommentContainer>
            {comments.map((c) => (
              <CommentSection
                key={c.commentUuid}
                profileUrl={c.profileUrl}
                nickname={c.nickname}
                comment={c.comment}
                isMyComment={c.userUuid === myUuid}
                isMine={detailData.isMine}
                onEdit={(newComment) =>
                  handleEditComment(c.commentUuid, newComment)
                }
                onDelete={() => handleDeleteComment(c.commentUuid)}
                onOwnerDelete={() => handleDeleteComment(c.commentUuid)}
              />
            ))}
          </S.CommentContainer>
          <S.InputBox>
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onSubmitCustom={handleAddComment}
              placeholder="댓글을 입력하세요"
            />
          </S.InputBox>
        </S.CommentBox>
      </S.RightColumn>
    </S.DetailBox>
  )
}

export default GalleryDetailPage
