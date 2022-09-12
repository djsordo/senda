import { TestBed } from '@angular/core/testing';


import { formatDateUtil } from './string-util';


fdescribe( 'string-util-format-date.spec', () => {

  beforeAll( () =>  {
  });

  it( 'distancia de uno a dos días', () =>  {
    let twoDaysAgo = new Date( 2022, 7, 1 );
    let yesterday = new Date( 2022, 7, 2 );
    let now = new Date( 2022, 7 /*agosto*/, 3 );
    let tomorrow = new Date( 2022, 7, 4 );
    let inTwoDays = new Date( 2022, 7, 5 );
    console.log( 'now: ', now );
    console.log( 'yesterday: ', yesterday ); 
    console.log( 'tomorrow: ', tomorrow ); 
    expect( formatDateUtil( tomorrow, now ) ).toEqual( 'mañana (04/08)');
    expect( formatDateUtil( yesterday, now ) ).toEqual( 'ayer (02/08)' );
    expect( formatDateUtil( twoDaysAgo, now ) ).toEqual( 'antes de ayer (01/08)');
    expect( formatDateUtil( inTwoDays, now ) ).toEqual( 'pasado mañana (05/08)'); 
  });

  it( 'distancia de una a dos semanas', () =>  {
    let twoWeeksAgo = new Date( 2022, 6 /* julio */, 20 );
    let aWeekAgo = new Date( 2022, 6, 27 );
    let now = new Date( 2022, 7 /*agosto*/, 3 );
    let nextWeek = new Date( 2022, 7, 10 );
    let inTwoWeeks = new Date( 2022, 7, 17 );
    console.log( 'now: ', now );
    console.log( 'aWeekAgo: ', aWeekAgo ); 
    console.log( 'nextWeek: ', nextWeek ); 
    expect( formatDateUtil( nextWeek, now ) ).toEqual( 'miércoles de la próxima semana (10/08)');
    expect( formatDateUtil( aWeekAgo, now ) ).toEqual( 'miércoles de la semana pasada (27/07)' );
    expect( formatDateUtil( twoWeeksAgo, now ) ).toEqual( 'miércoles de hace dos semanas (20/07)');
    expect( formatDateUtil( inTwoWeeks, now ) ).toEqual( 'miércoles dentro de dos semanas (17/08)'); 
  });

  it( 'distancia de una a dos semanas flexible', () =>  {
    let twoWeeksAgo = new Date( 2022, 6 /* julio */, 18 );
    let aWeekAgo = new Date( 2022, 6, 31 );
    let now = new Date( 2022, 7 /*agosto*/, 3 );
    let nextWeek = new Date( 2022, 7, 8 );
    let inTwoWeeks = new Date( 2022, 7, 20 );
    console.log( 'now: ', now );
    console.log( 'aWeekAgo: ', aWeekAgo ); 
    console.log( 'nextWeek: ', nextWeek ); 
    expect( formatDateUtil( nextWeek, now ) ).toEqual( 'lunes de la próxima semana (08/08)');
    expect( formatDateUtil( aWeekAgo, now ) ).toEqual( 'domingo de la semana pasada (31/07)' );
    expect( formatDateUtil( twoWeeksAgo, now ) ).toEqual( 'lunes de hace dos semanas (18/07)');
    expect( formatDateUtil( inTwoWeeks, now ) ).toEqual( 'sábado dentro de dos semanas (20/08)'); 
  });

  it( 'distancia de horas', () => {
    let anHourAgo = new Date( 2022, 7 /*agosto*/, 3, 16, 5 );
    let almostNow = new Date( 2022, 7 /*agosto*/, 3, 17, 5 );
    let now = new Date( 2022, 7 /*agosto*/, 3, 17, 0 );
    let nextHour = new Date( 2022, 7 /*agosto*/, 3, 17, 52 );
    let threeHours = new Date( 2022, 7 /*agosto*/, 3, 19, 55 );
    let threeHoursAgo = new Date( 2022, 7 /*agosto*/, 3, 14, 0 );
    expect( formatDateUtil( almostNow, now ) ).toEqual( 'ahora (17:05)');
    expect( formatDateUtil( anHourAgo, now ) ).toEqual( 'hace una hora (16:05)');
    expect( formatDateUtil( nextHour, now ) ).toEqual( 'dentro de una hora (17:52)');
    expect( formatDateUtil( threeHoursAgo, now ) ).toEqual( 'hace tres horas (14:00)');
    expect( formatDateUtil( threeHours, now ) ).toEqual( 'dentro de tres horas (19:55)');
  });

});


