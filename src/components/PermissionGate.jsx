import { useAccess } from '../hooks/useAccess';

export const PermissionGate = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useAccess();
  
  return hasPermission(permission) ? children : fallback;
};
