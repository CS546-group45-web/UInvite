import React, { useRef } from "react";
import { IMaskInput } from "react-imask";

function DatePicker() {
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <IMaskInput
      mask={Number}
      radix="."
      value="123"
      unmask={true} // true|false|'typed'
      ref={ref}
      inputRef={inputRef} // access to nested input
      // DO NOT USE onChange TO HANDLE CHANGES!
      // USE onAccept INSTEAD
      onAccept={
        // depending on prop above first argument is
        // `value` if `unmask=false`,
        // `unmaskedValue` if `unmask=true`,
        // `typedValue` if `unmask='typed'`
        (value, mask) => console.log(value)
      }
      // ...and more mask props in a guide

      // input props also available
      placeholder="Enter number here"
    />
  );
}

export default DatePicker;
// use ref to get access to internal "masked = ref.current.maskRef"
