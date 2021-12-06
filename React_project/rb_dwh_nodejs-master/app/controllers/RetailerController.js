import { pool } from "../config";
import { apiError, apiSuccess } from "../utils";

const getRetailers = async (_req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const results = await client
    .query("SELECT * FROM rb.retailer_setting ORDER BY retailer_name ASC")
    .catch(() => null);

  if (results) {
    apiSuccess("Records found", results.rows, res);
    return;
  }

  apiError(res);
};

const retailerStates = async (_req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const results = await client
    .query("SELECT distinct retailer_state FROM rb.retailer_setting")
    .catch(() => null);

  if (results) {
    apiSuccess("Records found", results.rows, res);
    return;
  }

  apiError(res);
};

const createRetailer = async (req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const {
    retailer_name,
    retailer_state,
    include_tax,
    include_ccfee,
    shipping_cost_ground,
    shipping_cost_2day,
    shipping_cost_overnight,
    rb_percent_sales,
    retailer_percent_sales,
    credit_card_fee_percent,
    shipping_fedex,
    shipping_non_fedex,
    retailer_contrib_free_ship,
    dw_contrib_free_ship,
    company_id,
  } = req.body;

  const companyRecord = await client
    .query("SELECT * FROM rb.retailer_setting WHERE company_id = $1", [
      company_id,
    ])
    .catch(() => null);

  if (!companyRecord) {
    apiError(res);
    return;
  }

  if (companyRecord.rows.length > 0) {
    apiError(res, "Company ID already exists.");
    return;
  }

  const retailerRecord = await client
    .query("SELECT * FROM rb.retailer_setting WHERE retailer_name = $1", [
      retailer_name,
    ])
    .catch(() => null);

  if (!retailerRecord) {
    apiError(res);
    return;
  }

  if (retailerRecord.rows.length > 0) {
    apiError(res, "Retailer Name already exists.");
    return;
  }

  const results = await client
    .query(
      "INSERT INTO rb.retailer_setting (retailer_name, retailer_state,ccfee_calc_method,include_tax,include_ccfee,shipping_cost_ground,shipping_cost_2day,shipping_cost_overnight,rb_percent_sales,retailer_percent_sales,credit_card_fee_percent,shipping_fedex,shipping_non_fedex,retailer_contrib_free_ship,dw_contrib_free_ship,company_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        retailer_name,
        retailer_state,
        "ORDERTOTAL",
        include_tax,
        include_ccfee,
        shipping_cost_ground,
        shipping_cost_2day,
        shipping_cost_overnight,
        rb_percent_sales,
        retailer_percent_sales,
        credit_card_fee_percent,
        shipping_fedex,
        shipping_non_fedex,
        retailer_contrib_free_ship,
        dw_contrib_free_ship,
        company_id,
      ]
    )
    .catch(() => null);

  if (results) {
    apiSuccess("Successfully save the retailer", results.rows, res);
    return;
  }

  apiError(res);
};

const updateRetailer = async (req, res) => {
  const client = await pool.connect().catch(() => null);

  if (!client) {
    apiError(res);
    return;
  }

  const company_id = req.params.id;

  const {
    retailer_name,
    retailer_state,
    include_tax,
    include_ccfee,
    shipping_cost_ground,
    shipping_cost_2day,
    shipping_cost_overnight,
    rb_percent_sales,
    retailer_percent_sales,
    credit_card_fee_percent,
    shipping_fedex,
    shipping_non_fedex,
    retailer_contrib_free_ship,
    dw_contrib_free_ship,
  } = req.body;

  const retailerRecord = await client
    .query("SELECT * FROM rb.retailer_setting WHERE retailer_name=$1", [
      retailer_name,
    ])
    .catch(() => null);

  if (retailerRecord.rows.length === 0) {
    const updateResults = await client
      .query(
        "UPDATE rb.retailer_setting SET retailer_name=$1, retailer_state=$2,ccfee_calc_method=$3,include_tax=$4,include_ccfee=$5,shipping_cost_ground=$6,shipping_cost_2day=$7,shipping_cost_overnight=$8,rb_percent_sales=$9,retailer_percent_sales=$10,credit_card_fee_percent=$11,shipping_fedex=$12,shipping_non_fedex=$13,retailer_contrib_free_ship=$14,dw_contrib_free_ship=$15 WHERE company_id=$16",
        [
          retailer_name,
          retailer_state,
          "ORDERTOTAL",
          include_tax,
          include_ccfee,
          shipping_cost_ground,
          shipping_cost_2day,
          shipping_cost_overnight,
          rb_percent_sales,
          retailer_percent_sales,
          credit_card_fee_percent,
          shipping_fedex,
          shipping_non_fedex,
          retailer_contrib_free_ship,
          dw_contrib_free_ship,
          company_id,
        ]
      )
      .catch(() => null);

    if (updateResults) {
      apiSuccess(
        `Successfully Updated the retailer ${company_id}`,
        updateResults.rows,
        res
      );
      return;
    }
  }

  const companyRecord = await client
    .query("SELECT * FROM rb.retailer_setting WHERE company_id=$1", [
      company_id,
    ])
    .catch(() => null);

  if (companyRecord && companyRecord.rows[0].retailer_name === retailer_name) {
    const updateCompanyResults = await client
      .query(
        "UPDATE rb.retailer_setting SET retailer_name=$1, retailer_state=$2,ccfee_calc_method=$3,include_tax=$4,include_ccfee=$5,shipping_cost_ground=$6,shipping_cost_2day=$7,shipping_cost_overnight=$8,rb_percent_sales=$9,retailer_percent_sales=$10,credit_card_fee_percent=$11,shipping_fedex=$12,shipping_non_fedex=$13,retailer_contrib_free_ship=$14,dw_contrib_free_ship=$15 WHERE company_id=$16",
        [
          retailer_name,
          retailer_state,
          "ORDERTOTAL",
          include_tax,
          include_ccfee,
          shipping_cost_ground,
          shipping_cost_2day,
          shipping_cost_overnight,
          rb_percent_sales,
          retailer_percent_sales,
          credit_card_fee_percent,
          shipping_fedex,
          shipping_non_fedex,
          retailer_contrib_free_ship,
          dw_contrib_free_ship,
          company_id,
        ]
      )
      .catch(() => null);

    if (updateCompanyResults) {
      apiSuccess(
        `Successfully Updated the retailer ${company_id}`,
        updateCompanyResults.rows,
        res
      );
      return;
    }
  }

  apiError(res, "Retailer name already exists");
};

export { getRetailers, retailerStates, createRetailer, updateRetailer };
