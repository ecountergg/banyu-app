<script setup lang="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationMemberDelete } from '~/composables/member/mutations/useMutationMemberDelete';
import { useMutationGetMemberDetail } from '~/composables/member/queries/useQueryMemberDetail';
import { useMutationWaterMeterStatus } from '~/composables/water-meter/mutations/useMutationWaterMeterStatus';
import { STATUS, STATUS_VARIANTS } from '../../../constants/GeneralConstant';

definePageMeta({
    layout: false,
    middleware: ['auth', 'combined-auth'],
    name: 'member-detail',
});

useSeoMeta({
    title: 'Detil member',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Member',
            to: { name: 'member' },
        })
        .setBreadcrumb({
            name: 'Member Detil',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { handleArchiveConfirmation, handleCustomConfirmation } = useDialog();
const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getMemberDetail } = useMutationGetMemberDetail();
const memberDetail = await getMemberDetail(id.value);
queryClient.setQueryData(['member-detail'], memberDetail);

const { mutate: mutateDeleteMember } = useMutationMemberDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Member telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['member-list'],
        });
        navigateTo({ name: 'member' });
    },
});
const { mutate: mutateActiveMember } = useMutationWaterMeterStatus({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Aktifkan berhasil!',
            message: 'Member telah diaktifkan',
        });
        queryClient.invalidateQueries({
            queryKey: ['member-list'],
        });
        navigateTo({ name: 'member' });
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    mutateDeleteMember(memberDetail.id);
});

const handleActive = handleCustomConfirmation({
    title: 'Aktifkan item ini',
    message: 'Apakah Anda yakin ingin mengaktifkan item ini?',
    confirmText: 'Ya Aktifkan',
    icon: 'lucide:check',
    confirmVariant: 'primary',
    classHeadingIcon: 'bg-primary-100 text-primary-600 dark:text-primary-600',
}, async () => {
    mutateActiveMember(memberDetail.meterNumber);
});
</script>

<template>
    <NuxtLayout name="default">
        <template #header-actions>
            <VFlex
                direction="row"
                gap="4"
            >
                <VButton
                    v-if="memberDetail.meterStatus === STATUS.INACTIVE"
                    variant="success"
                    @click="handleActive"
                >
                    Aktifkan
                    <Icon name="lucide:check" />
                </VButton>
                <VLink
                    variant="secondary"
                    :to="{ name: 'member-edit', params: { id: route.params.id } }"
                >
                    Ubah
                    <Icon name="lucide:circle-plus" />
                </VLink>
                <VButton
                    variant="danger"
                    @click="handleDelete"
                >
                    Hapus
                    <Icon name="lucide:trash" />
                </VButton>
            </VFlex>
        </template>
        <VCard title="Member Detil">
            <VGrid
                type="cols"
                md="3"
                sm="1"
                gap="4"
                class="md:grid-cols-3 sm:grid-cols-1"
            >
                <VDescription
                    title="No Meter"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.meterNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Kode Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.areaCode, '-') }}
                </VDescription>
                <VDescription
                    title="Nama Lengkap"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.fullName, '-') }}
                </VDescription>
                <VDescription
                    title="Email"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.email, '-') }}
                </VDescription>
                <VDescription
                    title="No HP"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.mobileNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Tanggal Instalasi"
                    title-class="text-secondary"
                >
                    {{
                        formatEpochToDate(
                            memberDetail.meterInstallationDate,
                        )
                    }}
                </VDescription>
                <VDescription
                    title="Terakhir Diubah"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(memberDetail.lastModifiedDate) }}
                </VDescription>
                <VDescription
                    title="Status"
                    title-class="text-secondary"
                >
                    <VBadge
                        :variant="STATUS_VARIANTS[memberDetail.meterStatus]"
                        class="w-max"
                    >
                        {{ memberDetail.meterStatus }}
                    </VBadge>
                </VDescription>
            </VGrid>
        </VCard>
    </NuxtLayout>
</template>
