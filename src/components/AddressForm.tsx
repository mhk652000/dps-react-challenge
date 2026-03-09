import { useEffect, useState } from "react"
import { fetchByLocality, fetchByPostalCode } from "../services/plzApi"
import { useDebounce } from "../hooks/useDebounce"

import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
  InputAdornment,
} from "@mui/material"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

type ActiveField = "locality" | "postal" | null

const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "14px",
            color: "#f0f0f0",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "15px",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: "1.5px",
              transition: "all 0.3s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(99, 210, 186, 0.4)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(99, 210, 186, 0.05)",
              boxShadow: "0 0 0 3px rgba(99, 210, 186, 0.12)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#63d2ba",
              borderWidth: "1.5px",
            },
            "&.Mui-disabled": {
              opacity: 0.5,
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.35)",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "14px",
            letterSpacing: "0.03em",
            "&.Mui-focused": {
              color: "#63d2ba",
            },
          },
          "& .MuiInputBase-input": {
            padding: "16px 18px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(255,255,255,0.2)",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a1f2e",
          border: "1px solid rgba(99, 210, 186, 0.2)",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          marginTop: "6px",
        },
        option: {
          color: "#d0d0d0",
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "14px",
          padding: "12px 16px",
          "&:hover": {
            backgroundColor: "rgba(99, 210, 186, 0.1) !important",
            color: "#63d2ba",
          },
          "&[aria-selected='true']": {
            backgroundColor: "rgba(99, 210, 186, 0.15) !important",
          },
        },
        noOptions: {
          color: "rgba(255,255,255,0.3)",
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "13px",
        },
      },
    },
  },
})

export default function AddressForm() {
  const [locality, setLocality] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [postalOptions, setPostalOptions] = useState<string[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [activeField, setActiveField] = useState<ActiveField>(null)

  const debouncedLocality = useDebounce(locality, 1000)
  const debouncedPostal = useDebounce(postalCode, 1000)

  useEffect(() => {
    if (activeField !== "locality") return
    if (!debouncedLocality) return

    const controller = new AbortController()

    const lookupLocality = async () => {
      try {
        setLoading(true)
        setError("")
        setSuccess(false)

        const data = await fetchByLocality(debouncedLocality, controller.signal)

        if (data.length === 1) {
          setPostalCode(data[0].postalCode)
          setPostalOptions([])
          setSuccess(true)
        }
        if (data.length > 1) {
          const codes = data.map((d) => d.postalCode)
          setPostalOptions(codes)
        }
        if (data.length === 0) {
          setPostalOptions([])
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch locality")
        }
      } finally {
        setLoading(false)
      }
    }

    lookupLocality()
    return () => controller.abort()
  }, [debouncedLocality])

  useEffect(() => {
    if (activeField !== "postal") return
    if (!debouncedPostal || debouncedPostal.length !== 5) return

    const controller = new AbortController()

    const lookupPostal = async () => {
      try {
        setLoading(true)
        setError("")
        setSuccess(false)

        const data = await fetchByPostalCode(debouncedPostal, controller.signal)

        if (data.length === 0) {
          setError("Invalid postal code")
          setLocality("")
        } else {
          setLocality(data[0].name)
          setSuccess(true)
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch postal code")
        }
      } finally {
        setLoading(false)
      }
    }

    lookupPostal()
    return () => controller.abort()
  }, [debouncedPostal])

  return (
    <ThemeProvider theme={theme}>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(99, 210, 186, 0.3); }
          70% { box-shadow: 0 0 0 10px rgba(99, 210, 186, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 210, 186, 0); }
        }

        .address-card {
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .field-wrapper {
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .field-wrapper:nth-child(2) { animation-delay: 0.1s; }
        .field-wrapper:nth-child(3) { animation-delay: 0.2s; }

        .success-ping {
          animation: pulse-ring 1s ease-out;
        }

        .label-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 8px;
          display: block;
        }
      `}</style>

              <Box
          sx={{
            position: "fixed",
            top: "15%",
            left: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,210,186,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: "15%",
            right: "15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(130,100,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Card */}
        <Box
          className="address-card"
          sx={{
            width: "100%",
            maxWidth: 440,
            background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            p: "40px 36px 36px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top shimmer line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(99,210,186,0.6), rgba(130,100,255,0.4), transparent)",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          />

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.6,
                borderRadius: "8px",
                background: "rgba(99,210,186,0.1)",
                border: "1px solid rgba(99,210,186,0.2)",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#63d2ba",
                  boxShadow: "0 0 8px #63d2ba",
                }}
              />
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#63d2ba",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Deutschland · PLZ Lookup
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: "italic",
                fontSize: "30px",
                lineHeight: 1.2,
                color: "#f5f5f5",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Address Validator
            </Typography>

            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.3)",
                mt: 0.8,
                fontWeight: 300,
              }}
            >
              Enter a city or postal code to verify.
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "1px",
              background: "rgba(255,255,255,0.06)",
              mb: 3.5,
            }}
          />

          {/* Locality field */}
          <Box className="field-wrapper" sx={{ mb: 2.5 }}>
            <span className="label-tag">City / Locality</span>
            <TextField
              fullWidth
              placeholder="e.g. München, Berlin…"
              value={locality}
              disabled={loading}
              onChange={(e) => {
                const value = e.target.value
                setError("")
                setSuccess(false)
                setActiveField("locality")
                setLocality(value)
                if (value === "") {
                  setPostalOptions([])
                  setPostalCode("")
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ pl: 0.5 }}>
                    <LocationCityIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.2)" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Postal code field */}
          <Box className="field-wrapper">
            <span className="label-tag">Postal Code (PLZ)</span>
            <Autocomplete
              freeSolo
              options={postalOptions}
              inputValue={postalCode}
              loading={loading}
              onInputChange={(event, newInputValue) => {
                if (!/^\d*$/.test(newInputValue)) return
                setError("")
                setSuccess(false)
                setActiveField("postal")
                setPostalCode(newInputValue)
                if (newInputValue === "") {
                  setLocality("")
                  setPostalOptions([])
                }
              }}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setPostalCode(newValue)
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="e.g. 80331"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pl: 0.5 }}>
                        <LocalPostOfficeIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.2)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {loading && (
                          <CircularProgress
                            size={16}
                            sx={{ color: "#63d2ba", mr: 1 }}
                          />
                        )}
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
            <Box
              sx={{
                mt: 2.5,
                px: 2,
                py: 1.5,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                ...(error
                  ? {
                      background: "rgba(255, 80, 80, 0.08)",
                      border: "1px solid rgba(255, 80, 80, 0.2)",
                    }
                  : {
                      background: "rgba(99, 210, 186, 0.08)",
                      border: "1px solid rgba(99, 210, 186, 0.2)",
                    }),
              }}
            >
              {success && (
                <CheckCircleOutlineIcon
                  className="success-ping"
                  sx={{ fontSize: 16, color: "#63d2ba" }}
                />
              )}
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  color: error ? "rgba(255,110,110,0.9)" : "#63d2ba",
                }}
              >
                {error || "Address validated successfully"}
              </Typography>
            </Box>
          )}

          {/* Footer hint */}
          <Typography
            sx={{
              mt: 3.5,
              fontSize: "11.5px",
              color: "rgba(255,255,255,0.15)",
              fontFamily: '"DM Sans", sans-serif',
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            Powered by German PLZ API · Data from Deutsche Post
          </Typography>
        </Box>
    </ThemeProvider>
  )
}