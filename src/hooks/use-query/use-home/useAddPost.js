import { useMutation, useQueryClient } from 'react-query'
import { fetchApi } from '../functions'

export function useUpdatePost(props) {
    const { currentPage } = props
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: 'addPost',
        mutationFn: async (variables) =>
            fetchApi({
                baseUrl: {
                    protocol: 'https://',
                    host: 'jsonplaceholder.typicode.com',
                    port: '',
                },
                method: 'PATCH',
                endpoint: '/posts/' + variables.id,
                body: variables.body,
            }),
        onSuccess: (data, variables) => {
            // queryClient.invalidateQueries(['home', currentPage])
            queryClient.setQueryData(['home', currentPage], (prevData) => {
                const itemIndex = prevData.findIndex(
                    (item) => item.id === data.id
                )
                prevData[itemIndex] = {
                    ...prevData[itemIndex],
                    ...variables.body,
                }
                return prevData
            })
        },
    })

    return mutation
}
