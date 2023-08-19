export interface CartItem {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
    size: number;
    quantity: number;
  }