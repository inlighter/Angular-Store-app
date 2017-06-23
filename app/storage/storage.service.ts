import { Injectable } from '@angular/core';
import { STORES } from '../storage/storage';

@Injectable()
export class StorageService {
    stores = STORES;
    constructor() {        
        this.updateStorage();
    }


    updateStorage(): void {        
        sessionStorage.setItem('List of stores', JSON.stringify(this.stores));
    }

    updateStorageOnDrop(stores): void {        
        this.stores = JSON.parse(stores);
        this.updateStorage();
    }

    addStore(store): void {
        
        this.stores.push(store);         
        this.updateStorage();
        
    }

    isStoreExist(store): boolean {
        return !!this.stores.find(shop => shop.id === store.id);
    }

    removeStore(store): void {

        this.getStores();
        
        this.stores = this.stores.filter(shop => shop.id !== store.id);
        
        this.updateStorage();
        
        
    }

    clearStorage(): any[] {
        this.stores.length = 0;
        sessionStorage.removeItem('list of stores');
        return this.stores;
    }

    getStores(): any[] {
        return this.stores = JSON.parse(sessionStorage.getItem('List of stores')) || [];
    }

    getStoreById(id: number): any {
        return this.stores.find(val => val.id === id);
    }

    getMaxStoreId(): number {
        const temp = this.stores.slice();
        temp.sort((a, b) => b.id - a.id);
        return temp[0].id;
    }

    replaceStore(store): void {
        const storeIndex = this.stores.map(val => val.name).indexOf(store.name);
        if (storeIndex !== -1) {
            this.stores[storeIndex] = store;
        }
        this.updateStorage();
    }

    rearrangeStores(eId, eIndx, sId, sIndx) {
        
        if (sIndx === undefined) {
            
            let count = 0;
            const arrLen = this.stores.length;
            for (let i = eIndx; i < arrLen - 1; i++) {
                
                this.stores[i].id -= 1;
                count++;
            }
            this.stores[this.stores.length-1].id += count; 
        } else if (sIndx > eIndx) {
            let count = 0;
            for (let i = eIndx; i < sIndx - 1; i++) {
                this.stores[i].id -= 1;
                count++;
            }
            this.stores[sIndx-1].id += count; 
        } else if (sIndx < eIndx) {
            let count = 0;
            for (let i = sIndx + 1; i <= eIndx; i++) {
                this.stores[i].id += 1;
                count++;
            }
            this.stores[sIndx].id -= count; 
        }
        this.updateStorage();
        
        
         return this.stores;
    }



}
