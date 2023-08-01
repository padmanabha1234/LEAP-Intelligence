import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { stateNames } from 'src/app/core/config/StateCodes';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import * as config from 'src/assets/config/ui_config.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  loginObj: any;
  NVSK: boolean = true;


  otpForm!: FormGroup;
  passwordForm!: FormGroup
  stateName: any

  wrongOtp: boolean = false;
  public passwordMatch: boolean = false;
  tempSecret: string = '';
  error: boolean = false;
  roletype

  userStatus = ''
  qrcode
  adminUserId = '';
  otpUrl

  userName = ''
  errorMsg
  LoginForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  tempUserId: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private readonly _authenticationService: AuthenticationService) {
    // if (this._authenticationService.isUserLoggedIn()) {
    //   this.router.navigate(['/home']);
    // }
    // this.router.navigate(['/home']);
  }

  async ngOnInit(): Promise<void> {
    let uiConfig = config;
    this.loginObj = uiConfig['loginObj'];

    this.isLoggedIn = await this._authenticationService.isUserLoggedIn();

    type userRoles = Array<{ id: number, text: string }>

    if (this.isLoggedIn) {
      this.router.navigate(['/leap'])
    }

    if (environment.config === 'VSK') {
      this.NVSK = false


      let names: any = stateNames;
      names.every((state: any) => {
        if (state.stateCode == environment.stateCode) {
          this.stateName = state.stateName;
          return false;
        }
        return true;
      });


      // this.passwordForm = this.formBuilder.group({
      //   username: ['', Validators.required],
      //   newPassword: ['', Validators.required],
      //   cnfpass: ['', Validators.required]
      // })

    }
    else {
      this.stateName = 'India'
    }

  }

  onSubmit() {
    if (this.LoginForm.valid) {
      let data = {
        username: this.LoginForm.controls.userId.value,
        password: this.LoginForm.controls.password.value
      }
      this._authenticationService.login(data).subscribe((res: any) => {
        const token = res.access_token
        const refreshToken = res.refresh_token
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refreshToken)
        // localStorage.setItem('userName', res.username)
        // localStorage.setItem('user_id', res.userId)
        this._authenticationService.startRefreshTokenTimer();
        this.router.navigate(['/leap']);
      },
        err => {
          this.error = true;
        })
    }
    else {
      this.error = true
    }
    

  }



}
