const { GetRequest } = require("@/plugins/https");

export const APIGetAllUsers = () => GetRequest("user/admin/users");

export const APIGetUserBooking = () => GetRequest("user/user/bookings");
