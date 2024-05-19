const { GetRequest, PostRequest } = require("@/plugins/https");

export const APILoginUser = (data) => PostRequest("user/login", data);
export const APIUserDetail = () => GetRequest("user/user/profile");
export const APIUserRegister = (data) => PostRequest("user/signup", data);
export const APIVerifyUser = (data, token) =>PostRequest(`auth/verifyuser/${token}`, data);
export const APIVerifyOTP = (data) => PostRequest(`auth/verifyotp`, data);
export const APIResendOTP = (id) => PostRequest(`auth/resend-otp/${id}`);
export const APIForgetPassword = (data) =>PostRequest(`user/forgot-password`, data);