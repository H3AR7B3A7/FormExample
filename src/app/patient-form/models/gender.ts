const genders = {
  male: {
    value: 'male',
    i18n: 'Male',
  },
  female: {
    value: 'female',
    i18n: 'Female',
  },
  other: {
    value: 'other',
    i18n: 'Other',
  },
} as const

export type Gender = (typeof genders)[keyof typeof genders]

export const GENDERS = Object.values(genders)

const notFound = (): Gender => {
  throw new Error('Could not find gender')
}

export const MALE =
  GENDERS.find((g) => g.value === genders.male.value) || notFound()
export const FEMALE =
  GENDERS.find((g) => g.value === genders.female.value) || notFound()
export const OTHER =
  GENDERS.find((g) => g.value === genders.other.value) || notFound()

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
