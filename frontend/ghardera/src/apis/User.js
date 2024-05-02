const { GetRequest, PutRequest } = require("@/plugins/https");

export const APIGetAllUsers = () => GetRequest("user/admin/users");

export const APIGetUserBooking = () => GetRequest("user/user/bookings");

export const APIGetAllBookings = () => GetRequest(`user/admin/bookings`);

export const APIChangePasswordAdmin = (data) =>  PutRequest(`user/admin/settings/changepassword`, data);