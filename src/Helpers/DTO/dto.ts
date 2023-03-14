export interface BookData {
    id?: number;
    title?: string;
    author?: string;
    publisher?: string;
    year?: number;
    price?: number;
    quantity?: number;
    active?: boolean;
}

export interface UserData {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    roleId?: number;
    balance?: number;
    verified?: boolean;
    active?: boolean;
    token?: string;
    refreshToken?: string;
}

export interface InsertBook {
    title?: string;
    author?: string;
    publisher?: string;
    year?: number;
    price?: number;
    quantity?: number;
    active?: boolean;
}


//FIX

export interface Token {
    token: string;
    refreshToken:string;
}
export interface DataToken {
    id: number;
    name: string;
    email: string;
    roleId: number;
    verified: boolean;
    active: boolean;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: number;
}

export interface ShowUser {
    id: number;
    name: string;
    email: string;
    role: string;
    balance: number;
    verified: boolean;
    active: boolean;
}

export interface OrdersData {
    idOrders:number;
    nameBuyer:string;
    bookName:string;
    quantity:number;
    totalPrice:number;
    date:Date;
}