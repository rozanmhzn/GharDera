const { GetRequest, PutRequest,  DeleteRequest } = require("@/plugins/https");

export const APIGetAllUsers = () => GetRequest("user/admin/users");

export const APIUserProfile = () => GetRequest("user/user/profile");
export const APIUpdate2FA = (data) => PutRequest("auth/user/toggle2FA/", data);

export const APIUpdateProfile = (data) => PutRequest("user/user/profile", data);

export const APIGetUserBooking = () => GetRequest("user/user/bookings");

export const APIConfirmTourRequest = (slug, data) =>  PutRequest(`user/admin/booking/${slug}`, data);

export const APIGetAllBookings = () => GetRequest(`user/admin/bookings`);

export const APIChangePasswordAdmin = (data) =>  PutRequest(`user/admin/settings/changepassword`, data);
export const APIDeleteUser = (slug) =>  DeleteRequest(`user/admin/users/${slug}`);


export const APIChangePassword = (data) => PutRequest(`user/user/settings/changepassword`, data);