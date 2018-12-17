const MALE_INTERCEPT = -55.0969
const MALE_RATE_COEF = 0.6309
const MALE_WEIGHT_COEF = 0.1988
const MALE_AGE_COEF = 0.2017

const FEMALE_INTERCEPT = -20.4022
const FEMALE_RATE_COEF = 0.4472
const FEMALE_WEIGHT_COEF = 0.1263
const FEMALE_AGE_COEF = 0.074

const JEWEL_TO_KCAL = 4.184
const HOUR = 60

export const MALE = 'male'
export const FEMALE = 'female'
export const UNKNOWN = 'unknown'

const COEF = {
  [MALE]: {
    INTERCEPT: MALE_INTERCEPT,
    RATE: MALE_RATE_COEF,
    WEIGHT: MALE_WEIGHT_COEF,
    AGE: MALE_AGE_COEF,
  },
  [FEMALE]: {
    INTERCEPT: FEMALE_INTERCEPT,
    RATE: FEMALE_RATE_COEF,
    WEIGHT: FEMALE_WEIGHT_COEF,
    AGE: FEMALE_AGE_COEF,
  },
}

function calculator(LABEL, COEF) {
  return {
    label: LABEL,
    using(props) {
      const { rate, weight, age } = props
      return Math.round(
        ((COEF.INTERCEPT + COEF.RATE * rate + COEF.WEIGHT * weight + COEF.AGE * age) /
          JEWEL_TO_KCAL) *
          HOUR,
      )
    },
  }
}

export const methods = {
  [UNKNOWN]: {
    label: '-',
    using(props) {
      const male = methods[MALE].using(props)
      const female = methods[FEMALE].using(props)
      return Math.round((male + female) / 2)
    },
  },
  [MALE]: calculator('男', COEF[MALE]),
  [FEMALE]: calculator('女', COEF[FEMALE]),
}

export default {
  forSex(sex) {
    return methods[sex] || methods[UNKNOWN]
  },
}
