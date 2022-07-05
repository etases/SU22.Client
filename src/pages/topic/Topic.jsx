import { Link, useParams } from 'react-router-dom'
import { Button, Group, Paper, Stack, Text, TextInput, UnstyledButton} from '@mantine/core'
import { useTranslation } from '~/hooks'

function Comment(commentProps) {
	const saidMsgTranslation = useTranslation({
		translationKey: 'topic.user_said',
		keyParams: {
			name: commentProps.name,
		},
	});
	return (
		<UnstyledButton component={Link} to={"../" + commentProps.id}>
			<Text size='xs' color='gray'>{saidMsgTranslation.error || saidMsgTranslation.value}</Text>
			<Text lineClamp={2}>
				Lor ipsum dolor sit amet, consectetur adipiscing elit.
				Lor ipsum dolor sit amet, consectetur adipiscing elit.
			</Text>
		</UnstyledButton>
	)
}

export function Topic() {
	const { topic } = useParams();
	const askedMsgTranslation = useTranslation({
		translationKey: 'topic.user_asked',
		keyParams: {
			name: '123',
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
					<Text>Paper is the most basic ui component</Text>
					<Text>
						This is the topic: {topic}
					</Text>
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
				<Stack>
					<Comment name={"Test1"} id={"123"}/>
					<Comment name={"Test2"} id={"1234"}/>
					<Comment name={"Test3"} id={"12356"}/>
				</Stack>
			</Stack>
		</Stack>
	)
}
