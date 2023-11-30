import { CanMatchFn } from '@angular/router';

export const noteResolveGuard: CanMatchFn = (route, segments) => {
  return true;
};
