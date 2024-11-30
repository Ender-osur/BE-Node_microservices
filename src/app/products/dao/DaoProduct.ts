import { response, Response } from "express";
import Product from "../entity/Product";
import { SQL_product } from "../repository/sql_product";
import pool from "../../../config/connection/dbConnection";

class DaoProduct {
  protected static async newProduct(productOb: Product, res: Response): Promise<any> {
    await pool
      .task(async (myQuery) => {
        const newProduct: any = await myQuery.one(SQL_product.INSERT_PRODUCT, [
          productOb.productTypeCode.productTypeCode,
          productOb.productName,
          productOb.productPrice,
        ]);

        return newProduct;
      })
      .then((myResponse) => {
        res.status(200).json(myResponse);
      })
      .catch((myError) => {
        console.error(myError);
        res.status(400).json({ response: "Error creating product" });
      });
  }

  protected static async getProduct(res: Response): Promise<any> {
    await pool
      .result(SQL_product.GET_PRODUCT, [])
      .then((myResponse: any) => {
        res.status(200).json(myResponse.rows);
      })
      .catch((myError) => {
        res.status(400).json({ response: "Error getting data" });
        console.error(myError);
      });
  }

  protected static async deleteProduct(productObj: Product, res: Response): Promise<any> {
    await pool
      .result(SQL_product.DELETE_PRODUCT, [productObj.productCode])
      .then((myResponse: any) => {
        res.status(200).json({"Cantidad borrado": myResponse.rowCount});
      })
      .catch((myError) => {
        res.status(400).json({ response: "Error deleting product" });
        console.log(myError);
      });
  }

  protected static async updateProduct(productObj: Product, res: Response): Promise<any> {
    await pool
      .result(SQL_product.UPDATE_PRODUCT, [
        productObj.productTypeCode.productTypeCode,
        productObj.productName,
        productObj.productPrice,
        productObj.productCode,
      ])
      .then((myResponse: any) => {
        res.status(200).json({"Cantidad actualizados": myResponse.rowCount});
      })
      .catch((myError) => {
        res.status(400).json({ response: "Error updating product" });
        console.log(myError);
      });
  }
  protected static async checkParams(res: Response): Promise<any> {
    res.status(400).json({
      response: "Error in parameters",
    });
  }
}

export default DaoProduct;
