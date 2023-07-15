import { FormLayoutType } from "../../Type/FormLayoutType"

const FormLayout = (props: FormLayoutType) => {

    return (
        <>
            <div className="row">
                <div className="col ">
                    <h2>{props.title}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default FormLayout