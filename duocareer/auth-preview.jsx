import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AuthPreview from './dev/AuthPreview'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPreview />
  </StrictMode>
)