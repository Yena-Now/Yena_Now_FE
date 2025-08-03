import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/FirstStyle'
import React from 'react'

interface FirstCreateStepProps {
  backgroundImageUrl: string | null
  isImageUploaded: boolean
  onFormDataChange: (data: {
    backgroundImage: File
    backgroundImageUrl: string
    isImageUploaded: boolean
  }) => void
}

function FirstCreateStep({
  backgroundImageUrl,
  isImageUploaded,
  onFormDataChange,
}: FirstCreateStepProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onFormDataChange({
        backgroundImage: file,
        backgroundImageUrl: url,
        isImageUploaded: true,
      })
    }
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 부스 생성</G.NcutCreateHeader>
      <G.NcutCreateDescription>배경을 업로드해주세요.</G.NcutCreateDescription>
      <S.ImageUploadContainer>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          style={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F3F0F0',
            borderRadius: '5%',
            border: '0.2px solid #000',
          }}
        >
          {isImageUploaded ? (
            <img
              src={backgroundImageUrl || ''}
              alt="배경 이미지 미리보기"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '5%',
              }}
            />
          ) : (
            <span>이미지를 업로드해주세요</span>
          )}
        </label>
      </S.ImageUploadContainer>
    </G.NCutCreateContentContainer>
  )
}

export default FirstCreateStep
