import { NormalLayout } from '~/core/components'
import { App, Category, Home, SignIn, SignUp, Statistics, Topic } from '~/pages'
import { Accounts } from '~/pages/accounts/Accounts'

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
			{
				path: 'app',
				element: <App />,
			},
			{
				path: 'statistics',
				element: <Statistics />,
			},
			{
				path: 'manage',
				element: <Accounts />,
			},
		],
	},
]
