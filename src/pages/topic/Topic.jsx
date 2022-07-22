import {
	Badge,
	Button,
	Grid,
	Group,
	Paper,
	ScrollArea,
	Stack,
	Text,
} from '@mantine/core'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAddCommentModal, useUpdateCommentModal } from '~/components/comment'
import { fetchApi, useGlobalState, useTranslation } from '~/hooks'
import { useGetComment } from '~/hooks/use-query/use-comment'
import { useCommentVote } from '~/hooks/use-query/use-comment/useCommentVote'

const { Col } = Grid

export function Topic() {
	const { topic: topicId } = useParams()
	const [account] = useGlobalState({ store: 'account' })
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const topicResult = useGetComment({ id: topicId })
	const { voteResult, voteMutate, voteStatus } = useCommentVote({ id: topicId })
	const topic = topicResult?.data?.data
	const { component: addComponent, setOpened: setOpenedAdd } =
		useAddCommentModal(topic?.category?.id, topic?.id)
	console.log('current topic', topicId, topic)
	const { component: editComponent, setOpened: setOpenedEdit } =
		useUpdateCommentModal({
			commentId: topic?.id,
			content: topic?.content,
			keyword: topic?.keyword,
			categoryId: topic?.category?.id,
		})
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
		onSuccess: (data) => {},
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
					<Button
						variant={'subtle'}
						onClick={() => setOpenedEdit(true)}>
						Update
					</Button>
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
						<Button
							radius='xl'
							size='xs'
							uppercase
							color={voteStatus?.data ? 'green' : 'orange'}
							onClick={() => voteMutate?.mutate()}>
							{translator({
								key: 'button.vote',
								keyParams: {
									count: voteResult?.data?.toString(),
								},
							})}
						</Button>
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
							<Col span={12}>
								<Grid>
									<Col span={12}>
										<Text weight={'bold'}>
											{translator({
												key: 'topic.user_said',
												keyParams: {
													name: cmt?.account?.username,
												},
											})}
										</Text>
									</Col>
									<Col span={12}>{cmt?.content}</Col>
								</Grid>
							</Col>
						</Grid>
					))}
				</ScrollArea>
			</Stack>
			{addComponent}
			{editComponent}
		</Stack>
	)
}

Topic.propTypes = {
	topic: PropTypes.any,
}
