import { FormButtonType } from "../../Type/FormButtonType"

const FormButton = (props: FormButtonType) => {

    return (
        <button
            onClick={props.onClick}
            className="btn btn-primary w-100 mb-3"
            disabled={props.disabled}
            type={props.type ? props.type : "submit"}>
            {props.text}
        </button>
    )
}

export default FormButton

