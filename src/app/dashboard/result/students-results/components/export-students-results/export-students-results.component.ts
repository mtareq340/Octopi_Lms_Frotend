import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiStudentsResultsService } from '../../services/api-students-results.service';
declare var $: any;
import { SearchStudentsResultsComponent } from '../search-students-results/search-students-results.component';
@Component({
  selector: 'app-export-students-results',
  templateUrl: './export-students-results.component.html',
  styleUrls: ['./export-students-results.component.scss']
})
export class ExportStudentsResultsComponent {
  @Input() numbers: any = 0;
  @Input() nameSearch: any = "";
  @Input() levelName: any = '';
  @Input() divisionName: any = '';
  @Input() courseName: any = '';
  @Input() loadNumberReport = true;
  constructor(private toastr: ToastrService, private _ApiStudentsResultsService: ApiStudentsResultsService,private _SearchStudentsResultsComponent:SearchStudentsResultsComponent) { }
  studentResultFormExcel = new FormGroup({});
  submitExcel() {
    $("#submitExport").attr("disabled", "true");
    $("#submitExport").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ApiStudentsResultsService.exportExcel(this._SearchStudentsResultsComponent.studentsResultsNumbersForm.value).subscribe((res) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'StudentsResults.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
      $("#submitExport").removeAttr("disabled");
      $("#submitExport").html('<i class="fas fa-file-excel"></i> تنزيل الأكسيل ');
      $("#closeExport").trigger("click");
      $('#audio')[0].play();
    });
  }
}
