import http from "@/utils/axios/index";

export const getdata = async () => {
    return await http.get("/websites/data.json");
};