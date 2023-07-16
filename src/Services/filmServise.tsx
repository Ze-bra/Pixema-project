//const apiTocken = "7341R46-0RBM1RF-NQSMYD2-HBVV0DQ"
//const apiTocken = "95Z8FG4-FRWMZGT-K9ZZ0PC-P853D4V"
//const apiTocken = "ZYSDF6P-RR1M2M0-NPCSTNE-XRB3CDR"
//export const apiTocken = "16JBX74-FC6467V-N3A3EP2-C8ADFMJ";
export const apiTocken = "RD3R3VB-CWAM224-Q8CT51W-6PFHAFB";
//export const apiTocken = "ZAEXZKF-RYRM40B-QRXAV1N-F1JX56B";
//export const apiTocken = 'NCBXJG2-F1C47T5-NQE7THH-5C5ZDD7'
import {
    KinopoiskDev,
    MovieQueryBuilder,
    SPECIAL_VALUE,
    SORT_TYPE,
    MovieFields,
    AllFields,
} from "@openmoviedb/kinopoiskdev_client";
import { FilmListConstants } from "../Constants/FilmListConstants";

const kp = new KinopoiskDev(apiTocken);

export const getFilm = async (id: number) => {
    return await kp.movie.getById(id);
}

export const getFilms = async (
    filmListType: string,
    page: number,
    limit: number,
    year: [number, number] | undefined,
    rating: [number, number] | undefined,
    country: string | undefined,
    genres: string[] | undefined,
    searchterm: string | undefined,
    sortingField: AllFields<MovieFields> | undefined
) => {
    // Создаем билдер запросов для фильмов
    let queryBuilder = new MovieQueryBuilder();
    // Выбираем поля, которые мы хотим получить в ответе
    // Полный список полей можно посмотреть в документации
    // https://api.kinopoisk.dev/v1/documentation для метода /v1.3/movie
    queryBuilder = queryBuilder
        .select(["id", "name", "rating", "poster", "genres", "year"])
        // Добавляем фильтр для поиска фильмов с постером
        .filterExact("poster.url", SPECIAL_VALUE.NOT_NULL)
        .paginate(page, limit);

    if (filmListType === FilmListConstants.Trends) {
        queryBuilder = queryBuilder.filterExact("top250", SPECIAL_VALUE.NOT_NULL);
    }
    // Добавляем фильтр поиска по указанному диапазону года если он установлен
    if (year) {
        queryBuilder = queryBuilder.filterRange("year", year);
    }
    // Добавляем фильтр поиска по указанному диапазону рейтинга если он установлен
    if (rating) {
        queryBuilder = queryBuilder.filterRange("rating.kp", rating);
    }
    // Добавим страны если они установлены
    if (country) {
        queryBuilder = queryBuilder.filterExact("countries.name", country);
    }
    if (genres) {
        genres.forEach(async (item) => {
            queryBuilder = queryBuilder.filterExact("genres.name", item);
        });
    }
    if (searchterm) {
        queryBuilder = queryBuilder.filterExact("name", searchterm);
    }
    if (sortingField) {
        queryBuilder = queryBuilder.sort(sortingField, SORT_TYPE.DESC);
    }
    else {
        queryBuilder = queryBuilder.sort("rating.kp", SORT_TYPE.DESC);
    }
    return await kp.movie.getByFilters(queryBuilder.build());
};
// Получить все возможные жанры
export const getGenres = async () => {
    return await kp.movie.getPossibleValuesByField(
        "genres.name",
    );
};
// Получить все возможные страны
export const getCountries = async () => {
    return await kp.movie.getPossibleValuesByField(
        "countries.name",
    );
}; 