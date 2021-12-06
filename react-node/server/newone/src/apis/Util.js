import axios from "axios";

const AWS_BASE_URL = `https://69auo0vnz9.execute-api.us-east-1.amazonaws.com/dev`
// const AWS_BASE_URL = `http://localhost:4006`
const AWS_VULNERABILITIES = `util/vulnerabilites`;
const AWS_BUILDTESTMASTER = `util/buildTestMaster`;

const fetchVulnerabilities = (pageConfig) => {
  return new Promise((resolve, reject) => {
    // let user = UserPool.getCurrentUser();
    // axios.defaults.headers.common["token"] = user.username;
    let params = {}
    // if(nextPageClick)
    //   params = { params: { limit: pageConfig.pageSize, lastItem: pageConfig.lastItem } }
    // else
    //   params = { params: { limit: pageConfig.pageSize, lastItem: null } }
    params = { params: { limit: pageConfig.pageSize, lastItem: pageConfig.lastItem } }
    axios
    .get(`${AWS_BASE_URL}/${AWS_VULNERABILITIES}`, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const fetchBuildToolConfig = () => {
  return new Promise((resolve, reject) => {
    let params = {}
    axios
    .get(`${AWS_BASE_URL}/${AWS_BUILDTESTMASTER}`, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}



export {fetchVulnerabilities, fetchBuildToolConfig};