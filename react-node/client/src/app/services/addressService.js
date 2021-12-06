import axios from 'axios';

export const addressService = {};

const getHeader = {
  "Content-Type": "application/json",
  Authorization: `${localStorage.getItem("accessToken")}`,
};


addressService.create =async(data) => {
    try {
        let res = await axios.post(process.env.REACT_APP_URI + '/address', data, { headers: getHeader });
        return res ? res.data:[]
    } catch (err) {
        throw err.response? err.response.data:err
    }
}

addressService.getAddress = async () => {
    try {
        let res = await axios.get(process.env.REACT_APP_URI + '/address', { headers: getHeader });
        return res.data ? res.data.data : [];
        
    } catch (err) {
        throw err.response ? err.response.data : err;
    }
    
}

addressService.update = async(id,data) => {
    try {
        let res = await axios.put(process.env.REACT_APP_URI + `/address/${id}`,data, { headers: getHeader });
        return res? res.data:[]
    } catch (err) {
        throw err.response ? err.response.data : err;
    }
}

addressService.deleteAddress = async (id) => {
    try {
        let res = await axios.delete(process.env.REACT_APP_URI + `/address/${id}`, { headers: getHeader });
        return res ? res.data : [];
    } catch (err) {
        throw err.response ? err.response.data:err
    }
    
}