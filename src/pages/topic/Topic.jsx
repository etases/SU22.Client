import { useParams } from 'react-router-dom'

export function Topic() {
	const { topic } = useParams()
	return <>{topic}</>
}
