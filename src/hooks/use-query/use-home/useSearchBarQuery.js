import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from '../functions'

const initialData = (noOfItems) =>
    Array.from(new Array(noOfItems), (val, key) => key + 1).map((item) => ({
        value: item,
        label: `Name ${item}`,
    }))

// get category list
export function useSearchBarQuery() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isCategoryFetch, setIsCategoryFetch] = useState(false)

    const categoryResult = useQuery({
        enabled: !isCategoryFetch,
        queryKey: ['category'],
        queryFn: async () =>
            fetchApi({
                method: 'GET',
                endpoint: 'https://localhost:7226/Category',
            }),
        keepPreviousData: true,
        placeholderData: initialData(10),
        select: (data) => {
            const { data: list } = data
            const response = list?.map((item) => ({
                value: item.id,
                label: item.name,
                // categoryNote: item.categoryNote,
            }))
            return response
        },
        onError: (err) => {
            // console.log('error search', err)
        },
        onSuccess: (data) => {
            setIsCategoryFetch(true)
            console.log('categoryList', data)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const keywordResult = useQuery({
        enabled: selectedCategory !== null,
        queryKey: ['keyword'],
        queryFn: async () =>
            fetchApi({
                method: 'GET',
                endpoint: 'https://localhost:7226/Comment/Keyword?',
                query: {
                    categoryId: selectedCategory,
                    PageSize: 10,
                },
            }),
        select: (data) => {
            const { data: list } = data
            const response = list?.map((item) => ({
                value: item,
                label: item,
                // categoryNote: item.categoryNote,
            }))
            return response
        },
        onSuccess: (data) => {
            console.log('keywordList', data)
        },
        refetchOnWindowFocus: false,
    })

    const getTopicList = useQuery({
        queryKey: ['topic'],
        queryFn: async () =>
            fetchApi({
                method: 'GET',
                endpoint: 'https://localhost:7226/Comment/Filtered?',
                query: {
                    categoryId: selectedCategory,
                    PageSize: 10,
                },
            }),
    })

    useEffect(() => {
        if (selectedCategory !== null) {
            keywordResult.refetch()
        }
    }, [selectedCategory])

    return {
        categoryResult,
        keywordResult,
        setSelectedCategory,
        selectedCategory,
        getTopicList,
    }
}
