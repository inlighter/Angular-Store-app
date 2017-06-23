import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';




 

@Component({ 
    
    template: `
    <div class="row">
        <div class="col">
            <app-map [locations]="locations"></app-map>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-md-10">
                <ul class="list-unstyled list-group" [dragula]='"bag-one"' [dragulaModel]='stores'>
                    <single-store [id]="store.id" *ngFor="let store of stores" [store]="store"></single-store>
                </ul>
            </div>
        </div>
        
    </div>
    
    
    `,
    styleUrls: ['./dragula.css']
})

export class StoreListComponent implements OnInit {
     stores: any;
     locations: {lat: number, lng: number}[];
     
     constructor(private storageService: StorageService, private route: ActivatedRoute, private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
            
        });
     }

     ngOnInit() {
         this.stores = this.storageService.getStores();
         this.locations = this.route.snapshot.data['locations'];
         
     }

     onDrop(args) {
        // const [el, target, source, sibling] = args;
        
        // const elId = el.attributes.id.nodeValue;
        //  let siblingId;
        //  let siblingIndex;
        // if (sibling !== null) {
        //     siblingId = sibling.attributes.id.nodeValue;
        // }
        
        const storesAfterDrop = JSON.stringify(this.stores);
        
        // this.stores = this.storageService.getStores();

        // const arrStoresId = this.stores.map(shop => shop.id);
        // const elIndex = arrStoresId.indexOf(+elId);
        
        // if (siblingId) {
        //     siblingIndex = arrStoresId.indexOf(+siblingId);
        // }
        
        
        this.storageService.updateStorageOnDrop(storesAfterDrop);
        // this.stores = this.storageService.rearrangeStores(elId, elIndex, siblingId, siblingIndex);
        
     }

     
}




