import { endpoints } from "../../../../helpers/urlHelper"; 
import { get } from "../../../../helpers/apiHelper"; 
import { useConfigurationStore } from "../../../../store";

export const getSubMenus = async (data) => {
  let url = endpoints.layout.getSubMenuItems;
  let result = await get(`/${data[0]}${url}?menu=${data[1]}`)

  return result?.data;
};
