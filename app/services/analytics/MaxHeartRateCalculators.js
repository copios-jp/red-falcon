export const FOX = 'fox'
export const MANUAL = 'manual'
export const NES = 'nes'
export const GULATI = 'gulati'
export const ROBERGS = 'robergs'
export const TANAKA = 'tanaka'

function calculator(props) {
  const { id, label, func } = props
  return {
    id,
    label,
    using: (props) => {
      const max = Math.round(func(props))
      return Number.isNaN(max) ? undefined : max
    },
  }
}

export const methods = {
  [ROBERGS]: calculator({
    id: ROBERGS,
    label: 'Robergs (2002)',
    func: (props) => 205.8 - 0.685 * props.age,
  }),
  [GULATI]: calculator({
    id: GULATI,
    label: 'Gulati - Women (2010)',
    func: (props) => 205.8 - 0.685 * props.age,
  }),
  [FOX]: calculator({
    id: FOX,
    label: 'Fox (1970)',
    func: (props) => 220 - props.age,
  }),
  [TANAKA]: calculator({
    id: TANAKA,
    label: 'Tanaka (2001)',
    func: (props) => 208.75 - 0.73 * props.age,
  }),
  [NES]: calculator({
    id: NES,
    label: 'Nes (2013)',
    func: (props) => 211 - 0.64 * props.age,
  }),
  [MANUAL]: calculator({
    id: MANUAL,
    label: 'Manual',
    func: (props) => props.max,
  }),
}

export default {
  forMethod(method) {
    return methods[method] || methods[FOX]
  },
}
