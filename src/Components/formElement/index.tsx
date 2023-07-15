import { FormElementType } from '../../Type/FormElementType';

const FormElement = (props: FormElementType): JSX.Element => {
    let input = <input
        onChange={props.onChangeFunction}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className="form-control  bg-secondary border-0" />;
    if (props.component == 'TextArea') {
        input = <textarea
            name={props.name}
            onChange={props.onChangeFunction}
            placeholder={props.placeholder}
            className="form-control  bg-secondary border-0" />
    }

    return (
        <div className="mb-3">
            <label className="form-label">{props.label}</label>
            {input}
            {props.error && (
                <label className="form-text text-danger">
                    {props.error}
                </label>
            )}
        </div>
    )
}

export default FormElement

