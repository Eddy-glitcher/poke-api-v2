import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@/assets/styles/colors/colors.css'
import '@/assets/styles/fonts/font-sizes.css'
import 'normalize.css'
import GlobalContextProvider from './contexts/global.provider.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
