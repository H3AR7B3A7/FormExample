const genders = {
  male: {
    value: 'male',
    translation: 'Male',
  },
  female: {
    value: 'female',
    translation: 'Male',
  },
  other: {
    value: 'other',
    translation: 'Other',
  },
} as const

export const GENDERS = Object.values(genders)
const errorMessage = 'Could not find gender'

export const MALE =
  GENDERS.find((g) => g.value === genders.male.value) ||
  ((): Gender => {
    throw new Error(errorMessage)
  })()
export const FEMALE =
  GENDERS.find((g) => g.value === genders.female.value) ||
  ((): Gender => {
    throw new Error(errorMessage)
  })()

export const OTHER =
  GENDERS.find((g) => g.value === genders.other.value) ||
  ((): Gender => {
    throw new Error(errorMessage)
  })()

export type Gender = (typeof genders)[keyof typeof genders]

export const resolveGender = <T extends Gender>(
  genders: T
): string | undefined => {
  return Object.keys(genders).find(
    (key) => genders[key as keyof typeof genders] === genders
  )
}

// resolveClientType({
//   value: 'male',
//   translation: 'Male',
// })
