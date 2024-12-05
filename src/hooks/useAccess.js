import { useContext } from 'react';
import { UserAccessContext } from '../context/access';

export const useAccess = () => {
  const permissions = useContext(UserAccessContext);
  
  const hasPermission = (permission) => {
    return permissions?.includes(permission) || false;
  };

  return { hasPermission };
};
