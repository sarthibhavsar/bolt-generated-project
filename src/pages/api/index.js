import { endpoints } from "../../helpers/urlHelper";
import { get, post, del, put } from "../../helpers/apiHelper";

import { extractBaseUrl } from "../../helpers/utility";

let module = extractBaseUrl(window.location.href);

const getUsers = (data) => {
  let url = `/${module}${endpoints.user.getUsers}`;
  return get(url, data);
};

const addUser = (data) => {
  let url = `/${module}${endpoints.user.addUser}`;
  return post(url, data);
};

const updateUser = (data) => {
  let url = `/${module}${endpoints.user.updateUser}`;
  return put(url, data);
};

const deleteUser = (id) => {
  let url = `/${module}${endpoints.user.delUser}`;
  return del(url + `/${id}`);
};

const getRoles = (data) => {
  let url = `/${module}${endpoints.role.getRoles}`;
  return get(url, data);
};

const getPermissions = async (id) => {
  let url = endpoints.permissions.getPermissions;
  return get(`${url}?roleId=${id}&module=MAPPZEN`);
};

const updatePermissions = async (data) => {
  let url = endpoints.permissions.updatePermissions;
  return put(url, data);
};

export {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getRoles,
  getPermissions,
  updatePermissions,
};
