import React, { useState } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'

import First from '@components/NCut/Create/First'
import Second from '@components/NCut/Create/Second'
import Third from '@components/NCut/Create/Third'
import { MdNavigateNext, MdOutlineSmokingRooms } from 'react-icons/md'
import Fourth from '@components/NCut/Create/Fourth'
import { FaCheck } from 'react-icons/fa6'
import Fifth from '@components/NCut/Create/Fifth'
import Last from '@components/NCut/Create/Last'

const CreateSession: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState({
    backgroundImage: null as File | null,
    backgroundImageUrl: null as string | null,
    selectedFilter: 'basic',
    isImageUploaded: false,
    takeCnt: 6,
    cutCnt: 2,
    timeLimit: 10,
  })

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pages.length - 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
    console.log('Updated formData:', { ...formData, ...newData })
  }

  const pages = [
    <First
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Second
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Third onFormDataChange={handleFormDataChange} />,
    <Fourth onFormDataChange={handleFormDataChange} />,
    <Fifth onFormDataChange={handleFormDataChange} />,
    <Last sessionId="123456" />,
  ]

  return (
    <G.NCutCreateLayout>
      {currentIndex > 0 && currentIndex < pages.length - 1 && (
        <G.NCutPrvButton onClick={handlePrev}>
          <MdNavigateNext
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
              transform: 'rotate(180deg)',
            }}
          />
        </G.NCutPrvButton>
      )}
      <G.NcutCreateContainer>
        {currentIndex !== pages.length - 1 && (
          <G.NCutCreateIcon>
            <MdOutlineSmokingRooms
              style={{
                width: '100px',
                height: '100px',
              }}
            />
          </G.NCutCreateIcon>
        )}
        {pages[currentIndex]}
      </G.NcutCreateContainer>
      {currentIndex < pages.length - 1 && (
        <G.NCutNextButton onClick={handleNext}>
          <MdNavigateNext
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
            }}
          />
        </G.NCutNextButton>
      )}
      {currentIndex === pages.length - 2 && (
        <G.NCutNextButton
          onClick={() => {
            console.log('Submit form data:', formData)
            handleNext()
          }}
        >
          <FaCheck
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
            }}
          />
        </G.NCutNextButton>
      )}
    </G.NCutCreateLayout>
  )
}

export default CreateSession
