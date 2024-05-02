const { GetRequest, PutRequest } = require("@/plugins/https");

export const APIGetAllUsers = () => GetRequest("user/admin/users");

export const APIUserProfile = () => GetRequest("user/user/profile");

export const APIUpdateProfile = (data) => PutRequest("user/user/profile", data);

export const APIGetUserBooking = () => GetRequest("user/user/bookings");

export const APIGetAllBookings = () => GetRequest(`user/admin/bookings`);

export const APIChangePasswordAdmin = (data) =>  PutRequest(`user/admin/settings/changepassword`, data);