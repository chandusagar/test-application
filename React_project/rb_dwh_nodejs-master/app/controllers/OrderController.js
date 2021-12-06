import { pool } from "../config";
import { apiError, apiSuccess } from "../utils";

const getOrders = async (_, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const results = await client
    .query("SELECT * FROM rb.order limit 5")
    .catch(() => null);

  if (results) {
    apiSuccess("Records found", results.rows, res);
    return;
  }

  apiError(res);
};

export { getOrders };
