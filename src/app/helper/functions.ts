export class Functions {
  public static getTitleStyle(textParameter: any,withAlign: any = true) {
    const text = this.getTextFromHtml(textParameter);
    const arabicCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
    const englishCount = (text.match(/[A-Za-z]/g) || []).length;
    const isArabicPredominant = arabicCount > englishCount;
    const object: any = {
      'direction': isArabicPredominant ? 'rtl' : 'ltr',
      'unicode-bidi': isArabicPredominant ? 'embed' : 'normal'
    };
    if(withAlign){
      object['text-align'] = isArabicPredominant ? 'right' : 'left';
    }
    return object;
  }
  public static checkLang(textParameter: any) {
    const text = this.getTextFromHtml(textParameter);
    const arabicCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
    const englishCount = (text.match(/[A-Za-z]/g) || []).length;
    const isArabicPredominant = arabicCount > englishCount;
    return isArabicPredominant;
  }
  public static getTextFromHtml(htmlString: any): string {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, 'text/html');
    return parsedHtml.body.textContent || '';
  }
}
