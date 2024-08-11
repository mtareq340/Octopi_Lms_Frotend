export class User {
  private static mainName = "User";
  public static GetUser() {
    const item = localStorage.getItem(this.mainName);
    if (item) {
      return JSON.parse(this.decodeBase64(item));
    } else {
      return null;
    }
  }
  public static RemoveUser() {
    return localStorage.removeItem(this.mainName);
  }
  public static SetUser(data: any) {
    const encodedData = this.encodeBase64(JSON.stringify(data));
    return localStorage.setItem(this.mainName, encodedData);
  }
  private static encodeBase64(input: string): string {
    const utf8Bytes = new TextEncoder().encode(input);
    return btoa(String.fromCharCode(...utf8Bytes));
  }
  private static decodeBase64(encoded: string): string {
    const utf8Bytes = new Uint8Array([...atob(encoded)].map(char => char.charCodeAt(0)));
    return new TextDecoder().decode(utf8Bytes);
  }
}
