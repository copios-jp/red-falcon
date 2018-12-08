export const Haskell = {
  id: 'haskell',
  label: 'Haskell (2011)',
  at(age) {
    const max = Math.round(208 - 0.7 * age)
    return Number.isNaN(max) ? undefined : max
  }
}
export const Robergs = {
  id: 'robergs',
  label: 'Robergs (2002)',
  at(age) {
    const max = Math.round(205.8 - 0.685 * age)
    return Number.isNaN(max) ? undefined : max
  }
}
export const Gulati = {
  id: 'Gulati',
  label: 'Gulati - Women (2010)',
  at(age) {
    const max = Math.round(205.8 - 0.685 * age)
    return Number.isNaN(max) ? undefined : max
  }
}

export const Fox = {
  id: 'fox',
  label: 'Fox Common Method (1970)',
  at(age) {
    const max = Math.round(220 - age)
    return Number.isNaN(max) ? undefined : max
  }
}
export const Tanaka = {
  id: 'tanaka',
  label: 'Tanaka (2001)',
  at(age) {
    const max = Math.round(208.75 - 0.73 * age)
    return Number.isNaN(max) ? undefined : max
  }
}
export const Nes = {
  id: 'nes',
  label: 'Nes (2013)',
  at(age) {
    const max = Math.round(211 - 0.64 * age)
    return Number.isNaN(max) ? undefined : max
  }
}

export const Manual = {
  id: 'manual',
  label: 'Manual',
  at() { /* noop */}
}

export default {
  fox: Fox,
  haskell: Haskell,
  robergs: Robergs,
  gulati: Gulati,
  tanaka: Tanaka,
  nes: Nes,
  manual: Manual,
}
