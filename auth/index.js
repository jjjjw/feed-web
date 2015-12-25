
export function requireAuth (user, location, pushPath) {
  if (!user.isAuthenticated) {
    let next = location.pathname
    pushPath(`/login?next=${next}`)
  }
}
