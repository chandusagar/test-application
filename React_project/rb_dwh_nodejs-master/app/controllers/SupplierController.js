import { pool } from "../config";
import { apiError, apiSuccess } from "../utils";

const getSupplier = async (_req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const results = await client
    .query(
      "select supplier, vendor as brand, last_updated, updated_by from rb.supplier_map ORDER BY supplier"
    )
    .catch(() => null);

  if (results) {
    apiSuccess("Records found", results.rows, res);
    return;
  }

  apiError(res);
};

const updateSupplier = async (req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const brand = req.params.id;
  const { supplier } = req.body;

  const results = await client
    .query(
      "UPDATE rb.supplier_map SET supplier=$1,last_updated=sysdate,updated_by=$2 WHERE vendor=$3",
      [supplier, "RBUI", brand]
    )
    .catch(() => null);

  if (results) {
    apiSuccess(`Successfully Updated the supplier ${brand}`, results.rows, res);
    return;
  }

  apiError(res);
};

const getUnmappedBrands = async (_req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const results = await client
    .query(
      "SELECT distinct NULL, vendor AS brand, NULL, NULL FROM rb.shopify_order_item WHERE vendor not IN (SELECT vendor FROM rb.supplier_map)"
    )
    .catch(() => null);

  if (results) {
    apiSuccess("Records found", results.rows, res);
    return;
  }

  apiError(res);
};

const updateUnmappedBrands = async (req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const { brand, supplier } = req.body;

  const results = await client
    .query(
      "INSERT INTO rb.supplier_map (supplier,vendor,create_time,last_updated,updated_by) VALUES ($1,$2,sysdate,sysdate,$3)",
      [supplier, brand, "RBUI"]
    )
    .catch(() => null);

  if (results) {
    apiSuccess("Successfully updated the Brand", results.rows, res);
    return;
  }

  apiError(res);
};

const createSupplier = async (req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const { supplier, brand } = req.body;

  const results = await client
    .query(
      "INSERT INTO rb.supplier_map (supplier,vendor,create_time,last_updated,updated_by) VALUES ($1,$2,sysdate,sysdate,$3)",
      [supplier, brand, "RBUI"]
    )
    .catch(() => null);

  if (results) {
    apiSuccess("Successfully saved the Brand", results.rows, res);
    return;
  }

  apiError(res);
};

export {
  getSupplier,
  updateSupplier,
  createSupplier,
  getUnmappedBrands,
  updateUnmappedBrands,
};
