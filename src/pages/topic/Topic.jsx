import { Link, useParams } from 'react-router-dom'
import { Button, Group, Paper, Stack, Text, TextInput, UnstyledButton} from '@mantine/core'
import { useTranslation } from '~/hooks'
import { useGetComment, useGetCommentsFromParent } from '~/hooks/use-query/use-comment'

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
	const { topic } = useParams();
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
	return (
		<Stack spacing={10}>
			{/* Header */}

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
					<Text color="dimmed">Keyword</Text>
					<Button radius="xl" size="xs" uppercase>
						??
					</Button>
				</Group>
			</Stack>

			{/* Comments */}
			<Stack style={{
				padding: "8px",
				border: `1px solid black`,
				borderRadius: "4px"
			}}>
				{/* Add Comment */}
				<Group grow={true} style={{
					padding: "8px",
					border: `1px solid black`,
					borderRadius: "4px"
				}}>
					<TextInput label="Add Comment" placeholder="Add your comment here" />
				</Group>

				{/* Show Comments */}
				{
					isLoading ? <Text>Loading...</Text> : <Comments id={data.id} />
				}
			</Stack>
		</Stack>
	)
}
