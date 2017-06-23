import { Component, Input } from '@angular/core';
import { LocationService } from './location.service';

@Component({
    selector: 'app-map', 
    template: `
        <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
            <agm-marker *ngFor="let location of locations" [latitude]="location.lat" [longitude]="location.lng"></agm-marker>
        </agm-map>
    `,
    styles: [`
        agm-map {
            height: 400px;
            margin-bottom: 50px;
            width: 100%;
        }
    `]
})

export class DisplayMapComponent {
    
    lat = 39.958;
    lng = -75.166;
    zoom = 12;
    location: {lat: number, lng: number};

    
    @Input() locations: {lat: number, lng: number}[];
    constructor(private locationService: LocationService) {

    }

     
      
}
