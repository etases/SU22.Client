import { Grid, Text, UnstyledButton } from '@mantine/core'
import { Link, Outlet, useParams } from 'react-router-dom'

const { Col } = Grid

function CategoryElement(elementProps) {
	return (
		<UnstyledButton component={Link} to={'./' + elementProps.id}>
			<Text>Line1</Text>
			<Text size='xs' color='gray'>Line2</Text>
		</UnstyledButton>
	)
}

export function Category() {
	const { category } = useParams()
	return (
		<Grid grow={true}>
			<Col style={{ outline: '1px solid black' }} span={2}>
				<CategoryElement id={12345} />
				<CategoryElement id={2468} />
				<CategoryElement id={1111} />
			</Col>
			<Col style={{ outline: '1px solid red' }} span={8}>
				<Outlet />
			</Col>
		</Grid>
	)
}
