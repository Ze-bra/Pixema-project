import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../Store";
import { changePageAction, loadFilmsAction, setFilterAction } from "../../Store/film/actions";
import FilmCard from "../../Components/filmCard";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.scss";
import { Col, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FilmListConstants } from "../../Constants/FilmListConstants";
import NotFound from "../../Content/img/NotFound.png"

function Films() {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const films = useSelector((state: AppState) => state.films)

    useEffect(() => {
        dispatch(setFilterAction({
            ...films.filter,
            filmListType: params.listType ?? FilmListConstants.Main
        }))
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [params])

    useEffect(() => {
        dispatch(loadFilmsAction());
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [])

    const filmsItems = films.items.docs ? films.items.docs
        .map((item) =>
            <Col >
                <FilmCard
                    film={item}
                    key={item.id} />
            </Col>
        ) : "";
    if (!films.items.docs || films.items.docs.length === 0) {
        return (
            <div className={styles.filmNotFound}>
                <Image src={NotFound} rounded className={styles.filmNotFoundImg} />
                <span>Не найден фильм или сериал по вашему запросу</span>
            </div>);
    }

    return (
        <div className={styles.filmsContainer}>
            <InfiniteScroll
                dataLength={films.items.docs.length} //This is important field to render the next data
                next={() => dispatch(changePageAction())}
                hasMore={films.items.page < films.items.pages}
                loader={
                    <h4>Loading....</h4>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }>
                <Row sm={1} md={2} lg={5}>
                    {filmsItems}
                </Row>
            </InfiniteScroll>
        </div>
    )
}

export default Films





