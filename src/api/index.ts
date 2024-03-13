import { Zodios } from "@zodios/core";
import { pluginFetch } from "@zodios/plugins";
import { userApi } from "@/api/selectors/user-selector";

const corsFetchHandler = pluginFetch({
  mode: "cors",
  keepalive: true,
  credentials: "include",
});

export const userApiClient = new Zodios("http://localhost:3000", userApi);

userApiClient.use(corsFetchHandler);
