<script setup lang="ts">
import type { MeterReadingEstimateRate } from '~/models/MeterReading';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VText from '~/components/base/VText/VText.vue';
import { useMutationWaterBillPaidDelete } from '~/composables/water-bill-paid/mutations/useMutationWaterBillPaidDelete';
import { useMutationGetWaterBillPaidDetail } from '~/composables/water-bill-paid/queries/useQueryWaterBillPaidDetail';
import { useMutationGetWaterBillPaidDownload } from '~/composables/water-bill-paid/queries/useQueryWaterBillPaidDownload';
import { MONTH, PAID_STATUS_VARIANTS } from '~/constants';

definePageMeta({
    layout: false,
    middleware: ['auth', 'combined-auth'],
    name: 'bill-paid-detail',
});

useSeoMeta({
    title: 'Detil Tagihan Dibayar',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Tagihan Dibayar',
            to: { name: 'bill-paid' },
        })
        .setBreadcrumb({
            name: 'Tagihan Dibayar Detil',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getWaterBillPaidDetail } = useMutationGetWaterBillPaidDetail();
const waterBillPaidDetail = await getWaterBillPaidDetail({ id: id.value });
queryClient.setQueryData(['water-bill-detail'], waterBillPaidDetail);
const { mutateAsync: downloadWaterBillPaid } = useMutationGetWaterBillPaidDownload({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diunduh',
            message: `Tagihan dibayar berhasil diunduh - ${waterBillPaidDetail.billNumber}`,
        });

        downloadFilePdf(data, `Tagihan dibayar - ${waterBillPaidDetail.billNumber} - ${formatEpochToDateTime(new Date())}`);
    },
});
const { handleArchiveConfirmation } = useDialog();

const { mutateAsync: deleteWaterBillPaid } = useMutationWaterBillPaidDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Tagihan dibayar telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['water-bill-paid-list'],
        });
        navigateTo({ name: 'bill-paid' });
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    deleteWaterBillPaid(waterBillPaidDetail.id);
});

const columns = computed(() =>
    new TableColumnBuilder<MeterReadingEstimateRate>()
        .setColumn({
            key: 'consumption',
            sortKey: 'consumption',
            name: 'Konsumsi',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatCurrency(row.consumption)),
        })
        .setColumn({
            key: 'rate',
            sortKey: 'rate',
            name: 'Tarif',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => `Rp ${formatCurrency(row.rate)}`),
        })
        .setColumn({
            key: 'amount',
            sortKey: 'amount',
            name: 'Jumlah',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => `Rp ${formatCurrency(row.amount)}`),
        })
        .build(),
);
</script>

<template>
    <NuxtLayout name="default">
        <template #header-actions>
            <VFlex
                direction="row"
                gap="4"
            >
                <VButton
                    variant="info"
                    @click="downloadWaterBillPaid({ id })"
                >
                    Unduh Invoice
                    <Icon name="lucide:download" />
                </VButton>
                <VButton
                    variant="danger"
                    @click="handleDelete"
                >
                    Hapus
                    <Icon name="lucide:trash" />
                </VButton>
            </VFlex>
        </template>
        <VCard title="Tagihan Dibayar Detil">
            <VGrid
                type="cols"
                md="3"
                sm="1"
                gap="4"
                class="md:grid-cols-3 sm:grid-cols-1"
            >
                <VDescription
                    title="No Tagihan"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillPaidDetail.billNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Tanggal Tagihan"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillPaidDetail.billDate) }}
                </VDescription>
                <VDescription
                    title="Jatuh Tempo"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillPaidDetail.dueDate) }}
                </VDescription>
                <VDescription
                    title="Tanggal Dibayar"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillPaidDetail.paidDate) }}
                </VDescription>
                <VDescription
                    title="Kode Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillPaidDetail.areaCode, '-') }}
                </VDescription>
                <VDescription
                    title="Nama Member"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillPaidDetail.memberName, '-') }}
                </VDescription>
                <VDescription
                    title="Status"
                    title-class="text-secondary"
                >
                    <VBadge
                        :variant="PAID_STATUS_VARIANTS[waterBillPaidDetail.status]"
                        class="w-max"
                    >
                        {{ waterBillPaidDetail.status }}
                    </VBadge>
                </VDescription>
                <VDescription
                    title="Tahun"
                    title-class="text-secondary"
                >
                    {{ waterBillPaidDetail.year }}
                </VDescription>
                <VDescription
                    title="Bulan"
                    title-class="text-secondary"
                >
                    {{ MONTH[waterBillPaidDetail.month - 1].label }}
                </VDescription>
                <VDescription
                    title="Tanggal Dibuat"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillPaidDetail.createdDate) }}
                </VDescription>
                <VDescription
                    title="Tanggal Diubah"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillPaidDetail.lastModifiedDate) }}
                </VDescription>
            </VGrid>
        </VCard>
        <VCard
            title="Estimasi Pembayaran"
            class="mt-4"
        >
            <VGrid
                type="cols"
                md="3"
                sm="1"
                gap="4"
                class="md:grid-cols-3 sm:grid-cols-1"
            >
                <VDescription
                    title="Konsumsi"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(waterBillPaidDetail.detail.consumption) }}
                </VDescription>
                <VDescription
                    title="Jumlah"
                    title-class="text-secondary"
                >
                    Rp {{ formatCurrency(waterBillPaidDetail.detail.amount) }}
                </VDescription>
                <VDescription
                    title="Biaya Beban"
                    title-class="text-secondary"
                >
                    Rp {{ formatCurrency(waterBillPaidDetail.detail.adminFee) }}
                </VDescription>
                <VDescription
                    title="Total"
                    title-class="text-secondary"
                >
                    Rp {{ formatCurrency(waterBillPaidDetail.detail.amount + waterBillPaidDetail.detail.adminFee) }}
                </VDescription>
            </VGrid>
            <VText
                as="h2"
                class="font-bold mt-14"
            >
                Daftar Tarif
            </VText>

            <VTable
                :columns="columns"
                :entries="waterBillPaidDetail.detail.rates"
                :cardable="false"
                :hide-header="true"
                :hide-footer="true"
                :sortable="false"
                with-number
            />
        </VCard>
    </NuxtLayout>
</template>
