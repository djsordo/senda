import { Injectable } from "@angular/core";


/**
 * Utilidades para cadenas de caracteres, por ejemplo un comparador 
 * por contenido que ignore mayúsculas y minúsculas. 
 */
@Injectable({
  providedIn : 'root'
})
export class StringUtil{

  subtitutions = {
    'a' : 'áàäã',
    'e' : 'éèë',
    'i' : 'íìï',
    'o' : 'óòö',
    'u' : 'úùü'
  };

  /**
   * Comparación flexible: 
   * 
   * <code>like( 'hola    lucas', 'hola' ) -> true</code> (busca por contenido)
   * <code>like( 'hola    lucas', 'hola lucas' ) -> true</code> (ignora espacios repetidos)
   * <code>like( 'HOLA  LUCAS', 'hola lucas' ) -> true</code> (ignora mayusculas y minúsculas)
   * <code>like( 'hóla lúcas', 'hola lucas' ) -> true</code> (ignora marcas diacríticas)
   * @param str 
   * @param pattern 
   */
  public like( pajar : string, aguja : string ){

    pajar = pajar.toLowerCase(); 
    aguja = aguja.toLowerCase();

    const anyWhiteSpace = /\s+/ig;
    aguja = aguja.replaceAll( anyWhiteSpace, ' ' );
    aguja = this.replaceDiacritics( aguja );
    pajar = pajar.replaceAll( anyWhiteSpace, ' ' );
    pajar = this.replaceDiacritics( pajar );


    if( pajar.search( aguja ) >= 0 )
      return true; 
    else
      return false;
  }

  private replaceDiacritics( str : string ){
    for( let character in this.subtitutions ){
      const charactersToReplace = this.subtitutions[ character ];
      for( let characterToLocate of charactersToReplace ){
        str = str.replaceAll( characterToLocate, character );
      }
    }
    return str; 
  }

}

export function make_id( ...values : string[] ){

  let replacements = [{regexp : /[áàäâ]/g, replacement : 'a'},
                      {regexp : /[éèëê]/g, replacement : 'e'},
                      {regexp : /[íìïî]/g, replacement : 'i'},
                      {regexp : /[óòöô]/g, replacement : 'o'},
                      {regexp : /[úùüû]/g, replacement : 'u'},
                      {regexp : /ñ/g     , replacement : 'n'},
                      {regexp : /_el_/g,     replacement : '_'},
                      {regexp : /_la_/g,     replacement : '_'},
                      {regexp : /_los_/g,    replacement : '_'},
                      {regexp : /_las_/g,    replacement : '_'},
                      {regexp : /_un_/g,     replacement : '_'},
                      {regexp : /_una_/g,    replacement : '_'},
                      {regexp : /_unos_/g,   replacement : '_'},
                      {regexp : /_unas_/g,   replacement : '_'},
                      {regexp : /_the_/g,    replacement : '_'},
                      {regexp : /_and_/g,    replacement : '_'},
                      {regexp : /[%&\/\\¿?¡!]/g, replacement : '_' }];

  let s = '';
  for( let val of values ){
    s += ' ' + val;
  }

  s = s.trim().toLowerCase();
  s = s.replaceAll( /\s+/g, '_' );
  for( let repl of replacements ){
    s = s.replaceAll( repl.regexp, repl.replacement );
  }
  s = s.replaceAll( /[^\w]/g, '_' );
  s = s.replaceAll( /_+/g, '_' );
  s = s.replace( /^_/, '' );
  s = s.replace( /_$/, '' );
  return s;
}

/**
 * Given an imput string, return it in "Proper Case", i.e. 
 * the first letter in uppercase and the rest in lowercase.
 * 
 * @param s input string
 */
export function properCase( s : string ){
  return s[0].toUpperCase() + s.slice( 1 ).toLowerCase();
}

