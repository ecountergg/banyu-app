<script setup lang="ts">
import type { MeterReadingEstimateRate } from '~/models/MeterReading';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VText from '~/components/base/VText/VText.vue';
import { useMutationWaterBillDelete } from '~/composables/water-bill/mutations/useMutationWaterBillDelete';
import { useMutationWaterBillInitPayment } from '~/composables/water-bill/mutations/useMutationWaterBillInitPayment';
import { useMutationGetWaterBillDetail } from '~/composables/water-bill/queries/useQueryWaterBillDetail';
import { useMutationGetWaterBillDownload } from '~/composables/water-bill/queries/useQueryWaterBillDownload';
import { MONTH } from '~/constants';
import { WaterBillDto } from '~/models/dtos/WaterBillDto';

definePageMeta({
    layout: false,
    middleware: ['auth', 'combined-auth'],
    name: 'water-bill-detail',
});

useSeoMeta({
    title: 'Detil Tagihan',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Tagihan',
            to: { name: 'water-bill' },
        })
        .setBreadcrumb({
            name: 'Tagihan Detil',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { showNotification } = useNotification();
const { handleCustomConfirmationReason, handleArchiveConfirmation } = useDialog();
const queryClient = useQueryClient();
const { mutateAsync: getWaterBillDetail } = useMutationGetWaterBillDetail();
const waterBillDetail = await getWaterBillDetail({ id: id.value });
const { mutate: mutateInitPayment } = useMutationWaterBillInitPayment(waterBillDetail.billNumber, {
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibayar',
            message: `Tagihan berhasil dibayar`,
        });
    },
});
queryClient.setQueryData(['water-bill-detail'], waterBillDetail);
const { mutateAsync: downloadWaterBill } = useMutationGetWaterBillDownload({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diunduh',
            message: `Tagihan berhasil diunduh - ${waterBillDetail.billNumber}`,
        });

        downloadFilePdf(data, `Tagihan - ${waterBillDetail.billNumber} - ${formatEpochToDateTime(new Date())}`);
    },
});

const { mutateAsync: deleteWaterBill } = useMutationWaterBillDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Tagihan air telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['water-bill-list'],
        });
        navigateTo({ name: 'water-bill' });
    },
});

const handleInitPayment = async () => {
    const response = await handleCustomConfirmationReason({
        title: 'Bayar Tagihan',
        message: 'Apakah Anda yakin ingin membayar tagihan ini?',
        classHeadingIcon: 'bg-primary-100 text-primary-600 dark:text-primary-600',
        confirmVariant: 'primary',
        confirmText: 'Ya, Bayar',
        icon: 'lucide:calculator',
        reason: true,
    });

    mutateInitPayment(
        new WaterBillDto().setNotes(response),
    );
};

const handleDelete = handleArchiveConfirmation(async () => {
    deleteWaterBill(waterBillDetail.id);
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
                    variant="primary"
                    @click="handleInitPayment()"
                >
                    Bayar Tagihan
                    <Icon name="lucide:calculator" />
                </VButton>
                <VButton
                    variant="info"
                    @click="downloadWaterBill({ id })"
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
        <VCard title="Tagihan Detil">
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
                    {{ stringOrFallback(waterBillDetail.billNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Kode Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillDetail.areaCode, '-') }}
                </VDescription>
                <VDescription
                    title="Nama Member"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillDetail.memberName, '-') }}
                </VDescription>
                <VDescription
                    title="Tanggal Tagihan"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillDetail.billDate) }}
                </VDescription>
                <VDescription
                    title="Jatuh Tempo"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillDetail.dueDate) }}
                </VDescription>
                <VDescription
                    title="Tahun"
                    title-class="text-secondary"
                >
                    {{ waterBillDetail.year }}
                </VDescription>
                <VDescription
                    title="Bulan"
                    title-class="text-secondary"
                >
                    {{ MONTH[waterBillDetail.month - 1].label }}
                </VDescription>
                <VDescription
                    title="Tanggal Dibuat"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillDetail.createdDate) }}
                </VDescription>
                <VDescription
                    title="Tanggal Diubah"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(waterBillDetail.lastModifiedDate) }}
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
                    {{ formatCurrency(waterBillDetail.detail.consumption) }}
                </VDescription>
                <VDescription
                    title="Jumlah"
                    title-class="text-secondary"
                >
                    Rp {{ formatCurrency(waterBillDetail.detail.amount) }}
                </VDescription>
                <VDescription
                    title="Biaya Beban"
                    title-class="text-secondary"
                >
                    Rp {{ formatCurrency(waterBillDetail.detail.adminFee) }}
                </VDescription>
                <VDescription
                    title="Total"
                    title-class="text-secondary"
                >
                    Rp {{ formatCurrency(waterBillDetail.detail.amount + waterBillDetail.detail.adminFee) }}
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
                :entries="waterBillDetail.detail.rates"
                :cardable="false"
                :hide-header="true"
                :hide-footer="true"
                :sortable="false"
                with-number
            />
        </VCard>
    </NuxtLayout>
</template>
