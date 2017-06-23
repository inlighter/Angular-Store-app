import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocationService } from './location.service';
import { StorageService } from '../storage/storage.service';


@Injectable()
export class LocationResolver implements Resolve<any> {    
    
    stores: any;
    addresses: string[];
    constructor(private locationService: LocationService, private storageService: StorageService) {
        this.stores = this.storageService.getStores();
        this.addresses = this.getListAddresses(this.stores);
    }

    getListAddresses(stores): string[] {
        const addresses = [];
        for (let i = 0; i < stores.length; i++) {
            let temp = stores[i].address;
            temp = temp.replace(' ', '+');
            addresses.push(temp);
        }
        return addresses;
    }

    resolve() {
        const locations = [];
        this.addresses.forEach(ad => {
            this.locationService.getLocation(ad).then(res => {
                locations.push(res);
            });
        });
        
        return locations;

    }
}