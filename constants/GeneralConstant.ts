import type { DashboardMenu, ErrorType, GeneralConfigDataType, SelectOption, Status, StatusVariants, UserType, WaterReadingStatus } from '~/types';

export const MONTH: SelectOption<number, string>[] = [
    {
        value: 1,
        label: 'Januari',
    },
    {
        value: 2,
        label: 'Februari',
    },
    {
        value: 3,
        label: 'Maret',
    },
    {
        value: 4,
        label: 'April',
    },
    {
        value: 5,
        label: 'Mei',
    },
    {
        value: 6,
        label: 'Juni',
    },
    {
        value: 7,
        label: 'Juni',
    },
    {
        value: 8,
        label: 'Agustus',
    },
    {
        value: 9,
        label: 'September',
    },
    {
        value: 10,
        label: 'Oktober',
    },
    {
        value: 11,
        label: 'November',
    },
    {
        value: 12,
        label: 'Desember',
    },
] as const;

export const ERROR_LIST: ErrorType[] = [
    {
        statusCode: 404,
        title: 'Page not found',
        heading: 'Sorry, We Can\'t Find That Page',
        description: 'We couldn\'t find the page you were looking for. It may have been moved or no longer exists. Let\'s get you back on track. Click below to return to the homepage.',
    },
    {
        statusCode: 500,
        title: 'Internal server error',
        heading: 'Sorry, Unexpected Error Occurred',
        description: 'Something went wrong on our end. We\'re working to fix it as soon as possible. Let\'s get you back on track. Click below to return to the homepage.',
    },
] as const;

export const USER_TYPE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER',
    GUEST: 'GUEST',
} as const;

export const USER_TYPE_VARIANTS: Record<UserType, StatusVariants> = {
    SUPER_ADMIN: 'primary',
    ADMIN: 'indigo',
    MEMBER: 'warning',
    GUEST: 'danger',
};

export const DASHBOARD_MENUS: DashboardMenu[] = [
    {
        name: 'Dashboard',
        requireAdmin: false,
        children: [
            {
                name: 'Dashboard',
                hrefName: 'index',
                path: '/',
                icon: 'lucide:gauge',
                userType: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN],
            },
        ],
    },
    {
        name: 'Manajemen Akun',
        requireAdmin: true,
        children: [
            {
                name: 'User',
                hrefName: 'user',
                path: '/user',
                icon: 'lucide:users',
                userType: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN],
            },
            {
                name: 'Member',
                hrefName: 'member',
                path: '/member',
                icon: 'lucide:book-user',
                userType: [USER_TYPE.SUPER_ADMIN],
            },
        ],
    },
    {
        name: 'Transaksi',
        requireAdmin: true,
        children: [
            {
                name: 'Pembacaan Meteran',
                hrefName: 'meter-reading',
                path: '/meter-reading',
                icon: 'lucide:ruler',
                userType: [USER_TYPE.SUPER_ADMIN],
            },
            {
                name: 'Tagihan Air',
                hrefName: 'water-bill',
                path: '/water-bill',
                icon: 'lucide:calculator',
                userType: [USER_TYPE.SUPER_ADMIN],
            },
        ],
    },
    {
        name: 'Konfigurasi',
        requireAdmin: true,
        children: [
            {
                name: 'Area',
                hrefName: 'area',
                path: '/area',
                icon: 'lucide:map-pin',
                userType: [USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN],
            },
            {
                name: 'Konfigurasi Umum',
                hrefName: 'general-config',
                path: '/general-config',
                icon: 'lucide:settings',
                userType: [USER_TYPE.SUPER_ADMIN],
            },
        ],
    },
] as const;

export const STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
} as const;

export const STATUS_VARIANTS: Record<Status, StatusVariants> = {
    ACTIVE: 'success',
    INACTIVE: 'danger',
} as const;

export const METER_READING_STATUS = {
    INITIAL: 'INITIAL',
    READ: 'READ',
    CALCULATE: 'CALCULATE',
} as const;

export const METER_READING_STATUS_VARIANTS: Record<WaterReadingStatus, StatusVariants> = {
    INITIAL: 'primary',
    READ: 'indigo',
    CALCULATE: 'success',
} as const;

export const GENERAL_CONFIG_DATA_TYPE = {
    TEXT: 'TEXT',
    NUMERIC: 'NUMERIC',
    BOOLEAN: 'BOOLEAN',
    DATE: 'DATE',
    LIST: 'LIST',
    MAP: 'MAP',
    PATH: 'PATH',
    URL: 'URL',
    OTHER: 'OTHER',
} as const;

export const GENERAL_CONFIG_DATA_TYPE_VARIANTS: Record<GeneralConfigDataType, StatusVariants> = {
    LIST: 'success',
    BOOLEAN: 'danger',
    DATE: 'indigo',
    MAP: 'info',
    NUMERIC: 'pink',
    OTHER: 'primary',
    PATH: 'secondary',
    TEXT: 'warning',
    URL: 'emerald',
} as const;
