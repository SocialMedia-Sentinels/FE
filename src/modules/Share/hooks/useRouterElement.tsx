import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import path from '../constants/path'
import { AppContext } from '../contexts'
import AuthenticationLayout from '../layouts/AuthenticationLayout/AuthenticationLayout'
import HomeLayout from '../layouts/HomeLayout'
import { getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import HomeAdminLayout from '../layouts/HomeAdminLayout'
import NothingFound from '../components/NothingFound'

// Client
const LandingPage = lazy(() => import('src/modules/Authentication/pages/LandingPage'))
const ForgetPasswordPage = lazy(() => import('src/modules/Authentication/pages/ForgetPasswordPage'))
const ResetPasswordPage = lazy(() => import('src/modules/Authentication/pages/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('src/modules/Client/pages/VerifyEmailPage'))
const UserProfilePage = lazy(() => import('src/modules/Client/pages/UserProfilePage'))
const HomePage = lazy(() => import('src/modules/Client/pages/HomePage'))
const BookmarkPage = lazy(() => import('src/modules/Client/pages/BookmarkPage'))
const SuggestionPage = lazy(() => import('src/modules/Client/pages/SuggestionPage'))
const MarketplacePage = lazy(() => import('src/modules/Client/pages/MarketplacePage'))
const ChatPage = lazy(() => import('src/modules/Client/pages/ChatPage'))
const PostDetailPage = lazy(() => import('src/modules/Client/pages/PostDetailPage'))
const SearchPage = lazy(() => import('src/modules/Client/pages/SearchPage'))
// Admin
const Dashboard = lazy(() => import('src/modules/Admin/pages/DashboardPage'))
const UserManagementPage = lazy(() => import('src/modules/Admin/pages/UserManagementPage'))
const PostManagementPage = lazy(() => import('src/modules/Admin/pages/PostManagementPage'))
const TicketPage = lazy(() => import('src/modules/Admin/pages/TicketPage'))
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

const ProtectedUserRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.landing} />
}

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }
  if (isAuthenticated) {
    const token = getAccessTokenFromLocalStorage()
    const JWTInfo = parseJwt(token)
    return JWTInfo.role == 1 ? <Outlet /> : <Navigate to={path.home} />
  }
  return isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouterElement() {
  const routeElement = useRoutes([
    // Public Route
    {
      path: path.verify_email,
      element: (
        <Suspense>
          <VerifyEmailPage />
        </Suspense>
      )
    },

    // Rejected Route
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.landing,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <LandingPage />
              </Suspense>
            </AuthenticationLayout>
          )
        },
        {
          path: path.forget_password,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <ForgetPasswordPage />
              </Suspense>
            </AuthenticationLayout>
          )
        },
        {
          path: path.reset_password,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <ResetPasswordPage />
              </Suspense>
            </AuthenticationLayout>
          )
        }
      ]
    },
    // Protected User Route
    {
      path: '',
      element: <ProtectedUserRoute />,
      children: [
        {
          path: path.home,
          element: (
            <HomeLayout>
              <Suspense>
                <HomePage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.bookmarks,
          element: (
            <HomeLayout>
              <Suspense>
                <BookmarkPage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.suggestions,
          element: (
            <HomeLayout>
              <Suspense>
                <SuggestionPage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.marketplace,
          element: (
            <HomeLayout>
              <Suspense>
                <MarketplacePage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.chat,
          element: (
            <HomeLayout>
              <Suspense>
                <ChatPage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.post_detail,
          element: (
            <HomeLayout>
              <Suspense>
                <PostDetailPage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.user_profile,
          element: (
            <HomeLayout>
              <Suspense>
                <UserProfilePage />
              </Suspense>
            </HomeLayout>
          )
        },
        {
          path: path.search,
          element: (
            <HomeLayout>
              <Suspense>
                <SearchPage />
              </Suspense>
            </HomeLayout>
          )
        }
      ]
    },
    // Protected Route
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashboard,
          element: (
            <HomeAdminLayout>
              <Suspense>
                <Dashboard />
              </Suspense>
            </HomeAdminLayout>
          )
        },

        {
          path: path.users,
          element: (
            <HomeAdminLayout>
              <Suspense>
                <UserManagementPage />
              </Suspense>
            </HomeAdminLayout>
          )
        },
        {
          path: path.posts,
          element: (
            <HomeAdminLayout>
              <Suspense>
                <PostManagementPage />
              </Suspense>
            </HomeAdminLayout>
          )
        },
        {
          path: path.ticket,
          element: (
            <HomeAdminLayout>
              <Suspense>
                <TicketPage />
              </Suspense>
            </HomeAdminLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NothingFound />
        </Suspense>
      )
    }
  ])
  return routeElement
}
