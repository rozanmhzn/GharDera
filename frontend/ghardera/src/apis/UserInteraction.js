import { DeleteRequest, GetRequest, PostRequest } from "@/plugins/https";

export const APIAllFavoutires = (data) => PostRequest("user/user/favourites", data);

export const APIAddToFavoutires = (data) =>  PostRequest("user/user/favourites", data);

export const APIRemoveFromFavoutire = (data) =>  DeleteRequest("user/user/favourites", data);

export const APIGetFavouriteProperty = (slug) => GetRequest(`user/user/favourites/${slug}`);

export const APIGetAllFavourites = () => GetRequest(`user/user/favourites`);

export const APITourBook = (data) => PostRequest(`user/book-tour`, data);
