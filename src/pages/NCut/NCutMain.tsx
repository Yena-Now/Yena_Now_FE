import React from 'react'
import * as S from '@styles/pages/NCut/NCutMainStyle'
import { useNavigate } from 'react-router-dom'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'

export const NCutMain: React.FC = () => {
  const navigate = useNavigate()

  return (
    <S.MainPageContainer>
      <S.CardContainer>
        <S.Card>
          <S.IconSection>
            <S.Icon>
              <MdOutlineAddAPhoto />
            </S.Icon>
          </S.IconSection>
          <S.Title>촬영 부스 생성</S.Title>
          <S.Description>
            친구들과 함께 N컷을 촬영하고
            <br />
            특별한 순간을 만들어보세요.
          </S.Description>
          <S.Button
            onClick={() => {
              navigate('/film/create')
            }}
          >
            부스 <span>생성하기</span>
          </S.Button>
        </S.Card>
      </S.CardContainer>
      <S.CardContainer>
        <S.Card>
          <S.IconSection>
            <S.Icon>
              <FiUserPlus />
            </S.Icon>
          </S.IconSection>
          <S.Title>촬영 부스 참가</S.Title>
          <S.Description>
            초대 코드를 입력하여
            <br />
            친구의 N컷 촬영에 참가하세요.
          </S.Description>
          <S.Button
            onClick={() => {
              navigate('/film/participant')
            }}
          >
            부스 <span>참가하기</span>
          </S.Button>
        </S.Card>
      </S.CardContainer>
    </S.MainPageContainer>
  )
}

export default NCutMain
