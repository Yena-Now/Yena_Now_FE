import React, { useState } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'

import First from '@components/NCut/Create/First'
import Second from '@components/NCut/Create/Second'
import { MdNavigateNext } from 'react-icons/md'

const CreateSession: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState({
    backgroundImage: null as File | null,
    backgroundImageUrl: null as string | null,
    isImageUploaded: false,
    sessionName: '',
    sessionDescription: '',
    sessionDate: '',
    sessionTime: '',
    sessionLocation: '',
  })

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pages.length - 1))
  }

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const pages = [
    <First
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Second />,
  ]

  return (
    <G.NCutCreateLayout>
      {pages[currentIndex]}
      <G.NCutNextButton onClick={handleNext}>
        <MdNavigateNext
          style={{
            width: '30px',
            height: '30px',
            color: 'white',
          }}
        />
      </G.NCutNextButton>
    </G.NCutCreateLayout>
  )
}

export default CreateSession
