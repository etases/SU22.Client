import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core'
import { App } from '~/pages'
import { useProps } from '~/hooks'

const initialProps = {
	children: null,
}

export function NormalLayout(props = initialProps) {
	const { children } = useProps({ props, initialProps })

	return (
		<AppShell
			padding="md"
			navbar={
				<Navbar
					width={{ base: 300 }}
					height={500}
					p="xs">
					{/* Navbar content */}
					navbar
				</Navbar>
			}
			header={
				<Header
					height={60}
					p="xs">
					{/* Header content */}
					header
				</Header>
			}
			// footer={<Footer>{/* Footer content */} footer</Footer>}
			// aside={<Aside>{/* Aside content */} aside</Aside>}
			styles={(theme) => ({
				root: {
					flexGrow: 1,
				},
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[3],
				},
				body: {
					height: 'calc(100% - 60px)',
				},
			})}>
			{/* Your application here */}

			{children || <App />}
		</AppShell>
	)
}

export default NormalLayout
