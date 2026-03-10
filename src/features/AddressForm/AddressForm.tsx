import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
  InputAdornment,
} from "@mui/material"

import { ThemeProvider } from "@mui/material/styles"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

import { theme, sx } from "./styles/AddressForm.styles"
import { globalStyles } from "../../styles/styles"
import { useAddressForm } from "./hooks/useAddressForm"
import BackgroundOrbs from "./components/BackgroundOrbs"

export default function AddressForm() {
  const {
    locality,
    postalCode,
    postalOptions,
    error,
    loading,
    success,
    handleLocalityChange,
    handlePostalChange,
    handlePostalSelect,
  } = useAddressForm()

  return (
    <ThemeProvider theme={theme}>
      <style>{globalStyles}</style>

      <BackgroundOrbs />

      {/* Card */}
      <Box className="address-card" sx={sx.card}>

        {/* Shimmer line */}
        <Box sx={sx.shimmerLine} />

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={sx.badge}>
            <Box sx={sx.badgeDot} />
            <Typography sx={sx.badgeText}>Deutschland · PLZ Lookup</Typography>
          </Box>
          <Typography sx={sx.title}>Address Validator</Typography>
          <Typography sx={sx.subtitle}>Enter a city or postal code to verify.</Typography>
        </Box>

        {/* Divider */}
        <Box sx={sx.divider} />

        {/* Locality field */}
        <Box className="field-wrapper" sx={{ mb: 2.5 }}>
          <span className="label-tag">City / Locality</span>
          <TextField
            fullWidth
            placeholder="e.g. München, Berlin…"
            margin="none"
            value={locality}
            disabled={loading}
            onChange={(e) => handleLocalityChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 0, ml: 0 }}>
                  <LocationCityIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.2)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Postal code field */}
        <Box className="field-wrapper" sx={{ mb: 2.5 }}>
          <span className="label-tag">Postal Code (PLZ)</span>
          <Autocomplete
            freeSolo
            options={postalOptions}
            forcePopupIcon={postalOptions.length > 0}
            inputValue={postalCode}
            loading={loading}
            onInputChange={(_event, newInputValue) => handlePostalChange(newInputValue)}
            onChange={(_event, newValue) => {
              if (typeof newValue === "string") handlePostalSelect(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="e.g. 80331"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ pl: 0, ml: 0.5 }}>
                      <LocalPostOfficeIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.2)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={16} sx={{ color: "#63d2ba", mr: 1 }} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>

        {/* Status messages */}
        {(error || success) && (
          <Box sx={error ? sx.statusError : sx.statusSuccess}>
            {success && (
              <CheckCircleOutlineIcon className="success-ping" sx={{ fontSize: 16, color: "#63d2ba" }} />
            )}
            <Typography sx={sx.statusText(!!error)}>
              {error || "Address validated successfully"}
            </Typography>
          </Box>
        )}

        {/* Footer */}
        <Typography sx={sx.footer}>
          Powered by German PLZ API · Data from Deutsche Post
        </Typography>

      </Box>
    </ThemeProvider>
  )
}