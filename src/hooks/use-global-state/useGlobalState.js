import { useAtom } from 'jotai'

import stores from '~/stores'

export function useGlobalState({ store }) {
	const [state, setState] = useAtom(stores[store])

	return [state, setState]
}

export default useGlobalState
