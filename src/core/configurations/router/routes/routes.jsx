import { NormalLayout } from '~/core/components'
import { Category, Home, SignIn, SignUp, Topic } from '~/pages'
// import { App } from '~/pages'

export const routes = [
  {
    path: '/',
    element: <NormalLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ':category',
        element: <Category />,
        children: [
          {
            path: ':topic',
            element: <Topic />,
          },
        ],
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]
