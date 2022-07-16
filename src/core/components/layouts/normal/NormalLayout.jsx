import {
	Affix,
	Anchor,
	AppShell,
	Breadcrumbs,
	Grid,
	Group,
	Header,
	SegmentedControl,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import PropTypes from 'prop-types'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useGlobalState, useTranslation } from '~/hooks'

const { Col } = Grid

export function NormalLayout(props) {
	const { i18n } = props

	const [languageStore, setLanguageStore] = useGlobalState({
		store: 'language',
	})

	const { category, topic } = useParams()

	const translate = useTranslation({
		getTranslatorOnly: true,
	})

	return (
		<AppShell
			header={
				<Header
					fixed={true}
					height={50}
					p={'md'}>
					{/* Header content */}
					<Grid>
						<Col span={8}>
							<Group>
								<Breadcrumbs>
									<Anchor
										component={Link}
										to=''
										size='md'>
										{translate({
											key: 'home_page.title',
										})}
									</Anchor>
									{category && (
										<Anchor
											component={Link}
											to={`/${category}`}
											size='md'>
											{category}
										</Anchor>
									)}
								</Breadcrumbs>
							</Group>
						</Col>
						<Col span={4}>
							<Group position={'right'}>
								<Breadcrumbs separator={''}>
									<Anchor
										component={Link}
										to='sign-in'
										size='md'>
										{translate({
											key: 'auth.login',
										})}
									</Anchor>
									<Anchor
										component={Link}
										to='sign-up'
										size='md'>
										{translate({
											key: 'auth.register',
										})}
									</Anchor>
								</Breadcrumbs>
							</Group>
						</Col>
					</Grid>
				</Header>
			}
			styles={(theme) => ({
				root: {
					height: '100%',
				},
				body: {
					height: '100%',
				},
				main: {
					padding: '125px 230px 100px',
					height: '100%',
				},
			})}>
			{/* Your application here */}
			<Outlet />
			<Affix
				position={{
					bottom: '1rem',
					right: '1rem',
				}}>
				<SegmentedControl
					size={'xs'}
					value={languageStore.currentLanguage}
					onChange={(value) => {
						setLanguageStore((prev) => ({
							...prev,
							currentLanguage: value,
						}))
						i18n?.changeLanguage(languageStore.currentLanguage)
						showNotification({
							message: translate({
								key: 'language.change_message',
								keyParams: {
									language: `$t(language.${value})`,
								},
							}),
							autoClose: 1000,
						})
					}}
					data={[
						{
							label: translate({ key: 'language.vi' }),
							value: 'vi',
						},
						{
							label: translate({ key: 'language.en' }),
							value: 'en',
						},
					]}
				/>
			</Affix>
		</AppShell>
	)
}

export default NormalLayout

NormalLayout.propTypes = {
	i18n: PropTypes.any,
}
