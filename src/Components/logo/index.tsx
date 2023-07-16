import { useEffect, useState } from "react";
import pixema2 from "../../Content/img/pixema2.png"
import pixema1 from "../../Content/img/pixema1.png"
import { useSelector } from "react-redux";
import { AppState } from "../../Store";
import styles from "../logo/styles.module.scss";


const Logo = (props: { swithColorTheme: boolean | undefined }) => {

    const themeState = useSelector((state: AppState) => state.siteSettings.theme) ?? "dark";
    const [logoSrc, setLogoSrc] = useState(pixema2);

    useEffect(() => {
        if (props.swithColorTheme === true) {
            if (themeState == "dark") {
                setLogoSrc(pixema2);
            }
            else {
                setLogoSrc(pixema1);
            }
        }

    }, [themeState])
    return (
        <img src={logoSrc} className={styles.logo } />
    );
};

export default Logo;
