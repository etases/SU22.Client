import { useQuery } from 'react-query'
import { fetchApi } from '../functions'

const STATISTICS_TYPE = {
	REGISTER: 'REGISTER',
}

export function useStatistics(props) {
	const { type, id } = props
	const result = useQuery({
		queryKey: id ? `${type}-${id}` : type,
		queryFn: async () => fetchApi({}),
	})
	return result
}

useStatistics.propTypes = {}
