import { useEffect, useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  Bars3BottomLeftIcon,
  Cog6ToothIcon,
  BanknotesIcon,
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  FolderOpenIcon,
  ClockIcon
} from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import HelpMenu from './HelpMenu';
import { useLayoutStore } from '../../store';
import { Gauge } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { getNavItems } from './api';
import { extractBaseUrl } from '../../helpers/utility';

function SideNavbar() {
  const { menus } = useLayoutStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setTheme } = useTheme();

  const onGetMenus = useMutation({
    mutationKey: ['menus'],
    mutationFn: getNavItems,
  });

  let moduleName = extractBaseUrl(window.location.href);

  useEffect(() => {
    if (moduleName) onGetMenus.mutate(moduleName);
  }, [moduleName]);

  return (
    <div
      className={`h-full ${
        isCollapsed ? 'w-[50px]' : 'w-[280px]'
      } bg-white dark:bg-[#141921] text-slate-600 dark:text-gray-300 flex flex-col transition-width duration-300 border-r border-gray-200 dark:border-gray-600`}
    >
      <div className="flex justify-between items-center px-4 py-4 text-lg font-bold">
        {!isCollapsed && (
          <div className="w-full h-12">
            <img src="/primary.png" alt="Logo" className="h-full" />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-transparent border-none cursor-pointer text-slate-600 dark:text-gray-300"
        >
          {isCollapsed ? (
            <Bars3BottomLeftIcon className="size-5" />
          ) : (
            <ChevronDoubleLeftIcon className="size-5" />
          )}
        </button>
      </div>
      <Separator className="opacity-50 dark:opacity-80 mx-3 w-[90%]" />
      <ul
        className={`flex-grow ${
          isCollapsed ? 'block mx-2' : 'block mx-5'
        } overflow-y-auto`}
      >
        {menus.map((item) => (
          <NavItem key={item._Link} data={item} isCollapsed={isCollapsed} />
        ))}
      </ul>

      <div
        className={`p-4 ${
          isCollapsed
            ? 'justify-center w-[50px]'
            : 'block mx-2 mb-2 rounded-lg shadow-md bg-slate-50 dark:bg-gray-600'
        } flex items-center justify-between`}
      >
        <div className={`w-full h-8 ${isCollapsed ? 'hidden' : 'block'}`}>
          <img src="/primary.png" alt="Logo" className="h-full" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Cog6ToothIcon className="text-gray-600 size-5 hover:cursor-pointer dark:text-gray-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BanknotesIcon className="items-center pr-1 size-5" />
              Upgrade
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isCollapsed && (
        <Separator className="w-[90%] mx-auto my-2 opacity-50 dark:opacity-20" />
      )}
    </div>
  );
}

const NavItem = ({ data, isCollapsed }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Home':
        return <HomeIcon className="size-5" />;
      case 'ClipboardList':
        return <ClipboardDocumentListIcon className="size-5" />;
      case 'FolderOpen':
        return <FolderOpenIcon className="size-5" />;
      case 'History':
        return <ClockIcon className="size-5" />;
      default:
        return <HomeIcon className="size-5" />;
    }
  };

  if (data._SubMenus) {
    return (
      <div>
        <div
          onClick={() => !isCollapsed && setIsSubMenuOpen(!isSubMenuOpen)}
          className={`
            flex items-center 
            hover:bg-blue-400 dark:hover:bg-blue-600 hover:text-white 
            py-2 ${!isCollapsed ? 'pl-2' : 'pl-1.5'} 
            my-2 rounded-md w-full 
            cursor-pointer
          `}
        >
          {getIcon(data._Icon)}
          {!isCollapsed && <span className="ml-2 flex-grow">{data._Name}</span>}
          {!isCollapsed && (
            <ChevronDoubleLeftIcon
              className={`size-4 transform transition-transform ${
                isSubMenuOpen ? 'rotate-90' : '-rotate-90'
              }`}
            />
          )}
        </div>
        {!isCollapsed && isSubMenuOpen && (
          <div className="ml-4">
            {data._SubMenus.map((subItem) => (
              <NavLink
                key={subItem._Link}
                to={subItem._Link}
                className={({ isActive }) => `
                  flex items-center 
                  hover:bg-blue-400 dark:hover:bg-blue-600 hover:text-white 
                  py-2 pl-2
                  my-2 rounded-md w-full 
                  ${isActive ? 'bg-blue-400 dark:bg-slate-600 text-white' : ''}
                `}
              >
                {getIcon(subItem._Icon)}
                <span className="ml-2">{subItem._Name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={data._Link}
      className={({ isActive }) => `
        flex items-center 
        hover:bg-blue-400 dark:hover:bg-blue-600 hover:text-white 
        py-2 ${!isCollapsed ? 'pl-2' : 'pl-1.5'} 
        my-2 rounded-md w-full 
        ${isActive ? 'bg-blue-400 dark:bg-slate-600 text-white' : ''}
      `}
    >
      {getIcon(data._Icon)}
      <span className={isCollapsed ? 'hidden' : 'block ml-2'}>
        {data._Name}
      </span>
    </NavLink>
  );
};

NavItem.propTypes = {
  data: PropTypes.object,
  isCollapsed: PropTypes.bool,
};

export default SideNavbar;
