import { useQueryClient as useRQueryClient } from 'react-query'

export function useQueryClient() {
    const queryClient = useRQueryClient()
    return queryClient
}
