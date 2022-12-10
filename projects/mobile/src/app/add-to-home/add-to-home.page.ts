import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-home',
  templateUrl: './add-to-home.page.html',
  styleUrls: ['./add-to-home.page.scss'],
})
export class AddToHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  /**
   * 
   * @returns https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
   */
   getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "windows-phone";
    }

    if (/android/i.test(userAgent)) {
      return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "ios";
    }

    return "unknown";
  }

}
