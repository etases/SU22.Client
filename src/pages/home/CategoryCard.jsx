import { Badge, Card, Grid, ScrollArea, Text } from '@mantine/core'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const { Col } = Grid

export function CategoryCard(props) {
	const {
		category,
		topics,
		color: { background, foreground },
	} = props
	if (!category) return null
	return (
		<Card
			shadow={'md'}
			withBorder={true}
			style={{
				backgroundColor: background || '#fff',
				color: foreground || '#000',
			}}>
			<Grid
				justify={'space-between'}
				align={'center'}>
				<Col span={4}>
					<Text
						align={'left'}
						weight={'bold'}>
						{category.name}
					</Text>
				</Col>
				<Col span={8}>
					<Text align={'right'}>{category?.note}</Text>
				</Col>
				<Col>
					<Card style={{ backgroundColor: 'white' }}>
						<Grid justify={'space-between'}>
							{topics.length > 0 &&
								topics.map((topic) => (
									<Fragment key={topic.id}>
										<Col span={6}>
											<ScrollArea scrollbarSize={5}>
												<Text
													align={'left'}
													style={{
														wordWrap: 'break-word',
													}}>
													{topic.content}
												</Text>
											</ScrollArea>
										</Col>
										<Col span={6}>
											<Grid justify={'space-between'}>
												<Col span={12}>
													<ScrollArea scrollbarSize={5}>
														<Text
															align={'right'}
															style={{
																wordWrap: 'break-word',
															}}>
															{topic.keyword
																.split(',')
																.slice(0, 2)
																.sort((a, b) => !a.localeCompare(b))
																.map((item, index) => (
																	<Badge
																		color={'dark'}
																		size={'sm'}
																		ml={'xs'}
																		key={topic.id + '_key_' + item}>
																		{index < 1 ? '#' + item.trim() : '...'}
																	</Badge>
																))}
														</Text>
													</ScrollArea>
												</Col>
											</Grid>
										</Col>
									</Fragment>
								))}
						</Grid>
					</Card>
				</Col>
			</Grid>
		</Card>
	)
}

CategoryCard.propTypes = {
	category: PropTypes.object.isRequired,
	topics: PropTypes.array.isRequired,
	color: PropTypes.object,
}
