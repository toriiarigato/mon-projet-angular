import {Subject} from "rxjs";
import {User} from "../models/user.models";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()

export class UserService {
  private users: User[] = [];
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) {
  }

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }

  saveUsersToServer(){
    this.httpClient
      .put('https://mon-projet-angular-cb4e9-default-rtdb.europe-west1.firebasedatabase.app/users.json', this.users)
      .subscribe(
        () => {
          console.log('enregistrement terminé');
        },
        (error) => {
          console.log('Erreur de sauvegarde !' + error)
        }
      )
  }

  getUsersFromServer(){
    this.httpClient
      .get<User[]>('https://mon-projet-angular-cb4e9-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe(
        (response) => {
          this.users = response;
          this.emitUsers();
        },
        (error) => {
          console.log('Erreur de chargement');
        }
      )
  }
}
