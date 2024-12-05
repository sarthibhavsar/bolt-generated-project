import { Navigate, useParams } from "react-router-dom";
import { UserAccessProvider } from "../context/access";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get } from "../helpers/apiHelper";
import { endpoints } from "../helpers/urlHelper";
import { useEffect, useState } from "react";

const getUserPermissions = (data) => {
  let url = endpoints.authentication.permissions;
  return get(`/${data.module}/` + url + `?page=${data.page}`);
};

const Authmiddleware = (props) => {

  return (
    <UserAccessProvider value={{}}>
      {props.children}
    </UserAccessProvider>
  );
};

export default Authmiddleware;
