import {GetRequest,DeleteRequest, PostRequest, PutRequest} from "@/plugins/https";


export const APIGetAllProperty = () => GetRequest("property/user/properties/");

export const APIGetParamsProperty = (query) =>  GetRequest(`property/search?${query}`);

export const APIGetEachProperty = (slug) => GetRequest(`property/admin/properties/${slug}`);

export const APIAddProperty = (data) => PostRequest("property/admin/property", data);

export const APIDeleteProperty = (slug) => DeleteRequest(`property/admin/property/${slug}`);

export const APIUpdateProperty = (data, slug) =>PutRequest(`property/admin/property/${slug}`, data);

