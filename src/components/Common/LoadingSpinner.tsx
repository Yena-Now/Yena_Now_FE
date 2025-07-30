import React from 'react'
import { css } from '@emotion/css'
import { loadingOverlaySpinnerAnimation } from '@styles/components/Common/GalleryCardStyle'

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className={css`
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          width: 4em;
          height: 4em;
          border: 6px solid white;
          border-radius: 50%;
          border-color: white white transparent transparent;
          animation: ${loadingOverlaySpinnerAnimation} 1s linear infinite;
        `}
      />
    </div>
  )
}

export default LoadingSpinner
