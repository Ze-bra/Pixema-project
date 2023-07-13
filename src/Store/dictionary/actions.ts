import { AppThunk } from ".."
import { getCountries, getFilms, getGenres } from "../../Services/filmServise"
import { DictionaryActionName } from "./reducer"




export const loadDictionaries = (): AppThunk => {
    return (dispatch, getState) => {
        if(getState().dictionaries.contries.length === 0){
            getCountries().then(items => dispatch({
                type: DictionaryActionName.LOAD_CONTRIES ,
                payload: items.data
            }))
        }
        if(getState().dictionaries.genres.length === 0){
            getGenres().then(items => dispatch({
                type: DictionaryActionName.LOAD_GENRES ,
                payload: items.data
            }))
        }
       
    }
}

