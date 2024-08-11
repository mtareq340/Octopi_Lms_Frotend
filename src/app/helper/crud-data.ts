import { Pagination } from "./pagination";
import { User } from "./user";
export class CrudData {
  public static search(data: any) {
    var object = data;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    data.user_id = User.GetUser().id;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    if(User.GetUser().role_id == 3){data.division_id = User.GetUser().division_id;}
    return object;
  }
  public static getExams(data: any) {
    var object = data;
    data.user_id = User.GetUser().id;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    if(User.GetUser().role_id == 3){data.division_id = User.GetUser().division_id;}
    return object;
  }
  public static getResults(data: any) {
    var object = data;
    data.user_id = User.GetUser().id;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    return object;
  }
  public static storeUpdate(data: any) {
    var object = data;
    data.user_id = User.GetUser().id;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    if(User.GetUser().role_id == 3){data.division_id = User.GetUser().division_id;}
    return object;
  }
}
