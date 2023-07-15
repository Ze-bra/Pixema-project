import { PossibleValueDto } from "@openmoviedb/kinopoiskdev_client";

export type DictionariesType = {
    genres: PossibleValueDto[]
    contries: PossibleValueDto[],
}

export type DictionariesActionType = {
    type: string;
    payload?: any
}