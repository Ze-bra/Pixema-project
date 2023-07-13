import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from "redux"
import { AuthReducer } from './authentication/reducer';
import { RegistrationReducer } from './registration/reducer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FilmsReducer } from './film/reducer';
import { DictionaryReducer } from './dictionary/reducer';
import { SiteSettingsReducer } from './siteSettings/reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authentication', 'dictionaries', "siteSettings"]
}

const rootReduser = combineReducers({
    authentication: AuthReducer,
    registration: RegistrationReducer,
    films: FilmsReducer,
    dictionaries: DictionaryReducer,
    siteSettings: SiteSettingsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReduser)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>