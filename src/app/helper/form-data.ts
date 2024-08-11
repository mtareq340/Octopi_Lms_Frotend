import * as XLSX from 'xlsx';
export class FormDataFile {
  public static convertObjectToFormData(object: any, file: any, key_file:string): FormData {
    const formData = new FormData();
    for (const key in object) {
      if (object.hasOwnProperty(key) && key != key_file) {
        var value = object[key];
        if(value == null){value = '';}
        formData.append(key, value);
      }
    }
    if(file){
        if(key_file.includes('[]')){for (let item of file) {formData.append(key_file, item);}}else{formData.append(key_file, file);}
    }
    return formData;
  }
  public static generateExcelFile(dataArray: any[]): void {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.xlsx';
    downloadLink.click();
  }
}
