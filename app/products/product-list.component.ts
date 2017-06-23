import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage/storage.service';



@Component({ 
    
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    
    stores: any;
    store: any;
    id: number;
    products: {name: string, description: string}[];  
    

    constructor(private route: ActivatedRoute, private storageService: StorageService) {

    }
    ngOnInit() {
        this.stores = this.storageService.getStores();
        this.id = +this.route.snapshot.params['id'];
        this.getStoreById(this.id);
        this.products = this.store.products;
    }

    getStoreById(id: number): any {
        this.store = this.stores.find(function(store) {
        return store.id === id;
    });
    }

}