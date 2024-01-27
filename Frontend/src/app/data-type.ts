export interface Signup {
    id: number;
    userType: string;
    fullName: string;
    userEmail: string;
    userPassword: string;

    // userAddress: String;
}
export interface Login {
    userEmail: string;
    userPassword: string;
    userType: string;
}


export interface Product {
    id: number;
    productName: string;
    productPrice: number;
    productCategory: string;
    productDescription: string;
    productImageUrl: string;
    productId: number;
    productQuantity: number;
    productInStock: number;
    sellerId: number;
}
export interface Cart {
    id: number;
    sellerId: number;
    buyerId: number
    productName: string;
    productPrice: number;
    productCategory: string;
    productDescription: string;
    productImageUrl: string;
    productQuantity: number;
    // userId: Number | undefined;
    productId: number;
    productInStock: number;
}


