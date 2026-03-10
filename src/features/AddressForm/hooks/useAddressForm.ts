import { useEffect, useState } from "react"
import { fetchByLocality, fetchByPostalCode } from "../../../services/plzApi"
import { useDebounce } from "../../../hooks/useDebounce"
import type { ActiveField, UseAddressFormReturn } from "../types/AddressForm.types"


export function useAddressForm(): UseAddressFormReturn {
  const [locality, setLocality] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [postalOptions, setPostalOptions] = useState<string[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeField, setActiveField] = useState<ActiveField>(null)

  const debouncedLocality = useDebounce(locality, 1000)
  const debouncedPostal = useDebounce(postalCode, 1000)

  const resetStatus = () => {
    setError("")
    setSuccess(false)
  }

  // ─── Lookup by locality ──────────────────────────────────────────────────────

  useEffect(() => {
    if (activeField !== "locality") return
    if (!debouncedLocality) return

    const controller = new AbortController()

    const lookupLocality = async () => {
      try {
        setLoading(true)
        resetStatus()

        const data = await fetchByLocality(debouncedLocality, controller.signal)

        if (data.length === 1) {
          setPostalCode(data[0].postalCode)
          setPostalOptions([])
          setSuccess(true)
        }
        if (data.length > 1) {
          setPostalOptions(data.map((d) => d.postalCode))
        }
        if (data.length === 0) {
          setPostalOptions([])
        }
      } catch (err: any) {
        if (err.name !== "AbortError") setError("Failed to fetch locality")
      } finally {
        setLoading(false)
      }
    }

    lookupLocality()
    return () => controller.abort()
  }, [debouncedLocality])

  // ─── Lookup by postal code ───────────────────────────────────────────────────

  useEffect(() => {
    if (activeField !== "postal") return
    if (!debouncedPostal || debouncedPostal.length !== 5) return

    const controller = new AbortController()

    const lookupPostal = async () => {
      try {
        setLoading(true)
        resetStatus()

        const data = await fetchByPostalCode(debouncedPostal, controller.signal)

        if (data.length === 0) {
          setError("Invalid postal code")
          setLocality("")
        } else {
          setLocality(data[0].name)
          setSuccess(true)
        }
      } catch (err: any) {
        if (err.name !== "AbortError") setError("Failed to fetch postal code")
      } finally {
        setLoading(false)
      }
    }

    lookupPostal()
    return () => controller.abort()
  }, [debouncedPostal])

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleLocalityChange = (value: string) => {
    resetStatus()
    setActiveField("locality")
    setLocality(value)
    if (value === "") {
      setPostalOptions([])
      setPostalCode("")
    }
  }

  const handlePostalChange = (value: string) => {
    if (!/^\d*$/.test(value)) return
    resetStatus()
    setActiveField("postal")
    setPostalCode(value)
    if (value === "") {
      setLocality("")
      setPostalOptions([])
    }
  }

  const handlePostalSelect = (value: string) => {
    setPostalCode(value)
  }

  return {
    locality,
    postalCode,
    postalOptions,
    error,
    loading,
    success,
    handleLocalityChange,
    handlePostalChange,
    handlePostalSelect,
  }
}