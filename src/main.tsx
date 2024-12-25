import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { NewChakraProvider } from "../src/components/ui/providers/chakraProvider"
import { store } from './store/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = '175173861007-758i9j5a1ndb38g6nnofuci4b3rkihrl.apps.googleusercontent.com'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <NewChakraProvider>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </NewChakraProvider>
  </StrictMode>,
)
