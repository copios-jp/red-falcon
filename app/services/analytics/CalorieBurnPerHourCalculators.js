const MALE_MODIFIER = -55.0969
const MALE_RATE_COEF = 0.6309
const MALE_WEIGHT_COEF = 0.1988
const MALE_AGE_COEF = 0.2017

const FEMALE_MODIFIER = -20.4022
const FEMALE_RATE_COEF = 0.4472
const FEMALE_WEIGHT_COEF = 0.1263
const FEMALE_AGE_COEF = 0.074

const REDUCER = 4.184
const HOUR = 60

export const MALE = 'male'
export const FEMALE = 'female'
export const UNKNOWN = 'unknown'

function calculator(MODIFIER, RATE_COEF, WEIGHT_COEF, AGE_COEF) {
  return {
    using(props) {
      const { rate, weight, age } = props
      return Math.round(
        ((MODIFIER + RATE_COEF * rate - WEIGHT_COEF * weight + AGE_COEF * age) / REDUCER) * HOUR,
      )
    },
  }
}
export const methods = {
  [MALE]: calculator(MALE_MODIFIER, MALE_RATE_COEF, MALE_WEIGHT_COEF, MALE_AGE_COEF),
  [FEMALE]: calculator(FEMALE_MODIFIER, FEMALE_RATE_COEF, FEMALE_WEIGHT_COEF, FEMALE_AGE_COEF),
  [UNKNOWN]: {
    using(props) {
      const male = methods[MALE].using(props)
      const female = methods[FEMALE].using(props)
      return Math.round((male + female) / 2)
    },
  },
}

export default {
  forSex(sex) {
    return methods[sex] || methods[UNKNOWN]
  },
}
