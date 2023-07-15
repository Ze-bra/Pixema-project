import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../Store"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { SignInFormType } from "../../Type/SignInFormType"
import { registrationAction } from "../../Store/registration/actions"
import FormLayout from "../../Components/formLayout"
import FormElement from "../../Components/formElement"
import FormButton from "../../Components/formButton"
import { RoutesConstants } from "../../Constants/RouteConstants"

const SingUp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [form, setForm] = useState<SignInFormType>({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  })

  const [formErrors, setFormErrors] = useState<Partial<SignInFormType>>({})
  const errors = useSelector((state: AppState) => state.registration.errors)

  useEffect(() => {
    setFormErrors({
      ...formErrors,
      email: errors?.email?.join("; "),
      password: errors?.password?.join("; "),
      username: errors?.username?.join("; ")
    })
  }, [errors])

  const onChangeFormElement = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormErrors({})
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }, [form, setForm])

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password, username, confirmPassword } = form
    setFormErrors({
      ...formErrors,
      password: !password ? 'Password is requed' : "",
      email: !email ? 'email is requed' : "",
      username: !username ? 'username is requed' : "",
      confirmPassword: !password ? 'confirmPassword is requed' : password !== confirmPassword ? 'Passwords do not match' : "",
    })

    if (email && password && username && password === confirmPassword) {
      const regSuccess = () => navigate(RoutesConstants.SignUpConfirmation)

      dispatch(registrationAction(username, email, password, regSuccess))
    }
  }

  return (
    <div className="form-body d-flex align-items-center justify-content-center ">
      <div className="col-lg-4 col-md-6 col-sm-8 col-xs-10 border-0 bg-dark rounded p-3">
        <FormLayout
          title={'Sign Up'} >
          <form onSubmit={onFormSubmit}>
            <div className="row">
              <div className="col">
                <FormElement
                  onChangeFunction={onChangeFormElement}
                  type={"text"}
                  placeholder={"Your name"}
                  label={"Name"}
                  value={""}
                  name={"username"}
                  component="TextBox"
                  error={formErrors.username} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormElement
                  onChangeFunction={onChangeFormElement}
                  type={"text"}
                  placeholder={"Your email"}
                  label={"Email"}
                  value={""}
                  name={"email"}
                  component="TextBox"
                  error={formErrors.email} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormElement
                  onChangeFunction={onChangeFormElement}
                  type={"password"}
                  placeholder={"Your password"}
                  label={"Password"}
                  value={""}
                  name={"password"}
                  component="TextBox"
                  error={formErrors.password} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormElement
                  onChangeFunction={onChangeFormElement}
                  type={"password"}
                  placeholder={"Confirm password"}
                  label={"Confirm password"}
                  value={""}
                  name={"confirmPassword"}
                  component="TextBox"
                  error={formErrors.confirmPassword} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormButton
                  text="Sign Up" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                Already have an account?
                <Link
                  to={RoutesConstants.SignIn}
                  className="ml-2">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </FormLayout >
      </div>
    </div>
  )
}

export default SingUp


