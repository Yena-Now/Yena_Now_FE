import React from 'react'

interface SessionPromptProps {
  onStart: () => void
}

export const SessionPrompt: React.FC<SessionPromptProps> = ({ onStart }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>세션 시작 준비</div>
      <div style={{ fontSize: '14px', color: '#666', maxWidth: '400px' }}>
        배경 제거 기능을 사용하기 위해 브라우저 권한이 필요합니다.
        <br />
        아래 버튼을 클릭하여 세션을 시작해주세요.
      </div>
      <button
        onClick={onStart}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        세션 시작하기
      </button>
    </div>
  )
}
