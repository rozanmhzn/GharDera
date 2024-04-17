import {GetRequest,DeleteRequest, PostRequest} from "@/plugins/https";


export const APIGetAllProperty = () => GetRequest("property/user/properties/");

export const APIDeleteProperty = (slug) => DeleteRequest(`property/admin/property/${slug}`);

export const APIAddProperty = (data) => PostRequest("property/admin/property", data);
