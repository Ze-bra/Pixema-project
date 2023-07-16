import { useDispatch } from "react-redux"
import { AppDispatch } from "../../Store"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useCallback, useState } from "react"
import { activationAction } from "../../Store/registration/actions"
import FormLayout from "../../Components/formLayout"
import FormElement from "../../Components/formElement"
import FormButton from "../../Components/formButton"
import { RoutesConstants } from "../../Constants/RouteConstants"
import styles from "../LayoutAuthorization/styles.module.scss";

export const ActivatePage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [activationLink, setActivationLink] = useState<string>("")
    const onChangeFormElement = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setActivationLink(e.target.value)
    }, [activationLink])

    const onClick = () => {
        if (activationLink) {
            const uidToken = activationLink.replace("http://studapi.teachmeskills.by//activate/", "").split("/");
            dispatch(activationAction(uidToken[0], uidToken[1], () => navigate(RoutesConstants.ActivationSuccess)))
        }
    }

    return (
        <div className="form-body d-flex align-items-center justify-content-center ">
            <div className={[styles.box, "col-lg-6 col-md-8 col-sm-10 col-xs-12 border-0 rounded p-3"].join(" ")}>
                <FormLayout
                    title={"Activation work around"}>
                    <form className="">
                        <div className="row mb-3">
                            <div className="col">
                                For activate your accoun please insert activation link from email to form bellow
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <FormElement
                                    onChangeFunction={onChangeFormElement}
                                    type={"text"}
                                    placeholder={"Activation link"}
                                    label={"Activation link"}
                                    value={""}
                                    name={"link"}
                                    component="TextBox" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <FormButton onClick={onClick}
                                    text="Activate"
                                    type={"button"}/>
                            </div>
                        </div>
                    </form>
                </FormLayout >
            </div>
        </div>
    )
}

