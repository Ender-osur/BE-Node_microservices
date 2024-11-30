import { Router } from "express";
import productController from "../controller/ProductController";

class ProductRoute {
  public pRouteApi: Router;

  constructor() {
    this.pRouteApi = Router();
    this.loadRoutes();
  }

  private loadRoutes(): void {
    this.pRouteApi.get("/get-all", productController.getAllProduct);
    this.pRouteApi.delete("/delete/:productId", productController.deleteProduct);
    this.pRouteApi.put("/update", productController.updateProduct);
    this.pRouteApi.post("/add", productController.createNewProduct);
  }
}

const productRoute = new ProductRoute();
export default productRoute.pRouteApi;