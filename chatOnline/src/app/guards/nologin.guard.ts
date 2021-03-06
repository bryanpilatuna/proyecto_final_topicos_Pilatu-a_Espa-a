import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {  } from "../guards/auth.guard";
import {  map} from "rxjs/operators";

import {  AngularFireAuth} from "@angular/fire/auth";
import { auth } from 'firebase';
import { isNullOrUndefined } from 'util';

import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth,
    private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.AFauth.authState.pipe(map(auth=>{

        if(isNullOrUndefined(auth)){
          
          return true;
        }else{
          this.router.navigate(['/home']);
          return false;
          
        }
           // console.log(auth);
           // return false;
    
        }))
    }
  
}
