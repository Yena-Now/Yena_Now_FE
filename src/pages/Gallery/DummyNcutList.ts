import type { NCutList } from '@/types/NCutList'

export const dummyNCutList: NCutList = {
  totalPage: 1,
  ncuts: [
    {
      userUuid: 'user-1',
      profileUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      nickname: '예나',
      ncut_uuid: 'ncut-001',
      thumbnailUrl: 'https://placekitten.com/300/400', // 사진 썸네일
      ncutURL: 'https://placekitten.com/800/1000', // 실제 사진
      likeCount: 24,
      isRelay: false,
      onClick: () => {
        console.log('Clicked 예나')
      },
    },
    {
      userUuid: 'user-2',
      profileUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
      nickname: '민수',
      ncut_uuid: 'ncut-002',
      thumbnailUrl: 'https://sample-videos.com/img/Sample-jpg-image-500kb.jpg', // 사진 썸네일
      ncutURL: 'https://sample-videos.com/img/Sample-jpg-image-1mb.jpg',
      likeCount: 53,
      isRelay: false,
      onClick: () => {
        console.log('Clicked 민수')
      },
    },
    {
      userUuid: 'user-3',
      profileUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      nickname: '수지',
      ncut_uuid: 'ncut-003',
      thumbnailUrl: 'https://img.youtube.com/vi/ScMzIvxBSi4/mqdefault.jpg', // 영상 썸네일 (YouTube)
      ncutURL: 'https://www.w3schools.com/html/mov_bbb.mp4', // 영상 URL
      likeCount: 102,
      isRelay: true,
      onClick: () => {
        console.log('Clicked 수지')
      },
    },
    {
      userUuid: 'user-4',
      profileUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      nickname: '현우',
      ncut_uuid: 'ncut-004',
      thumbnailUrl:
        'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217', // 영상 썸네일
      ncutURL:
        'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
      likeCount: 77,
      isRelay: true,
      onClick: () => {
        console.log('Clicked 현우')
      },
    },
  ],
}
