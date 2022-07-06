import { Grid, Stack, Text, UnstyledButton } from '@mantine/core'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from '~/hooks'

const { Col } = Grid

function TopicComponent(elementProps) {
	const askedMsgTranslation = useTranslation({
		translationKey: 'topic.user_asked',
		keyParams: {
			name: '123',
		},
	})
	return (
		<UnstyledButton component={Link} to={'./' + elementProps.id}>
			<div style={{
				paddingLeft: "2px",
				backgroundColor: "#f5f5f5",
				borderRadius: "4px",
				border: "1px solid #eaeaea",
			}}>
				<Text size='xs' color='gray'>{askedMsgTranslation.error || askedMsgTranslation.value}</Text>
				<Text lineClamp={2}>
					Lor ipsum dolor sit amet, consectetur adipiscing elit.
					Lor ipsum dolor sit amet, consectetur adipiscing elit.
				</Text>
			</div>
		</UnstyledButton>
	)
}

export function Category() {
	const { category } = useParams()
	return (
		<Grid grow={true}>
			<Col style={{ outline: '1px solid black' }} span={2}>
				<Stack spacing="xs">
					<TopicComponent id={12345} />
					<TopicComponent id={2468} />
					<TopicComponent id={1111} />
				</Stack>
			</Col>
			<Col style={{ outline: '1px solid red' }} span={8}>
				<Outlet />
			</Col>
		</Grid>
	)
}
