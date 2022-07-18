import {
	Button,
	Group,
	Paper,
	Stack,
	Text,
	UnstyledButton,
} from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import { useAddCommentModal, useUpdateCommentModal } from '~/components/comment'
import { useTranslation } from '~/hooks'
import {
	useGetComment,
	useGetCommentsFromParent,
} from '~/hooks/use-query/use-comment'

function Comment(commentProps) {
	const saidMsgTranslation = useTranslation({
		translationKey: 'topic.user_said',
		keyParams: {
			name: commentProps.account.username,
		},
	})
	return (
		<UnstyledButton
			component={Link}
			to={'../' + commentProps.id}>
			<Text
				size='xs'
				color='gray'>
				{saidMsgTranslation.error || saidMsgTranslation.value}
			</Text>
			<Text lineClamp={2}>{commentProps.content}</Text>
		</UnstyledButton>
	)
}

function Comments(commentsProps) {
	const { data, isLoading } = useGetCommentsFromParent(commentsProps)
	if (isLoading) {
		return <Text>Loading...</Text>
	} else {
		return (
			<Stack
				spacing='xs'
				style={{ height: '100%', overflow: 'auto' }}>
				{data.data.map((comment) => (
					<Comment
						key={comment.id}
						{...comment}
					/>
				))}
			</Stack>
		)
	}
}

export function Topic() {
	const { category, topic } = useParams()
	const { data, isLoading } = useGetComment({
		id: topic,
	})

	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const { component: addComponent, setOpened: setOpenedAdd } =
		useAddCommentModal(category, topic)
	const { component: updateComponent, setOpened: setOpenedUpdate } =
		useUpdateCommentModal(topic)
	return (
		<Stack
			spacing={16}
			style={{ height: '100%' }}>
			{/* Header */}
			{updateComponent}
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
								name: isLoading ? '...' : data.account.username,
							},
						})}
					</Text>
					<Button variant={'subtle'}>
						{translator({ key: 'topic.back_to_parent' })}
					</Button>
				</Group>
				<Paper p='lg'>
					<Text>{isLoading ? 'Loading...' : data.content}</Text>
				</Paper>
				<Group
					position={'apart'}
					style={{ padding: '8px' }}>
					<Text color='dimmed'>{isLoading ? 'Keyword' : data.keyword}</Text>
					<Group>
						<Button
							radius='xl'
							size='xs'
							uppercase>
							{translator({ key: 'button.vote' })}
						</Button>
						<Button
							radius='xl'
							size='xs'
							uppercase
							onClick={() => setOpenedUpdate(true)}>
							{translator({ key: 'button.update' })}
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
				{/* Add Comment */}
				{!isLoading && (
					<Button
						fullWidth
						style={{ display: 'block' }}
						variant='outline'
						onClick={() => setOpenedAdd(true)}>
						{translator({ key: 'button.add_comment' })}
					</Button>
				)}
				{/* Show Comments */}
				{isLoading ? <Text>Loading...</Text> : <Comments id={data.id} />}
			</Stack>
			{addComponent}
		</Stack>
	)
}
