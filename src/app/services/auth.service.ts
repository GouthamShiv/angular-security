import { filter, shareReplay, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../model/user";
import * as auth0 from "auth0-js";
import { Router } from "@angular/router";
import * as moment from "moment";

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: "",
};

const AUTH_CONFIG = {
  clientID: "17PRmLy7GATrHxJbX50aDq4J7pV7RejT",
  domain: "webstash.us.auth0.com",
};

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: "token id_token",
    redirectUri: "https://localhost:4200/lessons",
    scope: "openid email",
  });

  subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!undefined));

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.userInfo();
    }
  }

  login() {
    this.auth0.authorize();
  }

  signUp() {
    this.auth0.authorize({
      mode: "signUp",
    });
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(["/lessons"]);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  userInfo() {
    const _self = this;
    _self.http
      .put<User>("/api/userinfo", null)
      .pipe(
        shareReplay(),
        tap((user) => _self.subject.next(user))
      )
      .subscribe();
  }

  retrieveAuthInfo(): void {
    const _self = this;
    if (window.location.hash) {
      _self.auth0.parseHash(
        { hash: window.location.hash },
        function (err, authResult) {
          if (err) {
            console.log("Could not parse the hash", err.message);
            return;
          } else if (authResult && authResult.idToken) {
            window.location.hash = "";
            console.log("Authentication successful, authResult: ", authResult);
            _self.setSession(authResult);
            _self.userInfo();
          }
        }
      );
    }
  }

  setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, "seconds");
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
}
