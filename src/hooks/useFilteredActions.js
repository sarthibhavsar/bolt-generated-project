import { useAccess } from "./useAccess";

/**
 * A custom hook that filters actions based on user permissions
 * @param {Array} actions - Array of action objects with a show property that contains the required permission
 * @returns {Array} - Filtered array of actions based on user permissions
 */
export const useFilteredActions = (actions) => {
  const { hasPermission } = useAccess();
  
  return actions.filter(action => action.show);
};
