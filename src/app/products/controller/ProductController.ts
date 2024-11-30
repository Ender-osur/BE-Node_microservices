import { Request, Response } from "express";
import Product from "../entity/Product";
import DaoProduct from "../dao/DaoProduct";
import ProductType from "../../product_type/entity/ProductType";

class ProductController extends DaoProduct {
  public createNewProduct(req: Request, res: Response): void {
    const productObj = new Product(
      0, 
      req.body.productTypeCode, 
      req.body.productName, 
      req.body.productPrice);
      ProductController.newProduct(productObj, res);
  }

  public getAllProduct(req: Request, res: Response): void {
    ProductController.getProduct(res);
  }

  public updateProduct(req: Request, res: Response): void {
    const productObj = new Product(
      req.body.productCode,
      req.body.productTypeCode, 
      req.body.productName, 
      req.body.productPrice,
    );
    ProductController.updateProduct(productObj, res);
  }

  public deleteProduct(req: Request, res: Response): void {
    if (isNaN(Number(req.params.productId))) {
      ProductController.checkParams(res);
    } else {
      const productId = Number(req.params.productId);
      const productOb = new Product(productId, new ProductType(0, ""), "", 0);
      ProductController.deleteProduct(productOb, res);
    }
  }
}

const productController = new ProductController();
export default productController;
