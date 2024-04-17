import {GetRequest,DeleteRequest} from "@/plugins/https";


export const APIGetAllProperty = () => GetRequest("property/user/properties/");

export const APIDeleteProperty = (slug) => DeleteRequest(`property/admin/property/${slug}`);
