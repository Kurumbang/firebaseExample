import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';

@Injectable()

export class FireDataBaseService {
    firebaseList: FirebaseListObservable<any[]>;
    firebaseObject: FirebaseObjectObservable<any>;

    private itemObservable: FirebaseObjectObservable<any[]>;

    constructor(private af: AngularFire) { }

    createNode(node: string) {
        console.log("createNode:", node);
        this.itemObservable = this.af.database.object(node);
    }

    getAllPosts(): Observable<any> {
        return this.af.database.list('/posts');
    }

    createNodeList(node: string) {
        console.log("createNode:", node);
        this.firebaseList = this.af.database.list(node);
    }



    setData(data) {
        this.itemObservable.set(data);
    }

    pushData(data) {
        this.firebaseList.push(data).then(response => console.log("KEY: ", response.getKey()));
    }




}