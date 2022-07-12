import { Link, useParams } from 'react-router-dom'
import { Button, Group, Paper, Stack, Text, TextInput, UnstyledButton} from '@mantine/core'
import { useTranslation } from '~/hooks'
import { useGetComment, useGetCommentsFromParent } from '~/hooks/use-query/use-comment'
import { useAddCommentModal, useUpdateCommentModal } from '~/components/comment'

function Comment(commentProps) {
	const saidMsgTranslation = useTranslation({
		translationKey: 'topic.user_said',
		keyParams: {
			name: commentProps.account.username,
		},
	});
	return (
		<UnstyledButton component={Link} to={"../" + commentProps.id}>
			<Text size='xs' color='gray'>{saidMsgTranslation.error || saidMsgTranslation.value}</Text>
			<Text lineClamp={2}>{commentProps.content}</Text>
		</UnstyledButton>
	)
}

function Comments(commentsProps) {
	const { data, isLoading } = useGetCommentsFromParent(commentsProps);
	if (isLoading) {
		return <Text>Loading...</Text>
	} else {
		return (
			<Stack spacing='xs'>
				{data.data.map(comment => (
					<Comment key={comment.id} {...comment} />
				))}
			</Stack>
		)
	}
}

export function Topic() {
	const { category, topic } = useParams();
	const { data, isLoading } = useGetComment({
		id: topic
	});
	const askedMsgTranslation = useTranslation({
		translationKey: 'topic.user_asked',
		keyParams: {
			name: isLoading ? '...' : data.account.username,
		},
	});
	const backParentTranslation = useTranslation({ translationKey: 'topic.back_to_parent' });
	const { component : addComponent, setOpened : setOpenedAdd } = useAddCommentModal(category, topic);
	const { component : updateComponent, setOpened : setOpenedUpdate } = useUpdateCommentModal(topic);
	return (
		<Stack spacing={10}>
			{/* Header */}
			{updateComponent}

			{/* Topic / Parent Comment */}
			<Stack spacing={10} style={{
				border: `1px solid black`,
				borderRadius: "4px"
			}}>
				<Group position={'apart'} style={{ padding: "8px" }}>
					<Text weight={500}>{askedMsgTranslation.error || askedMsgTranslation.value}</Text>
					<Button variant={'subtle'}>{backParentTranslation.error || backParentTranslation.value}</Button>
				</Group>
				<Paper p="lg">
					<Text>{isLoading ? "Loading..." : data.content}</Text>
				</Paper>
				<Group position={'apart'} style={{ padding: "8px" }}>
					<Text color="dimmed">{isLoading ? "Keyword" : data.keyword}</Text>
					<Group>
						<Button radius="xl" size="xs" uppercase>
							Vote
						</Button>
						<Button radius="xl" size="xs" uppercase onClick={() => setOpenedUpdate(true)}>
							Update
						</Button>
					</Group>
				</Group>
			</Stack>

			{/* Comments */}
			<Stack style={{
				padding: "8px",
				border: `1px solid black`,
				borderRadius: "4px"
			}}>
				{addComponent}
				{/* Add Comment */}
				<Group grow={true} style={{
					padding: "8px",
					border: `1px solid black`,
					borderRadius: "4px"
				}}>
					{
						isLoading ? <></> : (
							<Button fullWidth variant="outline" onClick={() => setOpenedAdd(true)}>
								Add Comment
							</Button>
						)
					}
				</Group>

				{/* Show Comments */}
				{
					isLoading ? <Text>Loading...</Text> : <Comments id={data.id} />
				}
			</Stack>
		</Stack>
	)
}
