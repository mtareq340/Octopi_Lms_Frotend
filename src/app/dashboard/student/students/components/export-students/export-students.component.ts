import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiStudentsService } from '../../services/api-students.service';
declare var $: any;
import { SearchStudentsComponent } from '../search-students/search-students.component';
@Component({
  selector: 'app-export-students',
  templateUrl: './export-students.component.html',
  styleUrls: ['./export-students.component.scss']
})
export class ExportStudentsComponent {
  @Input() numbers: any = 0;
  @Input() nameSearch: any = "";
  @Input() levelName: any = '';
  @Input() divisionName: any = '';
  @Input() loadNumberReport = true;
  constructor(private toastr: ToastrService, private _ApiStudentsService: ApiStudentsService,private _SearchStudentsComponent:SearchStudentsComponent) { }
  studentFormExcel = new FormGroup({});
  submitExcel() {
    $("#submitExport").attr("disabled", "true");
    $("#submitExport").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ApiStudentsService.exportExcel(this._SearchStudentsComponent.studentsNumbersForm.value).subscribe((res) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Use the correct MIME type for Excel
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'Students.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
      $("#submitExport").removeAttr("disabled");
      $("#submitExport").html('<i class="fas fa-file-excel"></i> تنزيل الأكسيل ');
      $("#closeExport").trigger("click");
      $('#audio')[0].play();
    });
  }
}
