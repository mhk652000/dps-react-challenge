import { Box } from "@mui/material"
import { sx } from "../styles/AddressForm.styles"

export default function BackgroundOrbs() {
  return (
    <>
      <Box sx={sx.orbTop} />
      <Box sx={sx.orbBottom} />
    </>
  )
}