import { NormalLayout } from '~/core/components'
// import { App } from '~/pages'

export const routes = [
	{
		path: '/',
		element: <NormalLayout />,
		children: [
			{
				index: true,
				element: "home",
			},
			{
				path: "login",
				element: "login",
			},
			{
				path: "register",
				element: "register",
			},
		],
	},
]
