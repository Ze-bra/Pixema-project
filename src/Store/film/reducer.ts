import { MovieDocsResponseDtoV13} from "@openmoviedb/kinopoiskdev_client"
import { FilmListConstants } from "../../Constants/FilmListConstants"
import { FilmActionName } from "./actions"
import { FilmActionType, FilmsPageType, FilmsSearchFilterType } from "../../Type/FilmsTypes"

export const filtersInitialValue: FilmsSearchFilterType = {
    page: 1,
    limit: 10,
    country: undefined,
    filmListType: FilmListConstants.Main,
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