<script setup lang="ts">
import type { MeterReadingEstimateRate } from '~/models/MeterReading';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VText from '~/components/base/VText/VText.vue';
import { useMutationWaterBillInitPayment } from '~/composables/water-bill/mutations/useMutationWaterBillInitPayment';
import { useMutationGetWaterBillDetail } from '~/composables/water-bill/queries/useQueryWaterBillDetail';
import { useMutationGetWaterBillDownload } from '~/composables/water-bill/queries/useQueryWaterBillDownload';
import { MONTH } from '~/constants';
import { WaterBillDto } from '~/models/dtos/WaterBillDto';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'water-bill-detail',
});

useSeoMeta({
    title: 'Detil Pembacaan Meteran',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Pembacaan Meteran',
            to: { name: 'meter-reading' },
        })
        .setBreadcrumb({
            name: 'Pembacaan Meteran Detil',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { showNotification } = useNotification();
const { handleCustomConfirmationReason } = useDialog();
const { mutate: mutateInitPayment } = useMutationWaterBillInitPayment(id.value);
const queryClient = useQueryClient();
const { mutateAsync: getWaterBillDetail } = useMutationGetWaterBillDetail();
const waterBillDetail = await getWaterBillDetail({ id: id.value });
queryClient.setQueryData(['meter-reading-detail'], waterBillDetail);
const { mutateAsync: downloadWaterBill } = useMutationGetWaterBillDownload({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diunduh',
            message: `Tagihan air berhasil diunduh - ${waterBillDetail.billNumber}`,
        });

        downloadFilePdf(data, `Tagihan air berhasil diunduh - ${waterBillDetail.billNumber} - ${formatEpochToDateTime(new Date())}`);
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
            </VFlex>
        </template>
        <VCard title="Pembacaan Meteran Detil">
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
                    title="No Meter"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillDetail.meterNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Kode Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillDetail.areaCode, '-') }}
                </VDescription>
                <VDescription
                    title="Deskripsi Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillDetail.areaDescription, '-') }}
                </VDescription>
                <VDescription
                    title="Nama Member"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(waterBillDetail.memberName, '-') }}
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
                    title="Biaya Konsumsi"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(waterBillDetail.consumptionCharge) }}
                </VDescription>
                <VDescription
                    title="Biaya Lainnya"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(waterBillDetail.otherCharges) }}
                </VDescription>
                <VDescription
                    title="Jumlah Total"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(waterBillDetail.totalAmount) }}
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
