import type { App } from 'vue';
import type { APPLICATION_STATUS } from '~/constants';

export type SetupModule = (app: App<Element>) => void;
export type ObjectValues<Type> = Type[keyof Type];
export type ObjectKeys<Type> = keyof Type;
export type Nullable<Type> = Type | null;
export type Undefined<Type> = Type | undefined;

export type SelectOption<TValue, TLabel> = {
    label: TLabel;
    value: TValue;
};

export type GenericPagination<TResult> = {
    data: TResult;
    elements: number;
    pages: number;
};

export type ErrorResponse = {
    code: string;
    message: string;
};

export type ErrorType = {
    statusCode: number;
    title: string;
    heading: string;
    description: string;
};

export type DashboardMenu = {
    name: string;
    requireAdmin: boolean;
    children: {
        name: string;
        hrefName: string;
        path: string;
        icon: string;
    }[];
};

export type LoginResponse = {
    token: string;
};

export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type StatusVariants = 'success' | 'warning' | 'danger' | 'primary' | 'indigo' | 'info' | 'secondary' | 'pink';
export type BucketType = 'PRIVATE' | 'PUBLIC';
export type ContentType = 'BLOG' | 'PORTFOLIO' | 'CAREER' | 'LEGAL' | 'OTHER';
export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';
export type UserType = 'ADMIN' | 'AUTHOR' | 'MEMBER' | 'GUEST';
export type GeneralSeo = {
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
};
export type StatusAction = {
    name: ContentStatus;
    label: string;
    variant: StatusVariants;
    icon: string;
};
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

export type StatusOption = {
    label: string;
    value: ApplicationStatus;
};
