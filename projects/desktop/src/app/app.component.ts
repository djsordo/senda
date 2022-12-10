import { Component } from '@angular/core';

import { TestService } from 'projects/desktop/src/app/service/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desktop';

  constructor( private TestService test ){

  }

}
