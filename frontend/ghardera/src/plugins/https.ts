import axios from "../config/axios";

export const GetRequest = (url: string, config: {} = {}) => {
  return axios.get(url, config);
};

export const PostRequest = (url: string, params: {}, config = {}) => {
  return axios.post(url, params, config);
};

export const PutRequest = (url: string, params: {}, config = {}) => {
  //only for update not post
  return axios.put(url, params, config);
};

export const DeleteRequest = (url: string, data?: any) => {
  return axios.delete(url, { data });
};

export const PatchRequest = (url: string, data: any, config = {}) => {
  return axios.patch(url, data, config);
};
