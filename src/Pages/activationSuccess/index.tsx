import { useNavigate } from "react-router-dom"
import { RoutesConstants } from "../../Constants/RouteConstants"
import FormLayout from "../../Components/formLayout"
import FormButton from "../../Components/formButton"

const ActivationSuccess = () => {
  const navigate = useNavigate()
  const onClickNavigate = () => navigate(RoutesConstants.Home)

  return (
    <div className="form-body d-flex align-items-center justify-content-center ">
      <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 border-0 bg-dark rounded p-3">
        <FormLayout
          title={"Activation work around"}>
          <form className="">
            <div className="row mb-3">
              <div className="col ">
                Email confirmed.
                <br />
                Your registration is now completed
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                <FormButton onClick={onClickNavigate}
                  text="Go to home" />
              </div>
            </div>
          </form>
        </FormLayout >
      </div>
    </div>
  )
}

export default ActivationSuccess


