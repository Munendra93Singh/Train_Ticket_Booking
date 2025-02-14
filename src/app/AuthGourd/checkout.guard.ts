import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const rouetr = inject(Router);

  const isLogged = localStorage.getItem("trainApp");
  if(isLogged != null)
  {
    return true;
  }else{
    rouetr.navigateByUrl('')
    return false;
  }
};
