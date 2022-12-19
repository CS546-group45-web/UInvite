import { TextField } from '@mui/material';
import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

import CloseIcon from '@mui/icons-material/Close';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
function GoogleAutoCompleteAddress({ sendAddress, error }) {
  // const [addressAndCity, setAddressAndCity] = React.useState(null);
  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      console.log({ place });
      sendAddress(place);
    },
    options: {
      componentRestrictions: { country: 'us' },
      types: ['geocode', 'establishment'],
    },
  });

  return (
    <TextField
      fullWidth
      // color="secondary"
      id="address"
      label="Address"
      variant="outlined"
      required
      size="small"
      type="text"
      placeholder="Address"
      margin="dense"
      name="address"
      inputRef={ref}
      error={error}
      onChange={(e) => {}}
      helperText={
        error ? (
          <span className="text-base flex items-center">
            <CloseIcon fontSize="small" />
            Please enter a address
          </span>
        ) : (
          false
        )
      }
    />
  );
}

export default GoogleAutoCompleteAddress;
