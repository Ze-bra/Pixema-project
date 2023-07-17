import { useNavigate } from "react-router-dom"
import { RoutesConstants } from "../../Constants/RouteConstants"
import FormLayout from "../../Components/formLayout"
import FormButton from "../../Components/formButton"
import styles from "../LayoutAuthorization/styles.module.scss";

const ActivationSuccess = () => {
  const navigate = useNavigate()
  const onClickNavigate = () => navigate(RoutesConstants.Home)

  return (
    <div className="form-body d-flex align-items-center justify-content-center ">
      <div className={[styles.box, "col-lg-6 col-md-8 col-sm-10 col-xs-12 border-0 rounded p-3"].join(" ")}>
        <FormLayout
          title={"Активировано"}>
          <form className="">
            <div className="row mb-3">
              <div className="col ">
                Электронная почта подтверждена.
                <br />
                Ваша регистрация завершена
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                <FormButton onClick={onClickNavigate}
                  text="Главная станица" />
              </div>
            </div>
          </form>
        </FormLayout >
      </div>
    </div>
  )
}

export default ActivationSuccess


