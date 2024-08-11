export class ApiToken {
  private static mainName = "ApiToken";
  public static ApiTokenUser() {
    const base64String = localStorage.getItem(this.mainName);
    if (base64String) {
      const utf8Bytes = new Uint8Array([...atob(base64String)].map(char => char.charCodeAt(0)));
      return new TextDecoder().decode(utf8Bytes);
    } else {
      return null;
    }
  }
  public static RemoveApiTokenUser(){
    return localStorage.removeItem(this.mainName)
  }
  public static SetApiTokenUser(ApiTokenSet: string) {
    const utf8Bytes = new TextEncoder().encode(ApiTokenSet);
    const base64String = btoa(String.fromCharCode(...utf8Bytes));
    return localStorage.setItem(this.mainName, base64String);
  }
}
