import { Button, Grid, Pagination, Stack, Text, UnstyledButton } from '@mantine/core'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from '~/hooks'
import { useGetTopicsFromCategory } from '~/hooks/use-query/use-comment'
import { useState } from 'react'
import { useAddCommentModal } from '~/components/comment'

const { Col } = Grid

function TopicComponent(elementProps) {
	const askedMsgTranslation = useTranslation({
		translationKey: 'topic.user_asked',
		keyParams: {
			name: elementProps.account.username,
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
					{elementProps.content}
				</Text>
			</div>
		</UnstyledButton>
	)
}

function TopicsComponent(elementProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const { data, isLoading } = useGetTopicsFromCategory({
		categoryId: elementProps.categoryId,
		page: currentPage,
	});
	const { component : addComponent, setOpened } = useAddCommentModal(elementProps.categoryId)
	if (isLoading) {
		return <Text>Loading...</Text>
	} else {
		return (
			<>
				{addComponent}
				<Stack spacing='xs'>
					<Button fullWidth variant="outline" onClick={() => setOpened(true)}>
						Add Topic
					</Button>
					{
						data.data.map(topic => (
							<TopicComponent key={topic.id} {...topic} />
						))
					}
					<Pagination
						total={data.totalPage}
						page={currentPage}
						onChange={setCurrentPage}
					/>
				</Stack>
			</>
		)
	}
}

export function Category() {
	const { category } = useParams()
	return (
		<Grid grow={true}>
			<Col style={{ outline: '1px solid black' }} span={2}>
				<TopicsComponent categoryId={category} />
			</Col>
			<Col style={{ outline: '1px solid red' }} span={8}>
				<Outlet />
			</Col>
		</Grid>
	)
}
