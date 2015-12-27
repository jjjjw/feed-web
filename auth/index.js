
export function requireAuth (user, location, pushPath) {
  if (!user.isAuthenticated) {
    let next = location.pathname
    pushPath(`/login?next=${next}`)
  }
}


export function authorizeRequest (token) {
  return request => {
    if (token) {
      request.set('Authorization', `Bearer ${token}`)
    } else if (request.withCredentials) {
      request.withCredentials()
    }
    return request
  }
}
