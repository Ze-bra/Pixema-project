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
import styles from "../LayoutAuthorization/styles.module.scss";

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
      password: !password ? "Требуется пароль" : "",
      email: !email ? "Требуется электронная почта" : "",
      username: !username ? "Требуется имя пользователя" : "",
      confirmPassword: !password ? "Требуется подтверждение пароля" : password !== confirmPassword ? "Пароли не совпадают" : "",
    })

    if (email && password && username && password === confirmPassword) {
      const regSuccess = () => navigate(RoutesConstants.SignUpConfirmation)

      dispatch(registrationAction(username, email, password, regSuccess))
    }
  }

  return (
    <div className="form-body d-flex align-items-center justify-content-center ">
      <div className={[styles.box, "col-lg-4 col-md-6 col-sm-8 col-xs-10 border-0 rounded p-3"].join(" ")}>
        <FormLayout
          title={"Регистрация"} >
          <form onSubmit={onFormSubmit}>
            <div className="row">
              <div className="col">
                <FormElement
                  onChangeFunction={onChangeFormElement}
                  type={"text"}
                  placeholder={"Ваше имя"}
                  label={"Имя пользователя"}
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
                  placeholder={"Ваша электронная почта"}
                  label={"Электронная почта"}
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
                  placeholder={"Ваш пароль"}
                  label={"Пароль"}
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
                  placeholder={"Подтвердите ваш пароль"}
                  label={"Подтвердить пароль"}
                  value={""}
                  name={"confirmPassword"}
                  component="TextBox"
                  error={formErrors.confirmPassword} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormButton
                  text="Регистрация" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col ">
                У вас уже есть аккаунт?
                <Link
                  to={RoutesConstants.SignIn}
                  className="ml-2 text-decoration-none ms-2">
                  Войти
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


