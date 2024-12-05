import { extractBaseUrl } from './utility'

let module = extractBaseUrl(window.location.href)

export const endpoints = {
    authentication: {
        login: '/login',
        permissions: 'pagepermissions'
    },
    layout: {
        getModules: '/modules',
        getMenuItems: '/menu',
        getSubMenuItems: '/submenu',
    },
    permissions: {
        getPermissions: `${module}/permissions`,
        updatePermissions: `${module}/permission`,
    },
    user: {
        getUsers: '/users',
        addUser: '/users',
        updateUser: '/user',
        delUser: '/user',
    },
    role: {
        getRoles: '/roles'
    },
}
