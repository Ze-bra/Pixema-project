import { useSelector } from "react-redux"
import { AppState } from "../../Store"
import { useNavigate } from "react-router-dom"
import FormLayout from "../../Components/formLayout"
import FormButton from "../../Components/formButton"
import { RoutesConstants } from "../../Constants/RouteConstants"

const SignUpConfirmation = () => {
  const reg = useSelector((state: AppState) => state.registration.user)
  const navigate = useNavigate()

  return (
    <div className="form-body d-flex align-items-center justify-content-center ">
      <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 border-0 bg-dark rounded p-3">
        <FormLayout
          title={'Registration Confirmation'}>
          <form className="">
            <div className="row mb-3">
              <div className="col ">
                Please activate your account with the activation link in the email
                <a href="#">{reg?.email}</a>
                . Please, check your email
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                <FormButton
                  onClick={() => navigate(RoutesConstants.Home)}
                  disabled={true}
                  text="Go to home" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                <FormButton onClick={() => navigate(RoutesConstants.Activation)}
                  text="Activation work around" />
              </div>
            </div>
          </form>
        </FormLayout >
      </div>
    </div>
  )
}

export default SignUpConfirmation


