export const cx = (...classes) =>
  classes.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
