export const SQL_Access = {
  REGISTER_INPUT: "INSERT INTO inputs(user_cod, input_date, input_time) VALUES ($1, CURRENT_DATE, CURRENT_TIME)",
  DATA_TOKEN:
    "SELECT a.user_cod, u.user_names, u.user_last_names, a.access_key, a.access_email, a.access_uuid FROM access a INNER JOIN users u ON a.user_cod = u.user_cod WHERE a.access_email = $1",
  GET_UUID: "SELECT a.access_uuid FROM access WHERE a.user_cod = $1",
  UPDATE_UUID: "UPDATE access SET access_uuid = gen_random_uuid() WHERE user_cod = $1",
};
