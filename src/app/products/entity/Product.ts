import ProductType from "../../product_type/entity/ProductType";

class Product {
  public productCode: number;
  public productTypeCode: ProductType;
  public productName: string;
  public productPrice: number;

  constructor(proc: number, prot: ProductType, pron: string, prop: number) {
    this.productCode = proc;
    this.productTypeCode = prot;
    this.productName = pron;
    this.productPrice = prop;
  }
}

export default Product;
