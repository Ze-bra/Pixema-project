import Select from 'react-select'
import { SelectElementType } from '../../Type/SelectElementType';

//https://react-select.com/styles
//https://github.com/JedWatson/react-select/issues/2345

const SelectElement = (props: SelectElementType) => {

  return (
    <Select
      closeMenuOnSelect={false}
      defaultValue={props.value}
      onChange={props.onChange}
      isMulti={true}
      options={props.options}
      placeholder={props.placeholder}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "var(--bs-primary)",
          danger: "var(--bs-danger)",
        },
      })}
      styles={{
        control: (provided, { isDisabled, isFocused }) => ({
          ...provided,
          backgroundColor: `var(--bs-body-bg)`,
          borderColor: `var(--bs-border-color)`,
          borderWidth: "var(--bs-border-width)",
          lineHeight: "1.5",
          fontSize: `1rem`,
          fontWeight: "400",
          padding: "0.375rem 0.375rem 0.375rem 0.75rem",
          minHeight: `42px`,
          ':hover':
            { borderColor: "var(--bs-select-focus-border-color)" }
        }),
        singleValue: ({ marginLeft, marginRight, ...provided }, { isDisabled }) => ({
          ...provided,
          color: `var(--bs-select${isDisabled ? '-disabled' : ''}-color)`,
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: `3px`,
        }),
        dropdownIndicator: (provided, state) => ({
          height: "100%",
          width: "var(--bs-select-indicator-padding)",
          backgroundImage: "var(--bs-select-indicator)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `right var(--bs-select-padding-x) center`,
          backgroundSize: "var(--bs-select-bg-size)",
        }),
        input: ({ margin, paddingTop, paddingBottom, ...provided }, state) => ({
          ...provided
        }),
        option: (provided, state) => ({
          ...provided,
          margin: `2px`,
        }),
        menu: ({ marginTop, ...provided }, state) => ({
          ...provided,
          backgroundColor: `var(--bs-body-bg)`,
        }),
        multiValue: (provided, state) => ({
          ...provided,
          margin: `2px`,
        }),
        clearIndicator: ({ padding, ...provided }, state) => ({
          ...provided,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "var(--bs-select-indicator-padding)",
        }),
        multiValueLabel: ({ padding, paddingLeft, fontSize, ...provided }, state) => ({
          ...provided,
          padding: `0 2px`,
          whiteSpace: "normal",
        }),
        indicatorSeparator: ({ padding, ...provided }, state) => ({
          display: "none",
        }),
      }} />
  )
}

export default SelectElement




