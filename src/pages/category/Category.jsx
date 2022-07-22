import {
	Button,
	Center,
	Grid,
	Pagination,
	ScrollArea,
	Stack,
	Text,
	UnstyledButton,
} from '@mantine/core'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAddCommentModal } from '~/components/comment'
import { useGlobalState, useTranslation } from '~/hooks'
import { useGetTopicsFromCategory } from '~/hooks/use-query/use-comment'

const { Col } = Grid

function TopicComponent(elementProps) {
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	return (
		<UnstyledButton
			component={Link}
			variant='outline'
			to={elementProps.id.toString()}>
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
							name: elementProps?.account?.username,
						},
					})}
				</Text>
				<Text
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						width: '10rem',
					}}>
					{elementProps?.content}
				</Text>
			</div>
		</UnstyledButton>
	)
}

function TopicsComponent(elementProps) {
	const { currentPage, topics, totalPage, categoryId, onPageChange } =
		elementProps
	const [account] = useGlobalState({ store: 'account' })
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const { component: addComponent, setOpened } = useAddCommentModal(
		elementProps.categoryId
	)
	return (
		<>
			{addComponent}
			<Stack
				spacing='xs'
				style={{
					height: '100%',
				}}
				justify='space-between'>
				<Stack justify='space-between'>
					{account.token && (
						<Button
							fullWidth
							variant='outline'
							onClick={() => setOpened(true)}>
							{translator({ key: 'button.add_topic' })}
						</Button>
					)}
					<Stack spacing='xs'>
						{topics?.map((topic) => (
							<TopicComponent
								key={topic.id}
								{...topic}
							/>
						))}
					</Stack>
					<Center>
						<Pagination
							page={currentPage}
							total={totalPage}
							onChange={onPageChange}
						/>
					</Center>
				</Stack>
			</Stack>
		</>
	)
}

export function Category() {
	const { state } = useLocation()
	const {
		topicsResult,
		query: { query, setQuery },
	} = useGetTopicsFromCategory({
		categoryId: state?.categoryId,
		keyword: state?.keyword,
	})

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
				<ScrollArea
					style={{ height: '100%' }}
					scrollbarSize={5}>
					<TopicsComponent
						categoryId={query.categoryId}
						currentPage={query.pageNumber}
						totalPage={topicsResult?.data?.totalPage}
						topics={topicsResult?.data?.data || []}
						onPageChange={(page) =>
							setQuery((prev) => ({ ...prev, pageNumber: page }))
						}
					/>
				</ScrollArea>
			</Col>
			<Col
				span={7}
				style={{ height: '100%', overflow: 'auto' }}>
				<Outlet />
				{/* <Topic topic={selectedTopic} /> */}
			</Col>
		</Grid>
	)
}
