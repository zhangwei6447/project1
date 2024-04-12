import { POPULAR_URL } from "../config/urls.cfg";
import { request } from "./ajax";

export function popularApi(page, size, type) {
    return request({
        url: POPULAR_URL,
        method: 'GET',
        params: { page, size, type }
    })
}