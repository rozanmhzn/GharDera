const { GetRequest, PostRequest } = require("@/plugins/https");

export const APILoginUser = (data) => PostRequest("user/login", data);
export const APIUserDetail = () => GetRequest("user/user/profile");
export const APIUserRegister = (data) => PostRequest("user/signup", data);
