import { create } from 'zustand';

export const useLayoutStore = create((set) => ({
  menus: [
    { _Name: 'Home', _Link: '/', _Icon: 'Home' },
    { _Name: 'Schedules', _Link: '/schedules', _Icon: 'Calendar' },
    { _Name: 'Tasks', _Link: '/tasks', _Icon: 'CheckSquare' },
    {
      _Name: 'Work Orders',
      _Link: '/work-orders',
      _Icon: 'ClipboardList',
      _SubMenus: [
        {
          _Name: 'Open Orders',
          _Link: '/work-orders/open',
          _Icon: 'FolderOpen',
        },
        {
          _Name: 'Order History',
          _Link: '/work-orders/history',
          _Icon: 'History',
        },
      ],
    },
    {
      _Name: 'Configuration',
      _Link: '/configuration',
      _Icon: 'Settings',
      _SubMenus: [
        {
          _Name: 'Machines',
          _Link: '/configuration/machines',
          _Icon: 'Settings',
        },
      ],
    },
  ],
  setMenus: (data) => set(() => ({ menus: data })),
}));
