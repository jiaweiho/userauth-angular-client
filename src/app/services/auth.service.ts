import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models/user';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private userSubject: BehaviorSubject<User | undefined>;
    public user: Observable<User | undefined>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        const userItem = localStorage.getItem('user');
        let userObj = userItem ? JSON.parse(userItem) : null;
        this.userSubject = new BehaviorSubject<User | undefined>(userObj);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | undefined {
        return this.userSubject.value;
    }

    public login(username: string, password: string): Observable<User> {
        console.log('Login authservice...');
        
        return this.http.post<any>(`localhost:8080/api/v1/users/login`, { username, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                console.log(JSON.stringify(user));
                
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.user = user;
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(undefined);
        this.router.navigate(['/login']);
    }
 
}
