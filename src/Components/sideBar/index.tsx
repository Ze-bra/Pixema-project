import { Button } from "react-bootstrap"
import styles from "./styles.module.scss"
import { Link, useParams } from "react-router-dom"
import { FilmListConstants } from "../../Constants/FilmListConstants"
import { RoutesConstants } from "../../Constants/RouteConstants"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../Store"
import { saveThemeAction } from "../../Store/siteSettings/actions"

const SideBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const themeState = useSelector((state: AppState) => state.siteSettings.theme) ?? "dark";
  document.documentElement.setAttribute("data-bs-theme", themeState)

  const params = useParams()

  const handleToggleTheme = () => {
    if (themeState == "dark") {
      dispatch(saveThemeAction("light"));
      return;
    }
    dispatch(saveThemeAction("dark"));
  };

  return (
    <>
      <div className={[styles.sideBar,
        "flex-column flex-shrink-0 sticky-top d-flex justify-content-between"].join(" ")} >
        <div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="row gy-5">
              <Link
                className={[styles.navTabs, (params.listType === undefined || params.listType === FilmListConstants.Main ? styles.activeLink : "")].join(' ')}
                to={RoutesConstants.Home + FilmListConstants.Main}>
                Главная
              </Link>
            </li>
            <li className="row gy-5">
              <Link
                className={[styles.navTabs, (params.listType && params.listType === FilmListConstants.Trends ? styles.activeLink : "")].join(' ')}
                to={RoutesConstants.Home + FilmListConstants.Trends}>
                Тренды
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-item">
          <Button
            variant="primary"
            className="shadow w-100 m-3"
            onClick={handleToggleTheme}>
            Переключить тему
          </Button>
          <span>© All rights reserved</span>
        </div>
      </div>


    </>

  )
}

export default SideBar
