import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiStudentsRegisterCoursesService } from '../../services/api-students-register-courses.service';
import { ShowStudentsRegisterCoursesComponent } from '../show-students-register-courses/show-students-register-courses.component';
import { User } from 'src/app/helper/user';
@Component({
  selector: 'app-add-students-register-courses',
  templateUrl: './add-students-register-courses.component.html',
  styleUrls: ['./add-students-register-courses.component.scss']
})
export class AddStudentsRegisterCoursesComponent {
  constructor(private toastr: ToastrService, private _ApiStudentsRegisterCoursesService: ApiStudentsRegisterCoursesService , private _ShowStudentsRegisterCoursesComponent:ShowStudentsRegisterCoursesComponent) { }
  students: any;
  optionsClicked: boolean = false;
  searchTextLater: any;
  loadCourses = false;
  load = false;
  options = false;
  oldRegister = false;
  courses: any;
  coursesRegister: any;
  studentsRegisterCourseForm = new FormGroup({
    student_id: new FormControl("", [Validators.required]),
    regulation_course_Ids: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required])
  });
  requiredFields =
    [
      "student_id",
      "name",
      "regulation_course_Ids"
    ];
  validate(data: any) {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!data[element])
        valid = false;
    });
    return valid;
  }
  insert(data: any) {
    $("#submitAdd").attr("disabled", "true");
    $("#submitAdd").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      this.studentsRegisterCourseForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitAdd").removeAttr("disabled");
      $("#submitAdd").html('إضافة');
    } else {
      data.academic_year_id = User.GetUser().academic_year_id;
      data.academic_term_id = User.GetUser().academic_term_id;
        this._ApiStudentsRegisterCoursesService.add(data).subscribe((res) => {
          if (res.status == 1) {
            this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses.unshift.apply(this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses , res.data);
            $("#submitAdd").removeAttr("disabled");
            $("#submitAdd").html('إضافة');
            $("#closeAdd").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تمت الإضافة بنجاح');
            this.studentsRegisterCourseForm.reset();
            this.students = [];
            this.courses = [];
            this.coursesRegister = [];
            this.oldRegister = false;
            $('.mySelect2').val(null).trigger('change');
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
            $("#submitAdd").removeAttr("disabled");
            $("#submitAdd").html('إضافة');
          }
        });
    }
  }
  setDataStudent(id: any,name: any){
    this.studentsRegisterCourseForm.controls['student_id'].setValue(id);
    this.studentsRegisterCourseForm.controls['name'].setValue(name);
    this.options = false;
    this.loadCourses = true;
    this.students = [];
    this._ApiStudentsRegisterCoursesService.getAvailableCourses({student_id:id}).subscribe((res)=>{
      this.courses = res.availableCourses;
      this.coursesRegister = res.registeredCourses;
      this.loadCourses = false;
      this.select2();
      this.oldRegister = true;
    });
  }
  handleFocus(){
    this.options = true;
    if(this.studentsRegisterCourseForm.controls['name'].value){
      this.getStudent();
    }
  }
  getStudent(){
    this.courses = [];
    this.oldRegister = false;
    this.studentsRegisterCourseForm.controls['student_id'].setValue("");
    this.options = true;
    if(this.load){
      this.searchTextLater = this.studentsRegisterCourseForm.controls['name'].value;
      return;
    }
    this.load = true;
    const searchText = this.studentsRegisterCourseForm.controls['name'].value;
    this.ActionApiGetStudent(searchText);
  }
  ActionApiGetStudent(searchText: any){
    this._ApiStudentsRegisterCoursesService.getStudents({searchKey:searchText}).subscribe((res)=>{
      if(res.status == 1){
        this.students = res.data;
        if(this.searchTextLater){
          this.ActionApiGetStudent(this.searchTextLater);
          this.searchTextLater = '';
        }else{
          this.load = false;
        }
      }
    })
  }
  deleteCourseRegister(course: any,index: any){
    $(`#submitDeleteRegister${index}`).attr("disabled", "true");
    $(`#submitDeleteRegister${index}`).html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!course.id) {
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع إختر التسجيل');
      $(`#submitDeleteRegister${index}`).removeAttr("disabled");
      $(`#submitDeleteRegister${index}`).html('+');
    } else {
        var data = {id:course.id};
        this._ApiStudentsRegisterCoursesService.delete(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this.coursesRegister.find((obj: any) => obj.id === data.id);
            let index = this.coursesRegister.indexOf(object);
            this.coursesRegister.splice(index, 1);
            var objectPush = {id:course.regulation_course_id,course:course.course};
            this.courses.unshift(objectPush);
            $(`#submitDeleteRegister${index}`).removeAttr("disabled");
            $(`#submitDeleteRegister${index}`).html('+');
            $("#closeDelete").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم المسح بنجاح');
            this.select2();
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
          }
        });
    }


  }
  select2(){
    $('.mySelect2_regulation_course_Ids_add').select2({
      dir:'rtl',
      allowClear: true,
      placeholder: 'المقرر الدراسي'
    }).on('change', () => {
      var selectedValue = $('.mySelect2_regulation_course_Ids_add').val();
      var objectArray = selectedValue.map((str: any) => JSON.parse(str.replace(/'/g, "\"")));
      if(objectArray.length == 0){objectArray = ''}
      this.studentsRegisterCourseForm.controls['regulation_course_Ids'].setValue(objectArray);
    });
  }
  ngOnInit(){
    this.select2();
  }
  handleBlur() {
    if (!this.optionsClicked) {
      this.options = false;
    }
  }
  setOptionsClicked(clicked: boolean) {
    this.optionsClicked = clicked;
  }
}
