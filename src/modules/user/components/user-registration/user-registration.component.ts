import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  disnponible : boolean ;

  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }



  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      this.model.confirmPassword=""
      return
    }

    // TODO Enregistrer l'utilisateur via le UserService

     this.userService.register(this.model.username, this.model.password)

    this.goToLogin();
  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
     this.router.navigate(['/splash/login']);
  }

      // TODO verification si le username est disponible
    async isExistUserName(): Promise<boolean> {
      // this.disnponible = false;
    if (this.model.username.length > 0) {
      if (  await this.userService.checkUserName(this.model.username)) {
     this.disnponible = false;
          return true
     }
     this.disnponible = true;
     return false
    }
    return false
   }


}
