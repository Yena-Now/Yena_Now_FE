import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import * as S from '@styles/pages/MyProfile/ChangePasswordStyle'
import * as T from '@styles/components/MyProfile/ProfileEditStyle'

const ChangePassword: React.FC = () => {
  const navigate = useNavigate()
  return (
    <T.Container>
      <T.TitleText>비밀번호 변경</T.TitleText>
      <T.Box>
        <T.Label>
          <label htmlFor="current-password">현재 비밀번호</label>
        </T.Label>
        <T.Input type="password" id="current-password" />
      </T.Box>
      <T.Box>
        <T.Label>
          <label htmlFor="new-password">새 비밀번호</label>
        </T.Label>
        <T.Input type="password" id="new-password" />
      </T.Box>
      <T.Box>
        <T.Label>
          <label htmlFor="check-password">비밀번호 확인</label>
        </T.Label>
        <T.Input type="password" id="check-password" />
      </T.Box>
      <T.Box>
        <S.GoBackSection>
          <S.GoBackText onClick={() => navigate(-1)}>
            <IoIosArrowBack size={12} />
            돌아가기
          </S.GoBackText>
        </S.GoBackSection>
        <T.PasswordChangeButton>비밀번호 변경</T.PasswordChangeButton>
      </T.Box>
    </T.Container>
  )
}

export default ChangePassword
