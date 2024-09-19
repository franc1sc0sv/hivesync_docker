import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

export const get_all_events_by_server = async (serverId: string) => {
    try {
        const res = await AxiosClient.get(`/server/events/get_many/${serverId}`, headers());
        return format_api_response(res);
    } catch (e) {
        throwError(e)
    }
}

export const get_event_by_server = async (serverId: string, data: any) => {
    try {
        const res = await AxiosClient.get(`/server/events/${serverId}`, {
            headers: headers().headers,
            data: data
        });
        return format_api_response(res);
    } catch (e) {
        throwError(e)
    }
}

export const create_event = async (serverId: string, data: any) => {
    try {
        const res = await AxiosClient.post(`/server/events/${serverId}`, data, headers());
        return format_api_response(res);
    } catch (e) {
        throwError(e)
    }
}

export const edit_event = async (serverId: string, data: any) => {
    try {
        const res = await AxiosClient.patch(`/server/events/${serverId}`, data, headers());
        return format_api_response(res);
    } catch (e) {
        throwError(e)
    }
}

export const delete_event = async (serverId: string, data: any) => {
    try {
        const res = await AxiosClient.delete(`/server/events/${serverId}`, {
            headers: headers().headers,
            data: data
        });
        return format_api_response(res);
    } catch (e) {
        throwError(e)
    }
}