import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { profileAPI } from '@/api/profile'
import type { Profile } from '@/types/Profile'
import ProfileHeader from '@/components/UserProfile/ProfileHeader'

const UserProfilePage: React.FC = () => {
  const { userUuid } = useParams<{ userUuid: string }>()
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!userUuid) {
      setError('URL에 userUuid가 없어요.')
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await profileAPI.get(userUuid)
      setData(res)
      setError(null)
    } catch {
      setError('프로필 정보를 불러오지 못했어요.')
    } finally {
      setLoading(false)
    }
  }, [userUuid])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleEdit = useCallback(() => {}, [])

  const handleToggleFollow = useCallback(async () => {
    if (!userUuid) return
    const wasFollowing = !!data?.following

    setData((prev) =>
      prev
        ? {
            ...prev,
            following: !wasFollowing,
            followerCount: prev.followerCount + (wasFollowing ? -1 : 1),
          }
        : prev,
    )

    try {
      if (wasFollowing) await profileAPI.unfollow(userUuid)
      else await profileAPI.follow(userUuid)
    } catch {
      setData((prev) =>
        prev
          ? {
              ...prev,
              following: wasFollowing,
              followerCount: prev.followerCount + (wasFollowing ? 1 : -1),
            }
          : prev,
      )
    }
  }, [userUuid, data?.following])

  if (loading) return <div style={{ padding: 24 }}>로딩 중…</div>
  if (error || !data)
    return <div style={{ padding: 24 }}>{error ?? '데이터가 없어요.'}</div>

  return (
    <>
      <ProfileHeader
        data={data}
        onEditProfile={handleEdit}
        onToggleFollow={handleToggleFollow}
      />
    </>
  )
}

export default UserProfilePage
