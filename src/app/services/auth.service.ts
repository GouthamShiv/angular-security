import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user";

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: "",
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$.map((user) => !!user.id);

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(
    (isLoggedIn) => !isLoggedIn
  );

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): void {}
}
