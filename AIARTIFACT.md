# AI Usage Transparency Report
### DPS React Challenge — Address Validator

---

## Tool Used

**Claude (Anthropic)** — claude.ai
Model: Claude Sonnet 4.6

**Conversation Link:**
https://claude.ai/share/57a87143-51d6-455f-9e6b-85d80d3ba1a2

> Note: If the link above is inaccessible (private session), the full prompt history is documented below.

---

## Prompts Used

### Prompt 1 — Architecture Review
> *"I have created a working UI of a coding challenge. I only needed to create an addressvalidator form which had 2 fields. The fields were interrelated. I will give you the picture of my current architecture. I want you to suggest me improvements. Currently all the main code is in AddressForm.tsx."*
> *(Attached: screenshot of initial file structure)*

### Prompt 2 — Code Review & Specific Suggestions
> *[Pasted full AddressForm.tsx source code]*
> *(No additional prompt — Claude was asked to review the code and give concrete refactoring suggestions)*

### Prompt 3 — Refactor Execution
> *"Okay i have created this architecture instead. I want you to split the AddressForm.tsx. Extract the background orbs so that i can put them into BackgroundOrbs.tsx. Also extract AddressForm.styles.ts. Also extract AddressForm.types.ts and give me the updated AddressForm.tsx."*
> *(Attached: screenshot of updated file structure)*

### Prompt 4 — This Document
> *"AI Usage Rules [...] Give me the artifact of this chat. With the link."*

---

## What Was AI-Assisted

| Area | AI Involvement | Notes |
|---|---|---|
| Initial `AddressForm.tsx` | ❌ None | Written entirely by developer |
| `useDebounce.ts` | ❌ None | Written entirely by developer |
| `plzApi.ts` | ❌ None | Written entirely by developer |
| Architecture review | ✅ Full | Claude suggested feature folder structure, hook extraction, constants, utils |
| `BackgroundOrbs.tsx` | ✅ Full | Extracted by Claude from existing code |
| `AddressForm.styles.ts` | ✅ Full | Extracted by Claude from existing code |
| `AddressForm.types.ts` | ✅ Full | Scaffolded by Claude (`ActiveField`, `AddressFormState`, `AddressFormHandlers`) |
| Refactored `AddressForm.tsx` | ✅ Full | Claude removed logic, wired to `useAddressForm()` hook |
| `useAddressForm.ts` hook | ⚠️ Partial | Claude defined the interface & shell; developer implemented the logic |

---

## Generated Code That Was Modified

### `AddressForm.types.ts`
Claude generated `AddressFormHandlers` with three handler signatures. The developer adjusted handler names to match the actual hook API (`onLocalityChange`, `onPostalCodeChange`, `onPostalCodeSelect`).

### `AddressForm.tsx` (refactored)
Claude's version assumed `useAddressForm()` returns a flat object with named handlers. The developer adapted the destructuring to match the actual hook implementation.

### Architecture Suggestion — Partially Rejected
Claude suggested adding a `constants/` folder with `DEBOUNCE_DELAY` and `POSTAL_CODE_LENGTH`. This was reviewed but not implemented — the developer chose to keep these inline for the scope of the challenge.

---

## Developer's Own Contributions

- All business logic (the interrelated field behavior, API orchestration, `AbortController` cleanup)
- The full MUI theme and animation design
- `plzApi.ts` service layer
- `useDebounce.ts` hook
- Final integration and wiring of all extracted pieces

---

*Generated: March 2026*