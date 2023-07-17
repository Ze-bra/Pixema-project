import { Col, Row, Badge, Image } from 'react-bootstrap';
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { useEffect, useState } from "react";
import { getFilm } from "../../Services/filmServise";
import FilmCard from "../../Components/filmCard";

export const Film = () => {
    const params = useParams()

    const [film, setFilm] = useState<MovieDtoV13>({} as MovieDtoV13)

    useEffect(() => {
        getFilm(Number(params.id))
            .then(film => setFilm(film.data ?? {} as MovieDtoV13))
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [params])

    let badgeStyle = "secondary";
    if (film.rating?.kp) {
        if (film.rating?.kp > 8) {
            badgeStyle = "success"
        }
        else if (film.rating?.kp > 5) {
            badgeStyle = "warning"
        }
        else {
            badgeStyle = "danger"
        }
    }

    const sequelsAndPrequels = film.sequelsAndPrequels ? film.sequelsAndPrequels
        .map((item) =>
            <Col >
                <FilmCard
                    film={{
                        id: item.id,
                        name: item.name,
                        poster: item.poster
                    } as MovieDtoV13}
                    key={item.id} />
            </Col>
        ) : "";

    const similarMovies = film.similarMovies ? film.similarMovies
        .map((item) =>
            <Col >
                <FilmCard
                    film={{
                        id: item.id,
                        name: item.name,
                        poster: item.poster
                    } as MovieDtoV13}
                    key={item.id} />
            </Col>
        ) : "";

    return (
        <div className={styles.filmContainer}>
            <Row className={styles.gap}>
                <Col md="3" sm="10">
                    <Image
                        className='w-100'
                        src={film.poster?.url}
                        alt="" />
                </Col>
                <Col md="7" sm="10">
                    <Row>
                        <Col>
                            <h1>
                                {film.name}
                            </h1>
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col>
                            <span className={styles.filmCardText}>
                                {film.genres?.map(x => x.name === undefined ? "" : x.name.charAt(0).toUpperCase() + x.name.slice(1))?.join(' • ')}
                            </span>
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col>
                            <Badge
                                bg={badgeStyle}
                                className={styles.badge}>{film.rating?.kp === undefined ? "" : Number((film.rating?.kp).toFixed(1))}
                            </Badge>
                            <Badge
                                bg="secondary"
                                className={styles.badge}>
                                IMDB {film.rating?.kp === undefined ? "" : Number((film.rating?.kp).toFixed(1))}
                            </Badge>
                            <Badge
                                bg="secondary"
                                className={styles.badge}>
                                {(film.movieLength ?? film.seriesLength) ?? "-"} min
                            </Badge>
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col>
                            <p>
                                {film.description}
                            </p>
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Year</Col>
                        <Col md="10">
                            {film.year}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Realised</Col>
                        <Col md="10">
                            {film.year}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">BoxOffice</Col>
                        <Col md="10">
                            {film.budget?.currency} {film.budget?.value}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Country</Col>
                        <Col md="10">
                            {film.countries?.map(x => x.name).join(", ")}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Production</Col>
                        <Col md="10">
                            {film.productionCompanies?.map(x => x.name).join(", ")}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Actors</Col>
                        <Col md="10">
                            {film.persons?.filter(x => x.enProfession !== "producer" && x.enProfession !== "writer")
                                .map(x => x.name ?? x.enName).join(", ")}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Director</Col>
                        <Col md="10">{film.persons?.filter(x => x.enProfession === "producer")
                            .map(x => x.name ?? x.enName).join(", ")}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col md="2">Writers</Col>
                        <Col md="10">{film.persons?.filter(x => x.enProfession === "producer" || x.enProfession === "writer")
                            .map(x => x.name ?? x.enName).join(", ")}
                        </Col>
                    </Row>
                    <Row className={styles.gap}>
                        <Col>
                            {(sequelsAndPrequels.length > 0 || similarMovies.length > 0) && <h3>Рекомендации</h3>}
                        </Col>
                    </Row>
                    <Row sm={1} md={3} lg={4}>
                        {sequelsAndPrequels}
                        {similarMovies}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

