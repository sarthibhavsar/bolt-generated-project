import axios from "axios";
import { getUser } from "./utility";

export const axiosApi = axios.create();

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
axiosApi.defaults.headers.common["Signature"] = getUser()?.signature;
axiosApi.defaults.baseURL = window.env.AUTH_BASE_URL;

export async function ballooningPost(url, data) {
  return await axios
    .post(window.env.BALLOONING_PY_BASE_URL + url, { ...data })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        // window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}

export async function get(url, data) {
  return await axiosApi
    .get(url, { ...data })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        // window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}

// export async function ballooningPost(url, data) {
//   console.log(data)
//   return await axios
//     .post(window.env.BALLOONING_PY_BASE_URL + url, { ...data })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       if (err.response?.status == 401) {
//         localStorage.removeItem("token")
//         localStorage.removeItem("authUser")
// //         window.location.href = `/`;
//       }
//       return Promise.reject(err.response?.data);
//     });
// }



export async function postFormData(url, formData) {
  // alert("formData")
  return axiosApi
    .post(window.env.BALLOONING_PY_BASE_URL + url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        window.location.href = `/logout`;
      }
      return Promise.reject(err.response?.data);
    });
}
export async function postPlanFormData(url, formData) {
  // alert("formData")
  console.log(formData)
  return axiosApi
    .post(window.env.BALLOONING_BASE_URL + url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        window.location.href = `/logout`;
      }
      return Promise.reject(err.response?.data);
    });
}


export async function post(url, data) {
  return axiosApi
    .post(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        // window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}

export async function put(url, data) {
  return axiosApi
    .put(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        // window.location.href = `/`;
      }
      console.log(err);
      return Promise.reject(err.response?.data);
    }); //
}

export async function del(url, data) {
  return await axiosApi
    .delete(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        // window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}
