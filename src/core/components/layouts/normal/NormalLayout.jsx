import { Anchor, AppShell, Breadcrumbs, Header } from '@mantine/core'
import { Link, Outlet } from 'react-router-dom'

export function NormalLayout() {
	return (
		<AppShell
			padding="md"
			header={
				<Header
					height={50}
					p="md">
					{/* Header content */}
					<Breadcrumbs>
						{/* <Anchor
							component={Link}
							to=""
							size="md">
							Home
						</Anchor>
						<Anchor
							component={Link}
							to="login"
							size="md">
							Login
						</Anchor>
						<Anchor
							component={Link}
							to="register"
							size="md">
							Register
						</Anchor> */}
					</Breadcrumbs>
				</Header>
			}
			styles={(theme) => ({
				root: {
					flexGrow: 1,
				},
				body: {
					height: 'calc(100% - 50px)',
				},
			})}>
			{/* Your application here */}
			<Outlet />
		</AppShell>
	)
}

export default NormalLayout
