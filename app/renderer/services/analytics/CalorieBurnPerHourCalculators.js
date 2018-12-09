const MALE_RATE_COEF = 0.6309
const MALE_WEIGHT_COEF = 0.1988
const MALE_AGE_COEF = 0.2017
const MALE_MODIFIER = -55.0969

const FEMALE_RATE_COEF = 0.4472
const FEMALE_WEIGHT_COEF = 0.1263
const FEMALE_AGE_COEF = 0.074
const FEMALE_MODIFIER = -20.4022

const REDUCER = 4.184
const HOUR = 60

export const MALE = 'male'
export const FEMALE = 'female'
export const UNKNOWN = 'unknown'

export const methods = {
  [MALE]: {
    using(props) {
      const { rate, weight, age } = props
      return Math.round(
        ((MALE_MODIFIER + MALE_RATE_COEF * rate - MALE_WEIGHT_COEF * weight + MALE_AGE_COEF * age) /
          REDUCER) *
          HOUR,
      )
    },
  },

  [FEMALE]: {
    using(props) {
      const { rate, weight, age } = props
      return Math.round(
        ((FEMALE_MODIFIER +
          FEMALE_RATE_COEF * rate -
          FEMALE_WEIGHT_COEF * weight +
          FEMALE_AGE_COEF * age) /
          REDUCER) *
          HOUR,
      )
    },
  },
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
