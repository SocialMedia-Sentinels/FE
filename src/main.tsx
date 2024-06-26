import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './modules/Share/contexts/app.context.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
          <ToastContainer style={{ width: '460px' }} />
        </AppProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
