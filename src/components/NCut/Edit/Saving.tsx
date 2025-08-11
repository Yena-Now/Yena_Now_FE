import React, { useState, useEffect } from 'react'
import * as S from '@styles/components/NCut/Edit/SavingStyle'

type Visibility = 'FOLLOW' | 'PRIVATE' | 'PUBLIC'

type SavingProps = {
  mergedUrl: string
  onSubmit: (content: string, visibility: Visibility) => void
  isSubmitting: boolean
}

const Saving: React.FC<SavingProps> = ({
  mergedUrl,
  onSubmit,
  isSubmitting,
}) => {
  const [content, setContent] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>('PUBLIC')

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onSubmit(newContent, visibility)
  }

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVisibility = e.target.value as Visibility
    setVisibility(newVisibility)
    onSubmit(content, newVisibility)
  }

  useEffect(() => {
    onSubmit(content, visibility)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.SavingContainer>
      <S.ImageContainer>
        <S.ResultImage src={mergedUrl} alt="Merged NCut" />
      </S.ImageContainer>
      <S.InputArea>
        <S.ContentInput
          value={content}
          onChange={handleContentChange}
          disabled={isSubmitting}
          placeholder="내용을 입력해주세요 (선택사항)"
        />
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="visibility-status">공개 범위: </label>
          <select
            id="visibility-status"
            value={visibility}
            onChange={handleVisibilityChange}
            disabled={isSubmitting}
            style={{ padding: '5px' }}
          >
            <option value="PUBLIC">전체공개</option>
            <option value="FOLLOW">팔로워 공개</option>
            <option value="PRIVATE">비공개</option>
          </select>
        </div>
      </S.InputArea>
    </S.SavingContainer>
  )
}

export default Saving
