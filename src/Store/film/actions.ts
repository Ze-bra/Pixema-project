import { AppThunk } from ".."
import { getFilms} from "../../Services/filmServise"
import { FilmsSearchFilterType } from "../../Type/FilmsTypes"

export const FilmActionName = {
    LOAD_FILMS: "LOAD_FILMS",
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    CLEAR_SEARCH: "CLEAR_SEARCH",
    LOAD_MORE_FILMS: "LOAD_MORE_FILMS",
} as const

export const loadFilmsAction = (): AppThunk => {
    return (dispatch, getState) => {
        const state = getState().films
        getFilms(
            state.filter.filmListType,
            state.filter.page,
            state.filter.limit,
            state.filter.year,
            state.filter.rating,
            state.filter.country,
            state.filter.genres,
            state.filter.searchterm,
            state.filter.sortingField
        )
            .then(items => dispatch({
                type: state.filter.page > 1 ? FilmActionName.LOAD_MORE_FILMS : FilmActionName.LOAD_FILMS,
                payload: items.data
            }))
    }
}

export const setFilterAction = (filter: FilmsSearchFilterType | undefined): AppThunk => {
    return (dispatch) => {
        dispatch({
            type: FilmActionName.SET_SEARCH_VALUE,
            payload: filter === undefined ? undefined : {
                ...filter,
                page: 1,
            }
        });
        dispatch(loadFilmsAction())
    }
}

export const changePageAction = (): AppThunk => {
    return (dispatch, getState) => {
        const state = getState().films.filter;

        dispatch({
            type: FilmActionName.SET_SEARCH_VALUE,
            payload: {
                ...state,
                page: state.page + 1,
            }
        });
        dispatch(loadFilmsAction())
    }
}
