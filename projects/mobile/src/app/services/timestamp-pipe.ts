import { DatePipe, formatDate, getLocaleId } from "@angular/common";
import { Inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";
import { Timestamp } from "firebase/firestore";



import { formatDateUtil } from "./string-util";


@Pipe({
  name : 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  constructor( @Inject(LOCALE_ID) private locale : string ){ }

  transform( value : Timestamp, 
              format = "dd/mm/yyyy", 
              timezone = undefined, 
              locale = undefined ) : string {
    if(!locale)
      locale = this.locale;
    let date = value.toDate();
    return formatDate( date, format, locale, timezone );
  }

}

