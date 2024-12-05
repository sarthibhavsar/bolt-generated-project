import { get, post } from "../../../helpers/apiHelper";
import { endpoints } from "../../../helpers/urlHelper";
import { getUser } from "../../../helpers/utility";

import { useAuthenticationStore } from "../../../store/Authentication";
import { useLayoutStore } from "../../../store/Layout";

export const getModules = async () => {
  let url = endpoints.layout.getModules
  let result = await get(url)
  useAuthenticationStore.setState({ modules: result?.data || [] });
  return null;
};

export const getNavItems = async (module) => {
  let url = endpoints.layout.getMenuItems
  let { GCMU_ID } = getUser()
  let result = await get(`/${module}${url}?userId=${GCMU_ID}`)
  useLayoutStore.setState({ menus: result?.data || [] });

  return null;
};
