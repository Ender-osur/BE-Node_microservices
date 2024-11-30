export const SQL_product = {
  INSERT_PRODUCT: "INSERT INTO product(product_type_code, product_name, product_price) \
  VALUES ($1, $2, $3) RETURNING product_code",
  GET_PRODUCT: "SELECT product_code, product_type_code, product_name, product_price \
  FROM product ORDER BY product_code desc",
  UPDATE_PRODUCT: "UPDATE product SET product_type_code = $1, product_name = $2, \
  product_price = $3 WHERE product_code = $4",
  DELETE_PRODUCT: "DELETE FROM product WHERE product_code = $1",
}
