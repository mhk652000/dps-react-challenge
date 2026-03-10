import { createTheme } from "@mui/material/styles"
import { SxProps, Theme } from "@mui/material"



export const theme = createTheme({
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
              borderColor: "transparent",
              borderWidth: "1.5px",
              transition: "all 0.3s ease",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent !important",
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
            padding: "17px 6px",
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
        popupIndicator: {
  color: "rgba(255,255,255,0.2)",
  "&:hover": {
    color: "#63d2ba",
    backgroundColor: "transparent",
  },
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

export const sx = {
  orbTop: {
    position: "fixed",
    top: "15%",
    left: "20%",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,210,186,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  } as SxProps<Theme>,

  orbBottom: {
    position: "fixed",
    bottom: "15%",
    right: "15%",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(130,100,255,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  } as SxProps<Theme>,

  card: {
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
  } as SxProps<Theme>,

  shimmerLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(99,210,186,0.6), rgba(130,100,255,0.4), transparent)",
    backgroundSize: "200% auto",
    animation: "shimmer 4s linear infinite",
  } as SxProps<Theme>,

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    px: 1.5,
    py: 0.6,
    borderRadius: "8px",
    background: "rgba(99,210,186,0.1)",
    border: "1px solid rgba(99,210,186,0.2)",
    mb: 2,
  } as SxProps<Theme>,

  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#63d2ba",
    boxShadow: "0 0 8px #63d2ba",
  } as SxProps<Theme>,

  badgeText: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#63d2ba",
    fontFamily: '"DM Sans", sans-serif',
  } as SxProps<Theme>,

  title: {
    fontFamily: '"DM Sans", sans-serif',
    fontStyle: "italic",
    fontSize: "30px",
    lineHeight: 1.2,
    color: "#f5f5f5",
    fontWeight: 400,
    letterSpacing: "-0.01em",
  } as SxProps<Theme>,

  subtitle: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "13.5px",
    color: "rgba(255,255,255,0.3)",
    mt: 0.8,
    fontWeight: 300,
  } as SxProps<Theme>,

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    mb: 3.5,
  } as SxProps<Theme>,

  statusError: {
    mt: 2.5,
    px: 2,
    py: 1.5,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: 1,
    background: "rgba(255, 80, 80, 0.08)",
    border: "1px solid rgba(255, 80, 80, 0.2)",
  } as SxProps<Theme>,

  statusSuccess: {
    mt: 2.5,
    px: 2,
    py: 1.5,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: 1,
    background: "rgba(99, 210, 186, 0.08)",
    border: "1px solid rgba(99, 210, 186, 0.2)",
  } as SxProps<Theme>,

  statusText: (isError: boolean) => ({
    fontSize: "13px",
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 400,
    color: isError ? "rgba(255,110,110,0.9)" : "#63d2ba",
  }) as SxProps<Theme>,

  footer: {
    mt: 3.5,
    fontSize: "11.5px",
    color: "rgba(255,255,255,0.15)",
    fontFamily: '"DM Sans", sans-serif',
    textAlign: "center",
    letterSpacing: "0.02em",
  } as SxProps<Theme>,
}