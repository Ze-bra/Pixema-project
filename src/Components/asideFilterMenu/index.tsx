import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../Store'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { loadDictionariesAction } from '../../Store/dictionary/actions'
import { useNavigate } from 'react-router-dom'
import { filtersInitialValue } from '../../Store/film/reducer'
import { setFilterAction } from '../../Store/film/actions'
import { SelectOptionType } from '../../Type/SelectOptionType'
import { RoutesConstants } from '../../Constants/RouteConstants'
import { AllFields, MovieFields } from '@openmoviedb/kinopoiskdev_client'
import { Button, Col, Offcanvas, Row, ToggleButton, ToggleButtonGroup, Form } from 'react-bootstrap'
import SelectElement from '../selectElement'
import RangeElement from '../rangeElement'
import { MultiValue, ActionMeta } from 'react-select'
import { FilmsSearchFilterType } from '../../Type/FilmsTypes'

const AsideFilterMenu = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadDictionariesAction());
    }, [])

    const navigate = useNavigate();
    const filtersState = useSelector((state: AppState) => state.films)
    const dictionariesState = useSelector((state: AppState) => state.dictionaries)
    const [form, setForm] = useState<FilmsSearchFilterType>(filtersState.filter)

    const genres = useSelector((state: AppState) => dictionariesState.genres ?? "")
    const contries = useSelector((state: AppState) => dictionariesState.contries ?? "")

    const [showFilters, setShowFilters] = useState(false);

    const handleClearFilters = useCallback(() => {
        setForm(filtersInitialValue)
        dispatch(setFilterAction(filtersInitialValue))
        setShowFilters(false)
        navigate(RoutesConstants.Home);
    }, []);

    const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, searchterm: e.target.value.trim() === "" ? undefined : e.target.value })
    };

    const handleSortValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, sortingField: e.target.value as AllFields<MovieFields> })
    };

    const handleContryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, country: e.target.value })
    };

    const handleGenresChange = (newValue: MultiValue<SelectOptionType>, actionMeta: ActionMeta<SelectOptionType>) => {
        setForm({ ...form, genres: newValue.map(x => x.value) })
    };

    const handleYearChange = (newValue: [number, number]) => {
        setForm({ ...form, year: [newValue[0], newValue[1]] })
    };

    const handleRatingChange = (newValue: [number, number]) => {
        setForm({ ...form, rating: [newValue[0], newValue[1]] })
    };

    const handleCloseFilters = () => {
        setShowFilters(false)
        dispatch(setFilterAction(form))
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setFilterAction(form))
        setShowFilters(false)
        navigate(RoutesConstants.Home);
    }

    return (
        <></>
        // <Offcanvas
        //     show={showFilters}
        //     onHide={handleCloseFilters}
        //     placement="end" >
        //     <Offcanvas.Header closeButton >
        //         <Offcanvas.Title>Фильтры</Offcanvas.Title>
        //     </Offcanvas.Header>
        //     <Offcanvas.Body >
        //         <Form onSubmit={onFormSubmit}>
        //             <Form.Group
        //                 className="mb-3"
        //                 controlId="sortby">
        //                 <Form.Label>Сортировка по</Form.Label>
        //                 <Row>
        //                     <ToggleButtonGroup
        //                         type="radio"
        //                         name="options"
        //                         defaultValue={form.sortingField} >
        //                         <ToggleButton
        //                             id="tbg-radio-1"
        //                             className="p-2 w-50"
        //                             value="rating.kp"
        //                             variant="secondary"
        //                             onChange={handleSortValueChange}>
        //                             Rating
        //                         </ToggleButton>
        //                         <ToggleButton
        //                             id="tbg-radio-2"
        //                             className="p-2 w-50"
        //                             value="year"
        //                             variant="secondary"
        //                             onChange={handleSortValueChange}>
        //                             Year
        //                         </ToggleButton>
        //                     </ToggleButtonGroup>
        //                 </Row>
        //             </Form.Group>
        //             <hr />
        //             <Form.Group className="mb-3">
        //                 <Form.Label>Фильм или сериал</Form.Label>
        //                 <Form.Control
        //                     className="p-2"
        //                     placeholder="Фильм или сериал"
        //                     onChange={handleSearchValueChange}
        //                     value={form.searchterm} />
        //             </Form.Group>
        //             <Form.Group className="mb-3">
        //                 <Form.Label>Страна</Form.Label>
        //                 <Form.Select
        //                     className="p-2"
        //                     placeholder="Выберете страну"
        //                     value={form.country}
        //                     onChange={handleContryChange}>
        //                     <option value={""}>Выберете страну</option>
        //                     {contries.map((contry, idx) => (
        //                         <option value={contry.name}>{contry.name}</option>
        //                     ))
        //                     }
        //                 </Form.Select>
        //             </Form.Group>
        //             <Form.Group className="mb-3">
        //                 <Form.Label>Жанр</Form.Label>
        //                 <SelectElement
        //                     onChange={handleGenresChange}
        //                     options={genres.map((genre, idx) => ({ value: genre.name, label: genre.name } as SelectOptionType))}
        //                     value={form.genres.map((genre, idx) =>
        //                         ({ value: genre, label: genre } as SelectOptionType)
        //                     )}></SelectElement>
        //             </Form.Group>
        //             <Form.Group className="mb-3">
        //                 <Form.Label>Год производства</Form.Label>
        //                 <RangeElement
        //                     max={new Date().getFullYear()}
        //                     min={2000}
        //                     step={1}
        //                     value={form.year}
        //                     roundeCount={0}
        //                     onChange={handleYearChange}></RangeElement>
        //             </Form.Group>
        //             <Form.Group className="mb-3">
        //                 <Form.Label>Рейтинг</Form.Label>
        //                 <RangeElement
        //                     max={10}
        //                     min={0}
        //                     step={0.1}
        //                     value={form.rating}
        //                     roundeCount={1}
        //                     onChange={handleRatingChange}></RangeElement>
        //             </Form.Group>
        //             <Row className="align-bottom">
        //                 <Col className="p-1">
        //                     <Button
        //                         variant="secondary"
        //                         className="w-100"
        //                         id="clear"
        //                         onClick={handleClearFilters}>
        //                         Очистить фильтр
        //                     </Button>
        //                 </Col>
        //                 <Col className="p-1">
        //                     <Button
        //                         variant="primary"
        //                         type="submit"
        //                         className="w-100"
        //                         id="submit">
        //                         Показать результаты
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </Form>
        //     </Offcanvas.Body>
        // </Offcanvas>
    )
}

export default AsideFilterMenu
