import { AppThunk } from ".."
import { getCountries, getGenres } from "../../Services/filmServise"

export const DictionaryActionName = {
    LOAD_GENRES: "LOAD_GENRES",
    LOAD_CONTRIES: "LOAD_CONTRIES",
} as const

export const loadDictionariesAction = (): AppThunk => {
    return (dispatch, getState) => {
        if (getState().dictionaries.contries.length === 0) {
            getCountries().then(items => dispatch({
                type: DictionaryActionName.LOAD_CONTRIES,
                payload: items.data
            }))
        }
        if (getState().dictionaries.genres.length === 0) {
            getGenres().then(items => dispatch({
                type: DictionaryActionName.LOAD_GENRES,
                payload: items.data
            }))
        }
    }
}

