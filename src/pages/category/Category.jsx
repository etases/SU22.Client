import {
	Badge,
	Button,
	Grid,
	Group,
	Paper,
	ScrollArea,
	Stack,
	Text,
	UnstyledButton,
} from '@mantine/core'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAddCommentModal } from '~/components/comment'
import { fetchApi, useGlobalState, useTranslation } from '~/hooks'

const { Col } = Grid

function TopicComponent(elementProps) {
	const [searchParams, setSearchParams] = useSearchParams(
		elementProps.searchParams
	)
	const { category } = useParams()
	const translator = useTranslation({
		getTranslatorOnly: true,
	})

	useEffect(() => {
		searchParams.set('tid', elementProps.id)
	}, [searchParams])

	return (
		<UnstyledButton
			component={Link}
			variant='outline'
			to={'/' + category + '?' + searchParams.toString()}>
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
				<Text
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						width: '10rem',
					}}>
					{elementProps.content}
				</Text>
			</div>
		</UnstyledButton>
	)
}

function TopicsComponent(elementProps) {
	const [currentPage, setCurrentPage] = useState(
		parseInt(elementProps.currentPage)
	)
	const [account] = useGlobalState({ store: 'account' })
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	// const { data, isLoading } = useGetTopicsFromCategory({
	// 	categoryId: elementProps.categoryId,
	// 	page: currentPage,
	// })
	const { component: addComponent, setOpened } = useAddCommentModal(
		elementProps.categoryId
	)
	// if (isLoading) {
	// 	return <Text>Loading...</Text>
	// }
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
					{account.token && (
						<Button
							fullWidth
							variant='outline'
							onClick={() => setOpened(true)}>
							{translator({ key: 'button.add_topic' })}
						</Button>
					)}
					<Stack spacing='xs'>
						{elementProps.topics?.map((topic) => (
							<TopicComponent
								key={topic.id}
								searchParams={elementProps.searchParams}
								{...topic}
							/>
						))}
					</Stack>
				</Stack>
			</Stack>
		</>
	)
}

export function Category() {
	const [topics, setTopics] = useState([])
	const { category: categoryIdParam } = useParams()
	let [searchParams, setSearchParams] = useSearchParams()

	const { state } = useLocation()

	useEffect(() => {
		if (state?.keyword && state?.categoryId && state?.commentId) {
			setSearchParams({
				cid: state.categoryId,
				tid: state.commentId,
				keyword: state.keyword,
				page: state.currentPage,
				totalPage: state.totalPage,
			})
		}
	}, [searchParams, state])

	useEffect(() => {
		if (state?.topics.length > 0) setTopics(state.topics)
	}, [state?.topics])

	const selectedTopic = topics.find(
		(topic) => topic.id === parseInt(searchParams.get('tid'))
	)

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
						categoryId={state?.categoryId || searchParams.get('tid')}
						currentPage={state?.currentPage || searchParams.get('page')}
						totalPage={state?.totalPage || searchParams.get('totalPage')}
						searchParams={searchParams}
						topics={topics}
					/>
				</ScrollArea>
			</Col>
			<Col
				span={7}
				style={{ height: '100%', overflow: 'auto' }}>
				{/* <Outlet /> */}
				<Topic topic={selectedTopic} />
			</Col>
		</Grid>
	)
}

function Topic(props) {
	const { topic } = props
	console.log(topic)

	const [account] = useGlobalState({ store: 'account' })
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const { component: addComponent, setOpened: setOpenedAdd } =
		useAddCommentModal(topic?.category?.id, topic?.id)

	const commentQuery = useQuery({
		enabled: !!topic?.id,
		queryKey: ['comments', { topicId: topic?.id }],
		queryFn: async () =>
			fetchApi({
				endpoint: '/comment/parent/' + topic?.id,
			}),
		select: (data) => {
			const { data: commentsData } = data
			return commentsData
		},
		onSuccess: (data) => {
			console.log('comments succ', data)
		},
		onError: (error) => {
			console.log('comments err', error)
		},
	})
	return (
		<Stack
			spacing={16}
			style={{ height: '100%' }}>
			{/* Header */}
			{/* {updateComponent} */}
			{/* Topic / Parent Comment */}
			<Stack
				spacing={10}
				style={{
					border: `1px solid black`,
					borderRadius: '4px',
				}}>
				<Group
					position={'apart'}
					style={{ padding: '8px' }}>
					<Text weight={500}>
						{translator({
							key: 'topic.user_asked',
							keyParams: {
								name: topic?.account?.username,
							},
						})}
					</Text>
					{/* <Button variant={'subtle'}>
						{translator({ key: 'topic.back_to_parent' })}
					</Button> */}
				</Group>
				<Paper p='lg'>
					<Text>{topic?.content}</Text>
				</Paper>
				<Group
					position={'apart'}
					style={{ padding: '8px' }}>
					<Text color='dimmed'>
						<Badge
							color={'grape'}
							mr={'sm'}>
							#:
						</Badge>
						{topic?.keyword.split(',').map((key) => (
							<Badge
								key={topic.id + key}
								mr={'sm'}>
								{key.trim()}
							</Badge>
						))}
					</Text>
					<Group>
						{/* <Button
							radius='xl'
							size='xs'
							uppercase>
							{translator({ key: 'button.vote' })}
						</Button> */}
					</Group>
				</Group>
			</Stack>
			{/* Comments */}
			<Stack
				style={{
					padding: '8px',
					border: `1px solid black`,
					borderRadius: '4px',
					overflow: 'auto',
					height: '100%',
				}}>
				<ScrollArea
					style={{ height: '100%' }}
					scrollbarSize={5}>
					{/* Add Comment */}
					{account.token && (
						<Button
							fullWidth
							style={{ display: 'block' }}
							variant='outline'
							onClick={() => setOpenedAdd(true)}>
							{translator({ key: 'button.add_comment' })}
						</Button>
					)}
					{commentQuery?.data?.map((cmt) => (
						<Grid
							key={cmt?.id}
							gutter={'xs'}
							space>
							<Col>
								<Text weight={'bold'}>
									{translator({
										key: 'topic.user_said',
										keyParams: {
											name: cmt?.account?.username,
										},
									})}
								</Text>
							</Col>
							<Col>{cmt?.content}</Col>
						</Grid>
					))}
				</ScrollArea>
			</Stack>
			{addComponent}
		</Stack>
	)
}

Topic.propTypes = {
	topic: PropTypes.any,
}
