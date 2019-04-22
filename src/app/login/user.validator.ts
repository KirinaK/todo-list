import { LoginPageService } from '../shared/services/login/login-page.service';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const loginAsyncValidator = (loginService: LoginPageService, time: number = 500) => {
  return (name: FormControl) => {
    return timer(time).pipe(
      switchMap(() => loginService.checkLogin(name.value)),
      map(res => {
        if (res.length !== 0) {
          return {loginExist: true};
        }
      })
    );
  };
};

