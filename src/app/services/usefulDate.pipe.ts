import { Pipe, PipeTransform } from "@angular/core";
import { Timestamp } from "firebase/firestore";



import { formatDateUtil } from "./string-util";


@Pipe({
  name : 'usefulDate'
})
export class UsefulDatePipe implements PipeTransform {
  
  transform( value : Timestamp ) : string {
    return formatDateUtil( value.toDate() );
  }
}

