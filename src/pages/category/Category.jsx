import { Container, Grid, Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { Link, Outlet, useParams } from 'react-router-dom'

const { Col } = Grid

function CategoryElement(elementProps) {
	return (
		<UnstyledButton component={Link} to={'./' + elementProps.id}>
			<div style={{
				paddingLeft: "2px",
				backgroundColor: "#f5f5f5",
				borderRadius: "4px",
				border: "1px solid #eaeaea",
			}}>
				<Text size='xs' color='gray'>User abc asked: </Text>
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
					<CategoryElement id={12345} />
					<CategoryElement id={2468} />
					<CategoryElement id={1111} />
				</Stack>
			</Col>
			<Col style={{ outline: '1px solid red' }} span={8}>
				<Outlet />
			</Col>
		</Grid>
	)
}
