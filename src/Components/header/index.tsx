import { RoutesConstants } from "../../Constants/RouteConstants"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../Store"
import styles from "./styles.module.scss"
import { Button, Offcanvas, ToggleButton, Form, CloseButton, ToggleButtonGroup, Row, Col, Badge } from "react-bootstrap"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { setFilterAction } from "../../Store/film/actions"
import { AllFields, MovieFields } from "@openmoviedb/kinopoiskdev_client"
import { MultiValue, ActionMeta, InputActionMeta } from "react-select"
import { filtersInitialValue } from "../../Store/film/reducer"
import { loadDictionariesAction } from "../../Store/dictionary/actions"
import RangeElement from "../rangeElement"
import SelectElement from "../selectElement"
import { SelectOptionType } from "../../Type/SelectOptionType"
import { FilmsSearchFilterType } from "../../Type/FilmsTypes"
import Logo from "../logo"

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadDictionariesAction());
  }, [])

  const navigate = useNavigate();

  const authentificationState = useSelector((state: AppState) => state.authentication)
  const filtersState = useSelector((state: AppState) => state.films)
  const dictionariesState = useSelector((state: AppState) => state.dictionaries)
  const genres = useSelector((state: AppState) => dictionariesState.genres ?? "")
  const contries = useSelector((state: AppState) => dictionariesState.contries ?? "")

  const [form, setForm] = useState<FilmsSearchFilterType>(filtersState.filter)
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => {
    setShowFilters(false)
    dispatch(setFilterAction(form))
  };

  const handleShowFilters = () => setShowFilters(true);

  const handleCloseBudge = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value
    })
    dispatch(setFilterAction({
      ...filtersState.filter,
      [name]: value
    }))
    navigate(RoutesConstants.Home);
  }

  const handleSearchValueChangeHeader = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      searchterm: e.target.value.trim() === "" ? undefined : e.target.value
    })
    dispatch(setFilterAction({
      ...filtersState.filter,
      searchterm: e.target.value
    }))
    navigate(RoutesConstants.Home);
  };

  const handleClearFilters = useCallback(() => {
    setForm(filtersInitialValue)
    dispatch(setFilterAction(filtersInitialValue))
    setShowFilters(false)
    navigate(RoutesConstants.Home);
  }, []);

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      searchterm: e.target.value.trim() === "" ? undefined : e.target.value
    })
  };

  const handleSortValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      sortingField: e.target.value as AllFields<MovieFields>
    })
  };

  const handleContryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      country: e.target.value
    })
  };

  const handleGenresChange = (newValue: MultiValue<SelectOptionType>, actionMeta: ActionMeta<SelectOptionType>) => {
    setForm({
      ...form,
      genres: newValue.map(x => x.value)
    })
  };

  const handleYearChange = (newValue: [number, number]) => {
    setForm({
      ...form,
      year: [newValue[0], newValue[1]]
    })
  };

  const handleRatingChange = (newValue: [number, number]) => {
    setForm({
      ...form,
      rating: [newValue[0], newValue[1]]
    })
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setFilterAction(form))
    setShowFilters(false)
    navigate(RoutesConstants.Home);
  }

  const getCutedName = function (userName: string | undefined) {

    if (!userName)
      return " ";

    let splitedUserName = userName.split(" ");
    if (splitedUserName.length > 1) {
      return (splitedUserName[0].substring(0, 1) + splitedUserName[1].substring(0, 1)).toUpperCase();
    }
    return splitedUserName[0].substring(0, 2).toUpperCase();
  }

  return (
    <>
      <nav className={[styles.header, "fixed-top"].join(" ")}>
        <Row className="navbar text-right">
          <Col lg="2" sm="12" className="align-self-start">
            <a href={RoutesConstants.Home} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
              <Logo swithColorTheme={true}></Logo>
            </a>
          </Col>
          <Col lg="8" sm="9" xs="9">
            <Form className={[styles.search, "flex-grow-1"].join(" ")}>
              <Form.Control
                type="text"
                placeholder="Поиск..."
                onChange={handleSearchValueChangeHeader}
                onClick={handleCloseFilters}
                value={form.searchterm} />
              {authentificationState.isAuthenticated &&
                <Button
                  className={styles.filter_button}
                  onClick={handleShowFilters} >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"  >
                    <path
                      d="M5 6L19 6M10 12H19M14 18H19"
                      stroke="#AFB2B6"
                      strokeWidth="2"
                      strokeLinecap="round" />
                    {
                      (form.searchterm != filtersInitialValue.searchterm
                        || form.country != filtersInitialValue.country
                        || form.genres != filtersInitialValue.genres
                        || form.year != filtersInitialValue.year
                        || form.rating != filtersInitialValue.rating
                        || form.sortingField != filtersInitialValue.sortingField)
                      &&
                      <circle cx="3" cy="19" r="3" fill="#7B61FF" />
                    }
                  </svg>
                </Button>
              }
            </Form>
            <div>
              {form.searchterm != filtersInitialValue.searchterm
                &&
                <Badge bg="secondary" className="m-1 p-1">
                  {form.searchterm}
                  <CloseButton
                    className={styles.clear_button}
                    onClick={(e) => handleCloseBudge("searchterm", filtersInitialValue.searchterm)}>
                  </CloseButton>
                </Badge>
              }
              {form.country != filtersInitialValue.country
                &&
                <Badge bg="secondary" className="m-1 p-1">
                  {form.country}
                  <CloseButton
                    className={styles.clear_button}
                    onClick={(e) => handleCloseBudge("country", filtersInitialValue.country)}>
                  </CloseButton>
                </Badge>
              }
              {form.genres != filtersInitialValue.genres
                &&
                form.genres.map
                  (g =>
                    <Badge bg="secondary" className="m-1 p-1">
                      {g}
                      <CloseButton
                        className={styles.clear_button}
                        onClick={(e) => handleCloseBudge("genres", form.genres.filter(x => x !== g))}>
                      </CloseButton>
                    </Badge>
                  )
              }
              {form.year != filtersInitialValue.year
                &&
                <Badge bg="secondary" className="m-1 p-1">
                  {form.year[0]} - {form.year[1]}
                  <CloseButton
                    className={styles.clear_button}
                    onClick={(e) => handleCloseBudge("year", filtersInitialValue.year)}>
                  </CloseButton>
                </Badge>
              }
              {form.rating != filtersInitialValue.rating
                &&
                <Badge bg="secondary" className="m-1 p-1">
                  {form.rating[0]} - {form.rating[1]}
                  <CloseButton
                    className={styles.clear_button}
                    onClick={(e) => handleCloseBudge("rating", filtersInitialValue.rating)}>
                  </CloseButton>
                </Badge>
              }
            </div>
          </Col>
          <Col lg="2" sm="3" xs="3" className="align-self-start">
            <div>
              {!authentificationState.isAuthenticated &&
                <Link to={RoutesConstants.SignIn} className="btn btn-primary text-right mt-2"> Войти</Link>
              }
              {authentificationState.isAuthenticated &&
                <div className={styles.userName}>
                  <span className={[styles.userNameLetter, "btn btn-primary mt-2"].join(" ")}>
                    {getCutedName(authentificationState.user?.username ?? authentificationState.user?.email)}
                  </span>
                  <span className={styles.userNameWord}>
                    {authentificationState.user?.username ?? authentificationState.user?.email}
                  </span>
                </div>
              }
            </div>
          </Col>
        </Row>
      </nav>
      <Offcanvas
        show={showFilters}
        onHide={handleCloseFilters}
        placement="end" >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Фильтры</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          <Form onSubmit={onFormSubmit}>
            <Form.Group
              className="mb-3"
              controlId="sortby">
              <Form.Label>Сортировка</Form.Label>
              <Row>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  defaultValue={form.sortingField} >
                  <ToggleButton
                    id="tbg-radio-1"
                    className="p-2 w-50"
                    value="rating.kp"
                    variant="secondary"
                    onChange={handleSortValueChange}>
                    Рейтинг
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-2"
                    className="p-2 w-50"
                    value="year"
                    variant="secondary"
                    onChange={handleSortValueChange}>
                    Год
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                className="p-2"
                placeholder="Введите название"
                onChange={handleSearchValueChange}
                value={form.searchterm} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Страна</Form.Label>
              <Form.Select
                className="p-2"
                placeholder="Выберете страну"
                value={form.country}
                onChange={handleContryChange}>
                <option value={""}>Выберете страну</option>
                {contries
                  .map((contry, idx) => (
                    <option value={contry.name}>
                      {contry.name}
                    </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Жанр</Form.Label>
              <SelectElement
                onChange={handleGenresChange}
                placeholder="Выберете жанр"
                options={genres.map((genre, idx) => ({ value: genre.name, label: genre.name } as SelectOptionType))}
                value={form.genres.map((genre, idx) =>
                  ({ value: genre, label: genre } as SelectOptionType)
                )
                }></SelectElement>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Год производства</Form.Label>
              {/* https://github.com/tajo/react-range */}
              <RangeElement
                max={new Date().getFullYear()}
                min={2000}
                step={1}
                value={form.year}
                roundeCount={0}
                onChange={handleYearChange}></RangeElement>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Рейтинг</Form.Label>
              {/* https://github.com/tajo/react-range */}
              <RangeElement
                max={10}
                min={0}
                step={0.1}
                value={form.rating}
                roundeCount={1}
                onChange={handleRatingChange}></RangeElement>
            </Form.Group>
            <Row className="align-bottom">
              <Col className="p-1">
                <Button
                  variant="secondary"
                  className="w-100"
                  id="clear"
                  onClick={handleClearFilters}>
                  Очистить фильтр
                </Button>
              </Col>
              <Col className="p-1">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  id="submit">
                  Показать результаты
                </Button>
              </Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Header


