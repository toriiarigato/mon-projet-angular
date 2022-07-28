import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();
  private appareils = [];

  constructor(private httpClient: HttpClient) {
  }

  emiteAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
        (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll(){
    for(let appareil of this.appareils){
        appareil.status = 'allumé'
    }
    this.emiteAppareilSubject();
  }
  switchOffAll(){
    for (let appareil of this.appareils){
      appareil.status = 'éteint'
    }
    this.emiteAppareilSubject()
  }

  swithcOnOne(index: number){
    this.appareils[index].status = 'allumé';
    this.emiteAppareilSubject();
  }
  switchOffOne(index: number){
    this.appareils[index].status = 'éteint';
    this.emiteAppareilSubject();
  }

  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length -1)].id +1;
    this.appareils.push(appareilObject);
    this.emiteAppareilSubject();
  }

  saveAppareilsToServer(){
    this.httpClient
      .put('https://mon-projet-angular-cb4e9-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('enregistrement terminé');
        },
        (error) => {
          console.log('Erreur de sauvegarde !' + error)
        }
      )
  }

  getAppareilFromServer(){
    this.httpClient
      .get<any[]>('https://mon-projet-angular-cb4e9-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emiteAppareilSubject();
        },
        (error) => {
          console.log('Erreur de chargement');
        }
      )
  }

}
