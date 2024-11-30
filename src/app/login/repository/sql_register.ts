export const SQL_User = {
  CREATE_USER: "INSERT INTO users(user_names, user_last_names) VALUES ($1, $2) RETURNING user_cod",
  CREATE_ACCESS: "INSERT INTO access(user_cod, access_email, access_key, access_uuid) VALUES ($1, $2, $3, gen_random_uuid())",
  AMOUNT_EMAIL: "SELECT COUNT(user_cod) AS founded FROM access WHERE access_email = $1"
};