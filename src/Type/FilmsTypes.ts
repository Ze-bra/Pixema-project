import { AllFields, MovieDocsResponseDtoV13, MovieFields } from "@openmoviedb/kinopoiskdev_client"

export type FilmsSearchFilterType = {
    filmListType: string
    page: number
    limit: number
    year: [number, number]
    rating: [number, number]
    country: string | undefined
    genres: string[]
    searchterm: string | undefined
    sortingField: AllFields<MovieFields> | undefined
    showFilters: boolean
}

export type FilmsPageType = {
    filter: FilmsSearchFilterType
    items: MovieDocsResponseDtoV13
}

export type FilmActionType = {
    type: string;
    payload?: any
}