/**
 * Given a Date object, returns a string representing 
 * a "useful" translation of that date. 
 * 
 * A useful representation is "two days ago" instead of 
 * "18/08/2022" or "In two hours" to represent that the 
 * event represented by this date will begin on two hours.
 *
 * valores que vamos a retornar: 
 * miercoles de la próxima semana (24/08)
 * dentro de dos días (24/08)
 * mañana (24/08)
 * hoy (24/08)
 * dentro de X horas (13:30)
 * dentro de una hora (13:30)
 * dentro de media hora (13:30)
 * ahora 
 * hace media hora (13:30)
 * hace una hora (13:30)
 * hace X horas (13:30)
 * ayer (24/08)
 * antes de ayer (24/08)
 * miercoles pasado (24/08)
 * (24/08)
 *  
 * @param d 
 */
export function formatDateUtil( d : Date, 
                                now : Date = null ) : string{
  const terms = {
    now : 'ahora (${H}:${M})',
    nextHour : 'dentro de una hora (${H}:${M})',
    anHourAgo : 'hace una hora (${H}:${M})',
    twoHours : 'dentro de dos horas (${H}:${M})', 
    twoHoursAgo : 'hace dos horas (${H}:${M})', 
    threeHours : 'dentro de tres horas (${H}:${M})', 
    threeHoursAgo : 'hace tres horas (${H}:${M})', 
    fourHours : 'dentro de cuatro horas (${H}:${M})', 
    fourHoursAgo : 'hace cuatro horas (${H}:${M})',
    catchAllLessOneDay : '${H}:${M}',
    tomorrow : 'mañana (${d}/${m})',
    yesterday : 'ayer (${d}/${m})',
    inTwoDays : 'pasado mañana (${d}/${m})',
    twoDaysAgo : 'antes de ayer (${d}/${m})', 
    nextWeek: '${a} de la próxima semana (${d}/${m})', 
    prevWeek: '${a} de la semana pasada (${d}/${m})',
    inTwoWeeks: '${a} dentro de dos semanas (${d}/${m})',
    twoWeeksAgo : '${a} de hace dos semanas (${d}/${m})',
    catchAll : '${d}/${m}', 
    catchAllWithYear : '${d}/${m}/${Y}'
  };
  let dateInfo = {
    d : d, 
    now : now?now:new Date(),
    dTrunc : truncateDate( d ), 
    nowTrunc : truncateDate( now ), 
    hoursDiff : null,
    daysDiff : null, 
    hoursDiffTrunc : null, 
    daysDiffTrunc : null, 
    weeksDiffTrunc: null
  };
  dateInfo.hoursDiff = (d.getTime() - now.getTime())  / (1000 * 3600);
  dateInfo.daysDiff = (d.getTime() - now.getTime()) / (1000 * 3600 * 24);
  dateInfo.hoursDiffTrunc = (dateInfo.dTrunc.getTime() - dateInfo.nowTrunc.getTime()) 
                          / (1000 * 3600);
  dateInfo.daysDiffTrunc = (dateInfo.dTrunc.getTime() - dateInfo.nowTrunc.getTime()) 
                          / (1000 * 3600 * 24);
  dateInfo.weeksDiffTrunc = weeksDiff( dateInfo.d, dateInfo.nowTrunc );

  if( differenceIsByHours( dateInfo ) ){
    if( isHoursAgo( dateInfo, 0 ) )
      return resolveString( terms.now, dateInfo );
    if( isHoursAgo( dateInfo, -1) )
      return resolveString( terms.anHourAgo, dateInfo );
    if( isHoursAgo( dateInfo, 1) )
      return resolveString( terms.nextHour, dateInfo );
    if( isHoursAgo( dateInfo, -2) )
      return resolveString( terms.twoHoursAgo, dateInfo );
    if( isHoursAgo( dateInfo, 2) )
      return resolveString( terms.twoHours, dateInfo );
    if( isHoursAgo( dateInfo, -3) )
      return resolveString( terms.threeHoursAgo, dateInfo );
    if( isHoursAgo( dateInfo, 3) )
      return resolveString( terms.threeHours, dateInfo );
    if( isHoursAgo( dateInfo, -4) )
      return resolveString( terms.fourHoursAgo, dateInfo );
    if( isHoursAgo( dateInfo, 4) )
      return resolveString( terms.fourHours, dateInfo );
    return resolveString( terms.catchAllLessOneDay, dateInfo );
  }
  if( isDaysAgo( dateInfo, -1 ) ){
    return resolveString( terms.yesterday, dateInfo );
  }
  if( isDaysAgo( dateInfo, 1 ) ){
    return resolveString( terms.tomorrow, dateInfo );
  }
  if( isDaysAgo( dateInfo, -2 ) ){
    return resolveString( terms.twoDaysAgo, dateInfo );
  }
  if( isDaysAgo( dateInfo, 2 ) ){
    return resolveString( terms.inTwoDays, dateInfo );
  }
  if( isWeeksAgo( dateInfo, 1 ) ){
    return resolveString( terms.nextWeek, dateInfo );
  }
  if( isWeeksAgo( dateInfo, -1 ) ){
    return resolveString( terms.prevWeek, dateInfo );
  }
  if( isWeeksAgo( dateInfo, 2 ) ){
    return resolveString( terms.inTwoWeeks, dateInfo );
  }
  if( isWeeksAgo( dateInfo, -2 ) ){
    return resolveString( terms.twoWeeksAgo, dateInfo );
  }
  if( dateInfo.d.getFullYear() === dateInfo.now.getFullYear() )
    return resolveString( terms.catchAll, dateInfo );
  else
    return resolveString( terms.catchAllWithYear, dateInfo );
}

