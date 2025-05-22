// combined-auth-middleware.ts
import { navigateTo } from '#app';
import { toast } from 'vue-sonner';
import { useMutationGetMeDetail } from '~/composables/me/queries/useQueryMeDetail';
import { USER_TYPE } from '~/constants';

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
    const { mutateAsync: getDetailProfile } = useMutationGetMeDetail();

    if (authStore.token && !authStore.user) {
        try {
            await getDetailProfile();
        }
        catch (error) {
            console.warn(error);
            toast.error('Your session has expired. Please login again.');
            authStore.logout();
            return navigateTo({ name: 'login' });
        }
    }

    if (authStore.user?.userType === USER_TYPE.SUPER_ADMIN || authStore.user?.userType === USER_TYPE.ADMIN)
        return;

    return navigateTo({ name: 'index' });
});
