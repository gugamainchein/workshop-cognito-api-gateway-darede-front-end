export function getPayload(user) {
  if (user.signInUserSession !== undefined) {
    return user.signInUserSession.idToken.payload;
  }
  return user.idToken.payload;
}

export function mapUserDataFromPayload(payload) {
  return {
    email: payload.email,
    id: payload.sub,
  };
}