export type ActiveField = "locality" | "postal" | null

export interface AddressFormState {
  locality: string
  postalCode: string
  postalOptions: string[]
  error: string
  loading: boolean
  success: boolean
  activeField: ActiveField
}

export interface AddressFormHandlers {
  handleLocalityChange: (value: string) => void
  handlePostalChange: (value: string) => void
  handlePostalSelect: (value: string) => void
}

export type UseAddressFormReturn = Omit<AddressFormState, "activeField"> & AddressFormHandlers