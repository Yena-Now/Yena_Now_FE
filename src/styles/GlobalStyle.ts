import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  body {
    line-height: 1;
  }
  
  ol, ul {
    list-style: none;
  }
  
  blockquote, q {
    quotes: none;
  }
  
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Design Tokens */
  :root {
    --color-primary: #F7BE3B;
    --color-primary-hover: #F0B52E;
    --color-primary-light: rgba(247, 190, 59, 0.1);
    --color-primary-focus: rgba(247, 190, 59, 0.45);
    
    --color-text-strong: #111827;
    --color-text: #374151;
    --color-text-muted: #6B7280;
    --color-text-light: #9CA3AF;
    
    --color-surface: #FFFFFF;
    --color-surface-2: #F9FAFB;
    --color-surface-3: #F3F4F6;
    
    --color-border: #E5E7EB;
    --color-border-light: #F3F4F6;
    
    --color-success: #10B981;
    --color-error: #EF4444;
    --color-warning: #F59E0B;
    
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-full: 9999px;
    
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
    --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.12);
    
    --spacing-1: 4px;
    --spacing-2: 8px;
    --spacing-3: 12px;
    --spacing-4: 16px;
    --spacing-5: 20px;
    --spacing-6: 24px;
    --spacing-8: 32px;
    --spacing-10: 40px;
    --spacing-12: 48px;
    --spacing-16: 64px;
    
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-base: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-2xl: 24px;
    --font-size-3xl: 28px;
    
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    --transition-fast: 120ms ease;
    --transition: 180ms ease;
    --transition-slow: 250ms ease;
    
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal: 1040;
    --z-popover: 1050;
    --z-tooltip: 1060;
  }

  /* Base Styles */
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.6;
    color: var(--color-text);
    background-color: var(--color-surface-2);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Landing 페이지 제외한 페이지에만 적용 */
  body:not([data-page="landing"]) {
    background-color: var(--color-surface-2);
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--font-weight-bold);
    line-height: 1.3;
    color: var(--color-text-strong);
  }

  h1 { font-size: var(--font-size-3xl); }
  h2 { font-size: var(--font-size-2xl); }
  h3 { font-size: var(--font-size-xl); }
  h4 { font-size: var(--font-size-lg); }
  h5 { font-size: var(--font-size-base); }
  h6 { font-size: var(--font-size-sm); }

  p {
    margin-bottom: var(--spacing-4);
    line-height: 1.6;
  }

  /* Links */
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition);
  }

  a:hover {
    color: var(--color-primary-hover);
  }

  /* Focus Styles */
  *:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
    border-radius: var(--radius-sm);
  }

  /* Button Reset */
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }

  /* Image */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form Elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-surface-3);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--radius-full);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-light);
  }

  /* Selection */
  ::selection {
    background-color: var(--color-primary-light);
    color: var(--color-text-strong);
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(var(--spacing-4), 4vw, var(--spacing-16));
  }

  .page-layout {
    min-height: 100vh;
    padding-top: var(--spacing-16);
    padding-bottom: var(--spacing-8);
  }

  .card {
    background: var(--color-surface);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    transition: all var(--transition);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3) var(--spacing-4);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
    transition: all var(--transition);
    cursor: pointer;
    border: none;
    text-decoration: none;
  }

  .btn-primary {
    background: var(--color-primary);
    color: var(--color-text-strong);
  }

  .btn-primary:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  .btn-outline {
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  .btn-outline:hover {
    background: var(--color-surface-2);
    border-color: var(--color-text-light);
  }

  .btn-ghost {
    background: transparent;
    color: var(--color-text);
  }

  .btn-ghost:hover {
    background: var(--color-surface-2);
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: var(--radius-full);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    background: var(--color-surface-2);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    transition: all var(--transition);
  }

  .chip:hover {
    background: var(--color-surface-3);
  }

  .chip.active {
    background: var(--color-primary);
    color: var(--color-text-strong);
    border-color: var(--color-primary);
  }

  .skeleton {
    background: linear-gradient(90deg, var(--color-surface-3) 25%, var(--color-surface-2) 50%, var(--color-surface-3) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-16);
    text-align: center;
    color: var(--color-text-muted);
  }

  .empty-state svg {
    width: 64px;
    height: 64px;
    margin-bottom: var(--spacing-4);
    opacity: 0.5;
  }

  /* Responsive */
  @media (max-width: 768px) {
    :root {
      --spacing-4: 12px;
      --spacing-6: 20px;
      --spacing-8: 24px;
      --spacing-16: 48px;
    }
    
    .page-layout {
      padding-top: var(--spacing-12);
      padding-bottom: var(--spacing-6);
    }
  }
`

export default GlobalStyle
