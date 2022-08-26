
import * as readline from 'readline';


export class Option{
  value : number;
  name : string;
  action : ( arg? : any ) => Promise<any>;
  arg? : any
};

export async function doNothing(){
  return new Promise( (resolve) => 
      {
          console.log('en construccion');
          resolve( null );
      });
}


export class Interfaz {

  private rl : readline.Interface;

  constructor(){
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public writeLine( line? : string ){
    if( line ) 
      this.rl.write( line );
    this.rl.write( '\n' );
  }

  async pickupInt( prompt : string ){
    return new Promise( (resolve) => {
      this.rl.question( `${prompt}> `, (answer : string) => {
        let intVal = parseInt( answer ); 
        if( isNaN( intVal ) ){
          this.writeLine( 'Opción incorrecta, debe ser un valor numérico' );
          resolve( this.pickupInt( prompt ) );
        }else
          resolve( intVal );
      });
    });
  }

  public async menu( title : string, options : Option[] ){
    let selectedOption = null;
    while( selectedOption === null ){
      await this.showMenuWaitForAnswer( title, options )
        .then( (answer) => {
          selectedOption = new Promise( (resolve) => {
              if( answer?.arg )
                answer.action( answer.arg )
                  .then( (val) => { resolve( val ) } );
              else
                answer.action()
                  .then( (val) => { resolve( val ) } );
          })
        } )
        .catch( (answer) => { 
          console.log( `Opción incorrecta (${answer})` );
          console.log( "" );} 
        );
        }
    return selectedOption;
  }

  private async showMenuWaitForAnswer( title : string, options : Option[] ) {
    return new Promise( (resolve : ( val : Option ) => void) => {
          this.showMenu( title, options );
          this.pickupInt( 'Selección' )
              .then( (userValue) => {
                resolve( options.find( (val) => { return val.value === userValue }) );
                });
      });
  }

  private showMenu( title : string, options : Option[]  ) {
    this.writeLine();
    this.writeLine( title ); 
    this.writeLine();
    for( let option of options ) {
      this.writeLine( `${option.value} - ${option.name}`)
    }
    this.writeLine( );
  }
  

  public close(){
    this.rl.close();
  }

}