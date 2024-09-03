import decode from "jwt-decode";

class AuthService {
  getUser() {
    const token = this.getToken();
    return token ? decode(token) : null;
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem(AuthService.id_token);
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  getToken() {
    return localStorage.getItem(AuthService.id_token);
  }

  login(idToken) {
    localStorage.setItem(AuthService.id_token, idToken);
    window.location.assign("/dashboard");
  }

  logout() {
    localStorage.removeItem(AuthService.id_token);
    window.location.assign("/login");
  }
}

export default new AuthService();
