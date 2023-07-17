import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { Range, getTrackBackground } from "react-range";
import { RangeElementType } from "../../Type/RangeElementType";

 //https://github.com/tajo/react-range

const RangeElement = (rangeProps: RangeElementType) => {
  const [values, setValues] = useState(rangeProps.value);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
      <output id="output">
        <InputGroup >
          <FormControl
            className="p-2 text-center"
            type="text"
            readOnly value={values[0].toFixed(rangeProps.roundeCount)}>
          </FormControl>
          <span className="input-group-text">-</span>
          <FormControl
            className="p-2 text-center"
            type="text"
            readOnly value={values[1].toFixed(rangeProps.roundeCount)}>
          </FormControl>
        </InputGroup>
      </output>
      <Range
        step={rangeProps.step}
        min={rangeProps.min}
        max={rangeProps.max}
        values={values}
        onChange={(values) => {
          rangeProps.onChange([values[0], values[1]]);
          setValues([values[0], values[1]]);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}>
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#323537", "#7b61ff", "#323537"],
                  min: rangeProps.min,
                  max: rangeProps.max,
                }),
                alignSelf: "center"
              }}>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "4px",
              backgroundColor: "#7b61ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div
              style={{
                height: "5px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC"
              }} />
          </div>
        )} />
    </div>
  )
}

export default RangeElement


