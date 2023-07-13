import { AppThunk } from ".."
import { getCountries, getFilms, getGenres } from "../../Services/filmServise"
import { SiteSettingsActionName } from "./reducer"




export const saveTheme = (theme: string): AppThunk => {
    return (dispatch, getState) => {
        dispatch({
            type: SiteSettingsActionName.SAVE_THEME,
            payload: theme
        })

    }
}

