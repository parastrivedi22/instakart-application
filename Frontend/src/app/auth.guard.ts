import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state,) => {

  let isSellerLogedIn = localStorage.getItem("isSellerLogedIn");
  if (isSellerLogedIn == 'true') {
    return true;
  }

  return false;
};
