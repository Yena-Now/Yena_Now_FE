import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as S from '@styles/components/Common/LoadingStyle'
import type { Profile, FollowUser } from '@/types/Profile'
import type { NCut, NCutList } from '@/types/NCutList'
import ProfileHeader from '@/components/UserProfile/ProfileHeader'
import GalleryList from '@components/Gallery/GalleryList'
import { profileAPI } from '@/api/profile'
import { galleryAPI } from '@/api/gallerylist'
import UserFollowListModal from '@components/Common/FollowModal'

const UserProfilePage: React.FC = () => {
  const { userUuid } = useParams<{ userUuid?: string }>()
  const navigate = useNavigate()

  const [myUuid] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : localStorage.getItem('userUuid'),
  )
  const targetUuid = userUuid ?? myUuid ?? undefined

  const [data, setData] = useState<Profile | null>(null)
  const [, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  const [gallery, setGallery] = useState<NCut[]>([])
  const [gLoading, setGLoading] = useState(true)
  const [gError, setGError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalUsers, setModalUsers] = useState<FollowUser[]>([])

  const openFollowings = useCallback(async () => {
    if (!data) return
    setModalTitle('팔로잉')
    setIsModalOpen(true)
    const res = data.mine
      ? await profileAPI.getMyFollowings({ page: 0, size: 30 })
      : await profileAPI.getFollowings(userUuid!, { page: 0, size: 30 })
    setModalUsers(res.followings)
  }, [data, userUuid])

  const openFollowers = useCallback(async () => {
    if (!data) return
    setModalTitle('팔로워')
    setIsModalOpen(true)
    const res = data.mine
      ? await profileAPI.getMyFollowers({ page: 0, size: 30 })
      : await profileAPI.getFollowers(userUuid!, { page: 0, size: 30 })
    setModalUsers(res.followers)
  }, [data, userUuid])

  const fetchProfile = useCallback(async () => {
    if (!targetUuid) {
      setError('로그인 정보를 찾을 수 없어 프로필을 불러올 수 없어요.')
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)
      const res = await profileAPI.get(targetUuid)
      setData(res)
    } catch {
      setError('프로필 정보를 불러오지 못했어요.')
    } finally {
      setLoading(false)
    }
  }, [targetUuid])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setGLoading(true)
        setGError(null)
        const res: NCutList = userUuid
          ? await galleryAPI.getUserGalleryList(userUuid)
          : await galleryAPI.getMyGalleryList()
        if (!cancelled) {
          setGallery(res.ncuts)
        }
      } catch {
        if (!cancelled) setGError('갤러리를 불러오지 못했어요.')
      } finally {
        if (!cancelled) setGLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [userUuid])

  const handleEdit = useCallback(() => {
    navigate('/my-profile')
  }, [navigate])

  const handleToggleFollow = useCallback(async () => {
    if (!data || data.mine || !userUuid) return
    const prev = data
    setData({
      ...data,
      following: !data.following,
      followerCount: data.followerCount + (data.following ? -1 : 1),
    })
    try {
      if (prev.following) await profileAPI.unfollow(userUuid)
      else await profileAPI.follow(userUuid)
    } catch {
      setData(prev)
      setError('팔로우 상태 변경에 실패했어요. 잠시 후 다시 시도해 주세요.')
    }
  }, [data, userUuid])

  const handleItemClick = (ncutUuid: string) => navigate(`/gallery/${ncutUuid}`)

  if (!data) return null

  return (
    <>
      <ProfileHeader
        data={data}
        onEditProfile={handleEdit}
        onToggleFollow={handleToggleFollow}
        onClickFollowingCount={openFollowings}
        onClickFollowerCount={openFollowers}
      />

      {gLoading ? (
        <S.LoaderWrapper>
          <S.Spinner />
          <S.LoadingText>로딩 중입니다...</S.LoadingText>
        </S.LoaderWrapper>
      ) : gError ? (
        <div>{gError}</div>
      ) : (
        <GalleryList
          data={gallery}
          onItemClick={(item) => handleItemClick(item.ncutUuid)}
          showOwnerAvatar={false}
        />
      )}

      <UserFollowListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        users={modalUsers}
        listType={modalTitle === '팔로잉' ? 'followings' : 'followers'}
        onDeltaFollowing={(delta) => {
          setData((prev) => {
            if (!prev || !prev.mine) return prev
            return { ...prev, followingCount: prev.followingCount + delta }
          })
        }}
      />
    </>
  )
}

export default UserProfilePage
