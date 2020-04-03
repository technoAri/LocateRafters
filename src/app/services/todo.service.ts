import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
    // id?: string;
    rafterName: string;
    currentCountry: string;
    // createdAt: number;
}

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private todosCollection: AngularFirestoreCollection<Todo>;

    private todos: Observable<Todo[]>;

    constructor(db: AngularFirestore) {
        this.todosCollection = db.collection<Todo>('todos');

        this.todos = this.todosCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const name = a.payload.doc.id;
                    return { name, ...data };
                });
            })
        );
    }

    getTodos() {
        return this.todos;
    }

    getTodo(name) {
        return this.todosCollection.doc<Todo>(name).valueChanges();
    }

    updateTodo(todo: Todo, name: string) {
        return this.todosCollection.doc(name).update(todo);
    }

    addTodo(todo: Todo) {
        return this.todosCollection.add(name);
    }

    removeTodo(name) {
        return this.todosCollection.doc(name).delete();
    }
}