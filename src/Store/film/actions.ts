import { AppThunk } from ".."
import { getCountries, getFilms, getGenres } from "../../Services/filmServise"
import { FilmActionName, FilmsSearchFilterType } from "./reducer"


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


export const setFilter = (filter: FilmsSearchFilterType | undefined): AppThunk => {
    return (dispatch, getState) => {
        dispatch({
            type:  FilmActionName.SET_SEARCH_VALUE,
            payload: filter === undefined ? undefined: {
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
