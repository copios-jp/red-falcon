export const constrainedUpdate = (current, next, negations) => {
  return negations.some((negation) => {
    return typeof negation === 'function'
      ? negation(current) !== negation(next)
      : current[negation] !== next[negation]
  })
}
