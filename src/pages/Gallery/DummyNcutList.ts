import type { NCutList } from '@/types/NCutList'

export const dummyNCutList: NCutList = {
  totalPage: 3,
  ncuts: [
    {
      userUuid: 'user-001',
      profileUrl: 'https://i.pravatar.cc/150?img=1',
      nickname: '예나짱',
      ncut_uuid: 'ncut-001',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1603415526960-f8f7b0e26b47?w=400',
      likeCount: 15,
      isRelay: false,
    },
    {
      userUuid: 'user-002',
      profileUrl: 'https://i.pravatar.cc/150?img=2',
      nickname: '사진왕',
      ncut_uuid: 'ncut-002',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400',
      likeCount: 33,
      isRelay: true,
    },
    {
      userUuid: 'user-003',
      profileUrl: 'https://i.pravatar.cc/150?img=3',
      nickname: '찰칵이',
      ncut_uuid: 'ncut-003',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
      likeCount: 7,
      isRelay: false,
    },
    {
      userUuid: 'user-004',
      profileUrl: 'https://i.pravatar.cc/150?img=4',
      nickname: '프레임러버',
      ncut_uuid: 'ncut-004',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400',
      likeCount: 51,
      isRelay: true,
    },
  ],
}
