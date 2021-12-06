import axios from "axios";
import UserPool from "../pages/auth/UserPool";

const AWS_BASE_URL = `https://69auo0vnz9.execute-api.us-east-1.amazonaws.com/dev`
// const AWS_BASE_URL = `http://localhost:4006`
const AWS_BASE_URL_RAW_ALERTS = `raw-alerts-get-data`;
const AWS_BASE_URL_AIOPS_COCKPIT = `aiops-cockpit-get-data`;
const AWS_RAW_ALERTS_FILTERS = `filter`;
const AWS_TABLE_DESCRIPTION = `filter/table-description`;
const AWS_FILTER_RAW_ALERTS = `filter/raw-alerts`;

const fetchGetFromAPI = (pageConfig, nextPageClick) => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    let params = {}
    if(nextPageClick)
      params = { params: { limit: pageConfig.pageSize, lastItem: pageConfig.lastItem } }
    else
      params = { params: { limit: pageConfig.pageSize, lastItem: null } }
    axios
    .get(`${AWS_BASE_URL}/${AWS_BASE_URL_RAW_ALERTS}`, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const fetchFilteredRawAlerts = (pageConfig, filterObj) => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    axios  /// JSON STRINGIFY
      .post(`${AWS_BASE_URL}/${AWS_FILTER_RAW_ALERTS}`, { params: { limit: pageConfig.pageSize, lastItem: pageConfig.lastItem }, filterObj })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const fetchTableDescriptionFromAPI = (tableName) => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    axios
      .get(`${AWS_BASE_URL}/${AWS_TABLE_DESCRIPTION}`, { params: { tableName: tableName}})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const fetchCreatedByMeFilters = () => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    axios
      .get(`${AWS_BASE_URL}/${AWS_RAW_ALERTS_FILTERS}`, { params: { user_id: 1212 } })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const saveCreatedByMeFilter = (payload) => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    axios
      .post(`${AWS_BASE_URL}/${AWS_RAW_ALERTS_FILTERS}`, payload )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const updateCreatedByMeFilter = (payload) => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    axios
      .put(`${AWS_BASE_URL}/${AWS_RAW_ALERTS_FILTERS}`, payload )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const fetchGetFromAPIAIOpsCockpit = () => {
  return new Promise((resolve, reject) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;
    axios
      .get(`${AWS_BASE_URL}/${AWS_BASE_URL_AIOPS_COCKPIT}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {fetchGetFromAPI,fetchGetFromAPIAIOpsCockpit, fetchCreatedByMeFilters, saveCreatedByMeFilter, updateCreatedByMeFilter,
  fetchTableDescriptionFromAPI, fetchFilteredRawAlerts};
