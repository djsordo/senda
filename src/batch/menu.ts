
import * as readline from 'readline';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


export class Option{
  value : number;
  name : string;
  action : () => Promise<any>; 
};

export async function doNothing(){
  return new Promise( (resolve) => 
      {
          console.log('en construccion');
          resolve( null );
      });
}

export class Menu {

  constructor( private title : string, 
               private options: Option[] ){}

  public async show(){
    let selectedOption = null;
    while( selectedOption === null ){
      await this.showMenuWaitForAnswer( )
        .then( (answer) => {
          //selectedOption = answer;
          selectedOption = new Promise( (callMeWhenFinished) => {
              answer.action()
                .then( (val) => { callMeWhenFinished( val ) } );
          })
        } )
        .catch( (answer) => { 
          console.log( `Opción incorrecta (${answer})` );
          console.log( "" );} 
        );
        }
    return selectedOption;
  }

  private async showMenuWaitForAnswer( ) {
    return new Promise( (resolve : ( val : Option ) => void,
                        reject : ( val : string ) => void ) => {
          this.showMenu( );
          rl.question( 'Selección> ', (answer : string) =>
                {
                  let selectedOption = this.options.find( (val) => val.value === parseInt(answer) );
                  if( selectedOption )
                    resolve( selectedOption );
                  else
                    reject( answer );
                });
      });
  }

  private showMenu( ) {
    console.log( '' );
    console.log( this.title );
    console.log( '' );
    for( let option of this.options ) {
      console.log( `${option.value} - ${option.name}`)
    }
    console.log( '' );
  }
  

}