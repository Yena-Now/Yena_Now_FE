import { useMemo, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Profile } from '@/types/Profile'
import ProfileHeader from '@/components/UserProfile/ProfileHeader'
import type { NCut } from '@/types/NCutList'
import GalleryList from '@components/Gallery/GalleryList'

const UserProfilePage: React.FC = () => {
  const { userUuid } = useParams<{ userUuid?: string }>()
  const navigate = useNavigate()

  // 더미 프로필
  const [data, setData] = useState<Profile>({
    name: userUuid ? '서연희' : '나',
    nickname: userUuid ? '연히히' : 'me',
    profileUrl: null,
    followingCount: 73,
    followerCount: 342,
    totalCut: 18,
    mine: true,
    following: !!userUuid && false,
  })

  // ✅ 더미 갤러리 아이템 배열
  const items: NCut[] = useMemo(
    () => [
      {
        userUuid: '00000000-0000-0000-0000-000000000001',
        ncutUuid: '11111111-0000-0000-0000-000000000001',
        profileUrl: null,
        nickname: '연히히',
        thumbnailUrl: 'https://picsum.photos/id/237/600/450', // 이미지
        ncutUrl: 'https://picsum.photos/id/237/1200/900',
        likeCount: 12,
        relay: false,
      },
      {
        userUuid: '00000000-0000-0000-0000-000000000002',
        ncutUuid: '11111111-0000-0000-0000-000000000002',
        profileUrl: null,
        nickname: 'momo',
        thumbnailUrl: 'https://picsum.photos/id/1025/600/450', // 비디오 썸네일
        ncutUrl: '/videos/sample1.mp4', // mp4 → HoverVideoPlayer 재생됨
        likeCount: 34,
        relay: true,
      },
      {
        userUuid: '00000000-0000-0000-0000-000000000003',
        ncutUuid: '11111111-0000-0000-0000-000000000003',
        profileUrl: null,
        nickname: 'hana',
        thumbnailUrl: 'https://picsum.photos/id/1062/600/450',
        ncutUrl: 'https://picsum.photos/id/1062/1200/900',
        likeCount: 7,
        relay: false,
      },
      // ...원하면 더 추가
    ],
    [],
  )

  const handleClick = (item: NCut) => {
    navigate(`/gallery/${item.ncutUuid}`)
  }

  const handleEdit = useCallback(() => {
    navigate('/my-profile')
  }, [navigate])

  const handleToggleFollow = useCallback(() => {
    setData((prev) => ({
      ...prev,
      following: !prev.following,
      followerCount: prev.followerCount + (prev.following ? -1 : 1),
    }))
  }, [])

  return (
    <>
      <ProfileHeader
        data={data}
        onEditProfile={handleEdit}
        onToggleFollow={handleToggleFollow}
      />
      <GalleryList data={items} onItemClick={handleClick} />
    </>
  )
}

export default UserProfilePage
