
export function requireAuth (user, location, pushPath) {
  if (!user.isAuthenticated) {
    let next = location.pathname
    pushPath(`/login?next=${next}`)
  }
}


export function authHeader (token) {
  return request => {
    if (token) {
      request.set('Authorization', `Bearer ${token}`)
    }
    return request
  }
}
