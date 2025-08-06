import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userAPI } from '@/api/user'
import { useToast } from '@/hooks/useToast'
import { validator } from '@/utils/validators'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import * as S from '@styles/pages/MyProfile/ChangePasswordStyle'
import * as T from '@styles/components/MyProfile/ProfileEditStyle'

const ChangePassword: React.FC = () => {
  const navigate = useNavigate()
  const { error, success } = useToast()
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')

  const handleSubmit = async () => {
    if (!validator.isValidatePassword(newPassword)) {
      error('비밀번호가 형식에 맞지 않습니다.')
      return
    }
    try {
      await userAPI.changePassword({ oldPassword, newPassword })
      success('비밀번호가 변경되었습니다.')
      navigate('/my-profile')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 400) {
          error('현재 비밀번호가 일치하지 않습니다.')
        } else if (status === 401) {
          error('로그인 정보가 만료되었습니다.\n다시 로그인 해주세요.')
        }
      } else {
        error('다시 시도해주세요.')
      }
    }
  }

  return (
    <T.Container>
      <T.TitleText>비밀번호 변경</T.TitleText>
      <T.Box>
        <S.Label>
          <label htmlFor="current-password">현재 비밀번호</label>
        </S.Label>
        <T.Input
          type="password"
          id="current-password"
          value={oldPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOldPassword(e.target.value)
          }
        />
      </T.Box>
      <T.Box>
        <S.Label>
          <label htmlFor="new-password">
            새 비밀번호 &nbsp;
            <S.ToolTipWrapper>
              <S.ToolTipIcon>
                <AiOutlineInfoCircle />
              </S.ToolTipIcon>
              <S.ToolTipContent>
                8~16자, 영문 대소문자/숫자 가능, 특수문자(@$!%*?&#) 포함 가능
              </S.ToolTipContent>
            </S.ToolTipWrapper>
          </label>
        </S.Label>
        <T.Input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />
      </T.Box>
      <T.Box>
        <S.Label>
          <label htmlFor="check-password">비밀번호 확인</label>
        </S.Label>
        <T.Input
          type="password"
          id="check-password"
          value={checkPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheckPassword(e.target.value)
          }
        />
      </T.Box>
      <S.MessageWrapper>
        {checkPassword.length >= 1 && (
          <>
            {newPassword === checkPassword ? (
              <S.MatchMessage>비밀번호가 일치합니다.</S.MatchMessage>
            ) : (
              <S.UnmatchMessage>비밀번호가 일치하지 않습니다.</S.UnmatchMessage>
            )}
          </>
        )}
      </S.MessageWrapper>
      <T.Box>
        <S.GoBackSection>
          <IoIosArrowBack size={12} color="grey" />
          <S.GoBackText onClick={() => navigate(-1)}>돌아가기</S.GoBackText>
        </S.GoBackSection>
        <S.PasswordChangeButton
          isAvailable={newPassword === checkPassword}
          onClick={handleSubmit}
        >
          비밀번호 변경
        </S.PasswordChangeButton>
      </T.Box>
    </T.Container>
  )
}

export default ChangePassword
