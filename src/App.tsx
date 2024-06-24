import { useContext, useEffect } from 'react'
import { AppContext } from './modules/Share/contexts'
import { LocalStorageEventTarget } from './modules/Authentication/utils'
import useRouteElements from './modules/Share/hooks/useRouterElement'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

const App = () => {
  const RouteElements = useRouteElements()

  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearToken', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearToken', reset)
    }
  })

  return <MantineProvider>{RouteElements}</MantineProvider>
}

export default App
