import { Zodios } from "@zodios/core";
import { userApi } from "@/api/selectors/user-selector";

export const apiClient = new Zodios("https://somebaseurl.com", [...userApi]);
