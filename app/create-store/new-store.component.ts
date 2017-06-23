 import { Component, OnInit } from '@angular/core';
 import { StorageService } from '../storage/storage.service';
 import { ActivatedRoute } from '@angular/router';
 import { Router } from '@angular/router';


 @Component({
     templateUrl: './new-store.component.html',
     styleUrls: ['./new-store.component.css']
 })

 export class NewStoreComponent implements OnInit {
     currentStore = {
                id: 0,
                name: '',
                address: '',
                mode: '',
                products: []
            }
     // savedStore: any;

     activeMode = true;
     productName: string;
     productDescription: string;
     

     constructor(private router: Router, private storageService: StorageService, private route: ActivatedRoute) {

     }

     ngOnInit() {
        const id: number = +this.route.snapshot.params['id'];
        if (id) {
            this.currentStore = this.storageService.getStoreById(id);
            this.activeMode = false;
        }
     }

     save(store): void {
        if (this.currentStore.name.trim() && this.currentStore.address.trim()) {
            const maxStoreId = this.storageService.getMaxStoreId();
            if (!this.storageService.isStoreExist(store)) {

                store.id = maxStoreId + 1;                       
                this.storageService.addStore(store);
                this.currentStore = store;
            } else {
                this.storageService.replaceStore(this.currentStore); 
            }
            
            this.activeMode = !this.activeMode;
        }
        
         
     }
     

     addProduct(): void {
         const isDuplicate = !!this.currentStore.products.find(val => val.name === this.productName);
         
         if (!isDuplicate) {
            if (this.productName.trim() && this.productDescription.trim()) {
                this.currentStore.products.unshift({
                name: this.productName,
                description: this.productDescription
            });
            } 
        } else {
            const productIndex = this.currentStore.products.map(val => val.name).indexOf(this.productName);
            this.currentStore.products[productIndex].description = this.productDescription;
            this.storageService.replaceStore(this.currentStore);
            
        } 
        this.productDescription = undefined;
        this.productName = undefined;
     }

     removeProduct(product: {name: string, description: string}): void {
        
        this.currentStore.products = this.currentStore.products.filter(prod => prod.name !== product.name);
        this.storageService.replaceStore(this.currentStore);
        this.productDescription = undefined;
        this.productName = undefined;
     }

     editProduct(product: {name: string, description: string}): void {
        this.productName = product.name;
        this.productDescription = product.description;
     }

     editStore(): void {
        this.activeMode = !this.activeMode;
     }

     deleteStore(store): void {
        this.storageService.removeStore(store);
        this.currentStore =  {
                id: 0,
                name: '',
                address: '',
                mode: '',
                products: []

            }
        this.activeMode = !this.activeMode;
     
    
    }
        

 }