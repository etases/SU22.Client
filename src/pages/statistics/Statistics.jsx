import { Card as MCard, Grid } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import PropTypes from 'prop-types'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { default as data } from './data.json'

const { Col } = Grid

export function Statistics() {
	return (
		<Grid justify={'space-between'}>
			<Col span={4}>
				<Card
					title='Title'
					value='Value'
					icon='icon'
				/>
			</Col>
			<Col span={4}>
				<Card
					title='Title'
					value='Value'
					icon='icon'
				/>
			</Col>
			<Col span={4}>
				<Card
					title='Title'
					value='Value'
					icon='icon'
				/>
			</Col>
			<Col>
				<DatePicker />
			</Col>
			<Col>
				<AreaChart
					width={730}
					height={250}
					data={data}>
					{/* margin={{ top: 10, right: 30, left: 0, bottom: 0 }}> */}
					<defs>
						<linearGradient
							id='colorComment'
							x1='0'
							y1='0'
							x2='0'
							y2='1'>
							<stop
								offset='5%'
								stopColor='#8884d8'
								stopOpacity={0.8}
							/>
							<stop
								offset='95%'
								stopColor='#8884d8'
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient
							id='colorRegister'
							x1='0'
							y1='0'
							x2='0'
							y2='1'>
							<stop
								offset='5%'
								stopColor='#82ca9d'
								stopOpacity={0.8}
							/>
							<stop
								offset='95%'
								stopColor='#82ca9d'
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<XAxis dataKey='name' />
					<YAxis />
					<CartesianGrid strokeDasharray='3 3' />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='comment'
						stroke='#8884d8'
						fillOpacity={1}
						fill='url(#colorComment)'
					/>
					<Area
						type='monotone'
						dataKey='register'
						stroke='#82ca9d'
						fillOpacity={1}
						fill='url(#colorRegister)'
					/>
				</AreaChart>
			</Col>
		</Grid>
	)
}

function Card(props) {
	const { title, value, icon, backgroundColor, foregroundColor } = props
	return (
		<MCard
			shadow={'md'}
			p={'md'}
			withBorder={true}
			style={{
				backgroundColor: backgroundColor || 'red',
				color: foregroundColor || 'white',
			}}>
			{title}
		</MCard>
	)
}

Card.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	backgroundColor: PropTypes.string,
	foregroundColor: PropTypes.string,
}
