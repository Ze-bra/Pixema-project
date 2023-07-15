import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SignInFormType } from "../../Type/SignInFormType"
import FormLayout from "../../Components/formLayout"
import { RoutesConstants } from "../../Constants/RouteConstants"
import FormElement from "../../Components/formElement"
import FormButton from "../../Components/formButton"
import { loginAction } from "../../Store/authentication/actions"
import { AppDispatch, AppState } from "../../Store"

const SingIn = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [form, setForm] = useState<SignInFormType>({
        email: "",
        password: ""
    })

    const [formErrors, setFormErrors] = useState<Partial<SignInFormType>>({})
    const errors = useSelector((state: AppState) => state.authentication.errors)

    useEffect(() => {
        setFormErrors({
            ...formErrors,
            email: (errors?.detail ?? "") + (errors?.email?.join("; ") ?? ""),
            password: errors?.password?.join("; "),
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
        const { email, password } = form
        setFormErrors({
            ...formErrors,
            password: !password ? "Password is requed" : "",
            email: !email ? "email is requed" : "",
        })

        if (email && password) {
            dispatch(loginAction(email, password, () => navigate(RoutesConstants.Home)))
        }
    }

    return (
        <div className="form-body d-flex align-items-center justify-content-center ">
            <div className="col-lg-4 col-md-6 col-sm-8 col-xs-10 border-0 bg-dark rounded p-3">
                <FormLayout
                    title={"Sign In"}>
                    <form onSubmit={onFormSubmit}>
                        <div className="row">
                            <div className="col">
                                <FormElement onChangeFunction={onChangeFormElement}
                                    name={"email"}
                                    type={"text"}
                                    placeholder={"Your email"}
                                    label={"Email"}
                                    value={""}
                                    component="TextBox"
                                    error={formErrors.email} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <FormElement onChangeFunction={onChangeFormElement}
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Your password"}
                                    label={"Password"}
                                    value={""}
                                    component="TextBox"
                                    error={formErrors.password} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <FormButton
                                    text="Sign In"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col ">
                                Don’t have an account?
                                <Link to={RoutesConstants.SignUp} className="ml-2">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </FormLayout >
            </div>
        </div>
    )
}

export default SingIn


