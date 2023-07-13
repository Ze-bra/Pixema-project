import { AllFields, MovieDocsResponseDtoV13, MovieFields, PossibleValueDto } from "@openmoviedb/kinopoiskdev_client"
import { FilmListConstants } from "../../Constants/FilmListConstants"
export const FilmActionName = {
    LOAD_FILMS: "LOAD_FILMS",
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    CLEAR_SEARCH: "CLEAR_SEARCH",
    LOAD_MORE_FILMS: "LOAD_MORE_FILMS",
} as const

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
}
export type FilmsPageType = {
    filter: FilmsSearchFilterType
    items: MovieDocsResponseDtoV13
}

export const filtersInitialValue: FilmsSearchFilterType = {
    page: 1,
    limit: 10,
    country: undefined,
    filmListType: FilmListConstants.Default,
    genres: [],
    rating: [0, 10],
    searchterm: undefined,
    sortingField: 'rating.kp',
    year: [new Date().getFullYear() - 3, new Date().getFullYear()],
}

const initialValue: FilmsPageType = {
    filter: filtersInitialValue,
    items: {} as MovieDocsResponseDtoV13
}

export type FilmActionType = {
    type: string;
    payload?: any
}

export const FilmsReducer = (state: FilmsPageType = initialValue, action: FilmActionType): FilmsPageType => {
    switch (action.type) {
        case FilmActionName.SET_SEARCH_VALUE:
            return {
                ...state,
                filter: action.payload === undefined ? filtersInitialValue : action.payload as FilmsSearchFilterType
            }
        case FilmActionName.LOAD_FILMS:
            return {
                ...state,
                items: (action.payload as MovieDocsResponseDtoV13),
            }
        case FilmActionName.LOAD_MORE_FILMS:
            var data = (action.payload as MovieDocsResponseDtoV13)
            return {
                ...state,
                items: {
                    limit: data.limit,
                    page: data.page,
                    pages: data.pages,
                    total: data.total,
                    docs: [...state.items.docs, ...data.docs]
                },
            }

        default:
            return state
    }
}