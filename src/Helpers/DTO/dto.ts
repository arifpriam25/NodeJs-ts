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
    balance?:number;
    verified?: boolean;
    active?: boolean;
    token?: string;
    refreshToken?: string;
}


export interface RegisterUser {
    name:string;
    email:string;   
    password:string;
    confirmPassword:string;
    roleId:string;
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

export interface ShowUser {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    balance?:number;
    verified?: boolean;
    active?: boolean;
}


export interface UserDetail {
    id: number;
    name: string;
    email: string;
    roleId: number;
    password: string;
    accessToken: string | null;
    balance: number;
    verified: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    Role: {
      id: number;
      roleName: string;
    };
  }