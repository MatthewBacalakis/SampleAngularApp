import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';
import { SelectedCharacterData } from '../selectedCharacterData';
import { Film } from '../types/film';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailsResolver implements Resolve<any> {
    constructor(private selectedCharacterData: SelectedCharacterData,
                private router: Router,
                private http: HttpClient
                ) { }

     resolve() {
        if (!this.selectedCharacterData.character) {
            this.router.navigateByUrl('/characters');
            return;
        }

        let promises: Promise<Film>[] = [];

        this.selectedCharacterData.character.films.forEach(movieUrl => {
            promises.push(this.http.get<Film>(movieUrl).toPromise());
        });

        return Promise.all(promises);
    }
}