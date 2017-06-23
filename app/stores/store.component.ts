import { Component, Input } from '@angular/core';

@Component({
    selector: 'single-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})

export class StoreComponent {
    @Input() store: any;
    

}


