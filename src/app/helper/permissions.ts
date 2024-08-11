export class Permissions {
  private static mainName = "Permissions";
  public static UserPermissions() {
    const item = localStorage.getItem(this.mainName);
    if (item) {
      return JSON.parse(this.decodeBase64(item));
    } else {
      return null;
    }
  }
  public static RemoveUserPermissions() {
    return localStorage.removeItem(this.mainName);
  }
  public static SetUserPermissions(UserSet: any) {
    const encodedPermissions = this.encodeBase64(JSON.stringify(UserSet));
    return localStorage.setItem(this.mainName, encodedPermissions);
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
