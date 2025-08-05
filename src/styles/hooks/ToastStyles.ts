import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 1rem;
    word-break: keep-all;
    white-space: pre-line;
    max-width: 400px;
    line-height: 1.5;
  }

  .Toastify__toast--success {
    background: #57ad5a;
    color: white;
  }

  .Toastify__toast--error {
    background: #c53030;
    color: white;
  }

  .Toastify__toast--info {
    background: #3498db;
    color: white;
  }

  .Toastify__toast--warning {
    background: #f1c40f;
    color: white;
  }

  .Toastify__toast {
    border-radius: 12px;
    font-family: 'Noto-Sans', 'Pretendard', sans-serif;
  }

  .Toastify__close-button {
    color: white;
  }

  .Toastify__toast--success .Toastify__toast-icon {
    svg {
      fill: #fff;
    }
  }

  .Toastify__toast--error .Toastify__toast-icon {
    svg {
      fill: #fff;
    }
  }

  .Toastify__toast--info .Toastify__toast-icon {
    svg {
      fill: #fff;
    }
  }

  .Toastify__toast--warning .Toastify__toast-icon {
    svg {
      fill: #fff;
    }
  }
`
