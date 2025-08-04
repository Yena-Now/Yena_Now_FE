import React from 'react'

interface LoadingScreenProps {
  connectionStatus: string
  isBackgroundProcessing: boolean
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  connectionStatus,
  isBackgroundProcessing,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div>세션에 연결 중...</div>
      <div style={{ fontSize: '14px', color: '#666' }}>{connectionStatus}</div>
      {isBackgroundProcessing && (
        <div style={{ fontSize: '12px', color: '#888' }}>
          배경 제거 처리 중...
        </div>
      )}
    </div>
  )
}
