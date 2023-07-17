import { useSelector } from "react-redux"
import { AppState } from "../../Store"
import { useNavigate } from "react-router-dom"
import FormLayout from "../../Components/formLayout"
import FormButton from "../../Components/formButton"
import { RoutesConstants } from "../../Constants/RouteConstants"
import styles from "../LayoutAuthorization/styles.module.scss";

const SignUpConfirmation = () => {
  const reg = useSelector((state: AppState) => state.registration.user)
  const navigate = useNavigate()

  return (
    <div className="form-body d-flex align-items-center justify-content-center ">
      <div className={[styles.box, "col-lg-6 col-md-8 col-sm-10 col-xs-12 border-0 rounded p-3"].join(" ")}>
        <FormLayout
          title={"Подтверждение регистрации"}>
          <form className="">
            <div className="row mb-3">
              <div className="col ">
                Пожалуйста, активируйте свою учетную запись с помощью ссылки активации в письме
                <a href="#">{reg?.email}</a>
                . Пожалуйста, проверьте свою электронную почту
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                <FormButton
                  onClick={() => navigate(RoutesConstants.Home)}
                  disabled={true}
                  text="Главная станица" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                <FormButton onClick={() => navigate(RoutesConstants.Activation)}
                  text="Альтернативная активация аккаунта" />
              </div>
            </div>
          </form>
        </FormLayout >
      </div>
    </div>
  )
}

export default SignUpConfirmation


