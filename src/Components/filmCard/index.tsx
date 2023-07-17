import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import styles from "../filmCard/styles.module.scss";
import { Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutesConstants } from "../../Constants/RouteConstants";


const FilmCard = (props: { film: MovieDtoV13 }) => {

    let badgeStyle = "secondary";
    if (props.film.rating?.kp) {
        if (props.film.rating?.kp > 8) {
            badgeStyle = "success"
        }
        else if (props.film.rating?.kp > 5) {
            badgeStyle = "warning"
        }
        else {
            badgeStyle = "danger"
        }
    }

    return (
        <div className={styles.filmCard}>
            <Badge
                bg={badgeStyle}
                className={styles.badge}>
                {props.film.rating?.kp === undefined ? "" : Number((props.film.rating?.kp).toFixed(1))}
            </Badge>
            <Badge
                bg="secondary"
                className={styles.badgeYear}>
                {props.film.year === undefined ? "" : props.film.year}
            </Badge>
            <Image
                className={[styles.filmCardImg, "float-start"].join(' ')}
                src={props.film.poster?.previewUrl}
                alt="" />
            <Link
                className={styles.filmCardTitle}
                to={`${RoutesConstants.Film}/${props.film.id}`}>
                {props.film.name}
            </Link>
            <span
                className={styles.filmCardText}>
                {props.film.genres?.map(x => x.name === undefined ? "" : x.name.charAt(0).toUpperCase() + x.name.slice(1))?.join(' • ')}
            </span>
        </div>
    )
}

export default FilmCard
