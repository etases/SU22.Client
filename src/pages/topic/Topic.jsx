import { Link, useParams } from 'react-router-dom'
import { Button, Group, Paper, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from '@mantine/core'

export function Topic() {
	const theme = useMantineTheme();
	const { topic } = useParams()
	return (
		<Stack spacing={10}>
			{/* Header */}
			<Group position={'apart'} style={{
				padding: "8px",
				border: `1px solid black`,
				borderRadius: "4px"
			}}>
				<Text weight={500}>User ABC asked: </Text>
				<Button variant={'subtle'}>Back to Parent</Button>
			</Group>

			{/* Topic / Parent Comment */}
			<Stack spacing={10} style={{
				border: `1px solid black`,
				borderRadius: "4px"
			}}>
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
					<UnstyledButton component={Link} to={"../" + 123}>
						<Text size='xs' color='gray'>User abc said: </Text>
						<Text lineClamp={2}>
							Lor ipsum dolor sit amet, consectetur adipiscing elit.
							Lor ipsum dolor sit amet, consectetur adipiscing elit.
						</Text>
					</UnstyledButton>
					<UnstyledButton component={Link} to={"../" + 1234}>
						<Text size='xs' color='gray'>User abc said: </Text>
						<Text lineClamp={2}>
							Lor ipsum dolor sit amet, consectetur adipiscing elit.
							Lor ipsum dolor sit amet, consectetur adipiscing elit.
						</Text>
					</UnstyledButton>
					<UnstyledButton component={Link} to={"../" + 12345}>
						<Text size='xs' color='gray'>User abc said: </Text>
						<Text lineClamp={2}>
							Lor ipsum dolor sit amet, consectetur adipiscing elit.
							Lor ipsum dolor sit amet, consectetur adipiscing elit.
						</Text>
					</UnstyledButton>
				</Stack>
			</Stack>
		</Stack>
	)
}
