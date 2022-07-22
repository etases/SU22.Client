import {
	Badge,
	Button,
	Center,
	Pagination,
	Stack,
	Table,
	Text,
} from '@mantine/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import { useAccountsQuery, useTranslation } from '~/hooks'
import { useAccountStatus } from '~/hooks/use-query/use-account-manage/useAccountStatus'

dayjs.extend(relativeTime)

export function Accounts() {
	const {
		queryResult: { data },
		query: { query, setQuery },
	} = useAccountsQuery()
	return (
		<Stack
			justify={'space-between'}
			style={{ height: '100%' }}>
			<Table>
				<TableHeader row={data?.accounts?.[0]} />
				<TableRows rows={data?.accounts} />
			</Table>
			<Center>
				<Pagination
					total={data?.pagination?.totalPage}
					onChange={(page) =>
						setQuery((prev) => ({ ...prev, pageNumber: page }))
					}
				/>
			</Center>
		</Stack>
	)
}

function TableHeader(props) {
	const translator = useTranslation({ getTranslatorOnly: true })
	const headers = ['id', 'username', 'role', 'created', 'banned', 'actions']

	return (
		<thead>
			<tr>
				{headers.map((header) => (
					<th key={header}>
						<Text>
							{translator({ key: 'table.accounts.header.' + header })}
						</Text>
					</th>
				))}
			</tr>
		</thead>
	)
}

function TableRows(props) {
	const { rows } = props
	const translator = useTranslation({ getTranslatorOnly: true })
	const { mutate } = useAccountStatus()
	return (
		<tbody>
			{rows?.map(({ id, username, roleId, createdDay, isBanned }) => {
				return (
					<tr key={id + username}>
						<td>{id}</td>
						<td>{username}</td>
						<td>
							{roleId === 1 ? (
								<Badge color={'orange'}>
									{translator({
										key: 'account.role.admin',
									})}
								</Badge>
							) : (
								<Badge>
									{translator({
										key: 'account.role.user',
									})}
								</Badge>
							)}
						</td>
						<td>{dayjs(createdDay).fromNow()}</td>
						<td>
							{isBanned ? (
								<Badge color={'red'}>
									{translator({
										key: 'account.status.banned',
									})}
								</Badge>
							) : (
								<Badge color={'green'}>
									{translator({
										key: 'account.status.normal',
									})}
								</Badge>
							)}
						</td>
						<td>
							{isBanned ? (
								<Button
									color={'teal'}
									size={'xs'}
									onClick={() => mutate({ accountId: id, isBanned })}>
									{translator({
										key: 'table.accounts.action.unban',
									})}
								</Button>
							) : (
								<Button
									color={'red'}
									size={'xs'}
									disabled={roleId === 1}
									onClick={() => mutate({ accountId: id, isBanned })}>
									{translator({
										key: 'table.accounts.action.ban',
									})}
								</Button>
							)}
						</td>
					</tr>
				)
			})}
		</tbody>
	)
}

TableHeader.propTypes = {
	row: PropTypes.object,
}

TableRows.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.object),
}
