export interface Store {
    id?: number;
    name: string;
    address: string;
    mode?: string;
    products?: [{
        name?: string;
        description?: string;
    }]
}
