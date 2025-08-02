import Product from "../domain/entity/product";

export default class ProductService {
    /* OBS: Lembrar que em prod não faz sentido isso, apenas para demonstração */
    static increasePrices(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.changePrice(product.price * (percentage / 100) + product.price);
        });
    }
}