function differenceIsByHours( dateInfo : any ){
  return -1 < dateInfo.daysDiff && dateInfo.daysDiff < 1;
}

function isHoursAgo( dateInfo : any, hours : number ){
  return hours - 0.16 <= dateInfo.hoursDiff
        && dateInfo.hoursDiff <= hours + 0.16;
}

function isDaysAgo( dateInfo : any, days : number ){
  return dateInfo.daysDiffTrunc === days; 
}

function isWeeksAgo( dateInfo: any, weeks : number ){
  return dateInfo.weeksDiffTrunc === weeks;
}

/**
 * Replacements: 
 * 
 * ${H} - hour as 24 hour format
 * ${M} - minutes, zero padded (00-59)
 * ${a} - day of the week. sunday = 0, monday = 1...
 * ${d} - actual day, zero padded (01-31)
 * ${m} - actual month, zero padded (01-12)
 * ${Y} - full year (2022)
 * @param term 
 * @param dateInfo 
 */
function resolveString( term : string, dateInfo : any ) : string {
  const weekDays = ['domingo',
  'lunes', 
  'martes', 
  'miércoles', 
  'jueves', 
  'viernes', 
  'sábado'];

  let result = term; 
  result = result.replaceAll( '${Y}', 
                          (dateInfo.d.getFullYear()).toString() );
  result = result.replaceAll( '${m}', 
                          (dateInfo.d.getMonth()+1).toString().padStart( 2, "0" ) );
  result = result.replaceAll( '${d}', 
                          (dateInfo.d.getDate()).toString().padStart( 2, "0" ) );
  // day of the week
  result = result.replaceAll( '${a}', 
                          weekDays[ dateInfo.d.getDay() ] );
  result = result.replaceAll( '${H}', 
                          dateInfo.d.getHours().toString().padStart( 2, "0") );
  result = result.replaceAll( '${M}', 
                          dateInfo.d.getMinutes().toString().padStart( 2, "0") );
  return result;
}

/**
 * Given two dates, return the difference in weeks between them. 
 * 
 * @param weekInfo1 
 * @param weekInfo2 
 * @returns 
 */
function weeksDiff( d1 : Date, d2 : Date ){
  let weekInfo1 = getWeekNumber( d1 ); 
  let weekInfo2 = getWeekNumber( d2 );
  if( weekInfo1[0] === weekInfo2[0] ){
    return weekInfo1[1] - weekInfo2[1];
  }else{
    let differenceInYears = weekInfo1[0] - weekInfo2[0];
    return ( (365 * differenceInYears) / 7) + (weekInfo1[1] - weekInfo2[1]);
  }
}

function truncateDate( d : Date ){
  return new Date( d.getFullYear(), 
                   d.getMonth(), 
                   d.getDate() );
}

/** 
 * For a given date, get the ISO week number
 *
 * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 * Based on information at:
 *
 *    THIS PAGE (DOMAIN EVEN) DOESN'T EXIST ANYMORE UNFORTUNATELY
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber( d : Date ) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}




