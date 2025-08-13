import React, { useState, useEffect, useRef } from 'react'
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
  const lastCommentRef = useRef<HTMLDivElement | null>(null)
  const [myUuid, setMyUuid] = useState<string | null>(null)

  const sortByCreatedAtAsc = (list: Comment[]) =>
    [...list].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

  useEffect(() => {
    setMyUuid(localStorage.getItem('userUuid'))
  }, [])

  useEffect(() => {
    setMyUuid(localStorage.getItem('userUuid'))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!ncutUuid) return
        const detail = await nCutDetail.getNCutDetail(ncutUuid)
        const commentRes = await commentAPI.getComments(ncutUuid)
        setDetailData(detail)
        setPostContent(detail.content)
        setVisibility(detail.visibility)
        setComments(sortByCreatedAtAsc(commentRes.comments))
      } catch {
        error('데이터 불러오기 실패')
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ncutUuid])

  const handleUpdatePost = async (newContent: string) => {
    if (!detailData) return
    try {
      await nCutDetail.updateNCut(detailData.ncutUuid, newContent)
      setPostContent(newContent)
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

  const deletingRef = useRef(false)

  const handleDeletePost = async () => {
    if (!detailData || deletingRef.current) return
    deletingRef.current = true
    try {
      console.log('[NCUT_DELETE] call', detailData.ncutUuid)
      await nCutDetail.deleteNCut(detailData.ncutUuid)
      navigate('/gallery', { replace: true })
    } catch (e) {
      console.error('[NCUT_DELETE_ERR]', e)
      error('N컷 삭제 실패')
    } finally {
      deletingRef.current = false
    }
  }

  const handleAddComment = async () => {
    if (!ncutUuid || !newComment.trim()) return
    try {
      const res = await commentAPI.addComment(ncutUuid, newComment)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = res && 'data' in res ? (res as any).data : res

      if (raw?.commentUuid) {
        const created: Comment = {
          commentUuid: raw.commentUuid,
          ncutUuid,
          userUuid: raw.userUuid ?? (localStorage.getItem('userUuid') || ''),
          nickname: raw.nickname ?? detailData?.nickname ?? '',
          profileUrl: raw.profileUrl ?? detailData?.profileUrl ?? '',
          comment: raw.comment ?? raw.content ?? newComment,
          createdAt: raw.createdAt ?? new Date().toISOString(),
        }
        setComments((prev) => sortByCreatedAtAsc([...prev, created]))
      } else {
        const sync = await commentAPI.getComments(ncutUuid)
        setComments(sortByCreatedAtAsc(sync.comments))
      }

      setNewComment('')
      success('댓글이 작성되었습니다.')
    } catch {
      error('댓글 작성 실패')
    }
  }

  useEffect(() => {
    lastCommentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  const handleEditComment = async (
    commentUuid: string,
    newContent: string,
    ncutUuid: string,
  ) => {
    try {
      await commentAPI.updateComment(ncutUuid, commentUuid, newContent)
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
    const targetNcutUuid = detailData?.ncutUuid || ncutUuid
    console.log('[HANDLE_DELETE] start', {
      commentUuid,
      ncutUuid: targetNcutUuid,
    })
    if (!commentUuid || !targetNcutUuid) {
      console.warn('[HANDLE_DELETE] early-return', {
        commentUuid,
        ncutUuid: targetNcutUuid,
      })
      return
    }
    try {
      await commentAPI.deleteComment(targetNcutUuid, commentUuid)
      setComments((prev) => prev.filter((c) => c.commentUuid !== commentUuid))
      const latest = await commentAPI.getComments(targetNcutUuid)
      setComments(sortByCreatedAtAsc(latest.comments))
      success('댓글이 삭제되었습니다.')
    } catch (e) {
      console.error('[DELETE_ERR]', e)
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
            {detailData ? <LikeButton data={detailData} /> : null}
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
            {comments.map((c, idx) => (
              <div
                key={c.commentUuid || `temp-${idx}`}
                ref={idx === comments.length - 1 ? lastCommentRef : null}
              >
                <CommentSection
                  profileUrl={c.profileUrl}
                  nickname={c.nickname}
                  ncutUuid={c.ncutUuid}
                  comment={c.comment}
                  isMyComment={c.userUuid === myUuid}
                  isMine={detailData.userUuid === myUuid}
                  onEdit={(newComment) =>
                    handleEditComment(c.commentUuid, newComment, c.ncutUuid)
                  }
                  onDelete={() => handleDeleteComment(c.commentUuid)}
                  onOwnerDelete={() => handleDeleteComment(c.commentUuid)}
                />
              </div>
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
