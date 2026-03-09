import { LocalityResponse } from "../types/plz"

const BASE_URL = "https://openplzapi.org/de/Localities"

export const fetchByLocality = async (
  name: string,
  signal?: AbortSignal
): Promise<LocalityResponse[]> => {
  const res = await fetch(`${BASE_URL}?name=${name}`, { signal })

  if (!res.ok) {
    throw new Error("Failed to fetch locality")
  }

  return res.json()
}

export const fetchByPostalCode = async (
  postalCode: string,
  signal?: AbortSignal
): Promise<LocalityResponse[]> => {
  const res = await fetch(`${BASE_URL}?postalCode=${postalCode}`, { signal })

  if (!res.ok) {
    throw new Error("Failed to fetch postal code")
  }

  return res.json()
}