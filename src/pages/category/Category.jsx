import {
	Button,
	Center,
	Grid,
	Pagination,
	Stack,
	Text,
	UnstyledButton,
} from '@mantine/core'
import { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useAddCommentModal } from '~/components/comment'
import { useTranslation } from '~/hooks'
import { useGetTopicsFromCategory } from '~/hooks/use-query/use-comment'

const { Col } = Grid

function TopicComponent(elementProps) {
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	return (
		<UnstyledButton
			component={Link}
			to={'./' + elementProps.id}>
			<div
				style={{
					paddingLeft: '2px',
					backgroundColor: '#f5f5f5',
					borderRadius: '4px',
					border: '1px solid #eaeaea',
				}}>
				<Text
					size='xs'
					color='gray'>
					{translator({
						key: 'topic.user_asked',
						keyParams: {
							name: elementProps.account.username,
						},
					})}
				</Text>
				<Text lineClamp={2}>{elementProps.content}</Text>
			</div>
		</UnstyledButton>
	)
}

function TopicsComponent(elementProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const { data, isLoading } = useGetTopicsFromCategory({
		categoryId: elementProps.categoryId,
		page: currentPage,
	})
	const { component: addComponent, setOpened } = useAddCommentModal(
		elementProps.categoryId
	)
	if (isLoading) {
		return <Text>Loading...</Text>
	} else {
		return (
			<>
				{addComponent}
				<Stack
					spacing='xs'
					style={{
						height: '100%',
						justifyContent: 'space-between',
					}}>
					<Stack>
						<Button
							fullWidth
							variant='outline'
							onClick={() => setOpened(true)}>
							{translator({ key: 'button.add_topic' })}
						</Button>
						<Stack spacing='xs'>
							{data.data.map((topic) => (
								<TopicComponent
									key={topic.id}
									{...topic}
								/>
							))}
						</Stack>
					</Stack>
					<Center>
						<Pagination
							total={data.totalPage}
							page={currentPage}
							onChange={setCurrentPage}
						/>
					</Center>
				</Stack>
			</>
		)
	}
}

export function Category() {
	const { category } = useParams()
	return (
		<Grid
			grow={true}
			columns={10}
			style={{
				height: '100%',
				overflow: 'auto',
			}}>
			<Col
				span={3}
				style={{ height: '100%' }}>
				<TopicsComponent categoryId={category} />
			</Col>
			<Col
				span={7}
				style={{ height: '100%', overflow: 'auto' }}>
				<Outlet />
			</Col>
		</Grid>
	)
}
