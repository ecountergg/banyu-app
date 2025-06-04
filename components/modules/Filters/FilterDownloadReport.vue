<script setup lang="ts">
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { useMutationReportBillCustomerDownload } from '~/composables/report-bill-customer/useMutationReportBillCustomerDownload';
import { MONTH } from '~/constants';
import { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';
import { ReportBillCustomerSearchParams } from '~/models/params/ReportBillCustomerSearchParams';

type Emits = {
    close: [];
};

const emits = defineEmits<Emits>();

const state = reactive({
    ...new ReportBillCustomerSearchParams()
        .setAreaCodes([])
        .setBillNumber('')
        .setMonth(new Date().getMonth())
        .setYear(new Date().getFullYear()),
});

const { showNotification } = useNotification();
const params = reactive(new AreaPaginationSearchParams());
const searchCount = shallowRef<number>(0);
const { results: areaList, isLoading: isLoadingAreaList } = useQueryAreaList(params, searchCount);

const { mutate: downloadReportBillCustomer, isPending: isPendingDownloadReport } = useMutationReportBillCustomerDownload({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diunduh',
            message: 'Tagihan dibayar berhasil diunduh',
        });

        downloadFilePdf(data, `Laporan Pelanggan ${formatEpochToDateTime(new Date())}`);
    },
});

const handleSearchArea = (val?: string) => {
    params.setCode(val);
};

const onSubmit = () => {
    downloadReportBillCustomer(new ReportBillCustomerSearchParams().setAreaCodes(state.areaCodes).setBillNumber(state.billNumber).setYear(state.year).setMonth(state.month));
};
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VFlex
            direction="col"
            gap="4"
        >
            <VMultiSelect
                v-model="state.areaCodes"
                name="areaCode"
                label="Pilih Kode Area"
                :options="areaList"
                value-key="code"
                label-key="code"
                placeholder="Mohon pilih kode area"
                size="lg"

                clearable
                :loading="isLoadingAreaList"
                searchable
                as-async
                @search-change="(val) => handleSearchArea(val)"
            />
            <VInput
                v-model="state.billNumber"
                placeholder="Masukan nomor tagihan"
                name="billNumber"
                label="Nomor Tagihan"
            />
            <VSelect
                v-model:model-value="state.year"
                name="year"
                label="Pilih Tahun"
                :options="generateYears()"
                placeholder="Mohon pilih tahun"
                value-key="value"
                label-key="label"
                size="lg"

                clearable
                :searchable="false"
            />
            <VSelect
                v-model:model-value="state.month"
                name="month"
                label="Pilih Bulan"
                :options="MONTH"
                placeholder="Mohon pilih bulan"
                value-key="value"
                label-key="label"
                size="lg"
                clearable

                :searchable="false"
            />
        </VFlex>
        <VFlex
            gap="4"
            class="mt-12"
            direction="row"
        >
            <VButton
                variant="secondary"
                @click="emits('close')"
            >
                Batal
            </VButton>
            <VButton
                variant="primary"
                type="submit"
                :loading="isPendingDownloadReport"
                :disabled="isPendingDownloadReport"
            >
                Unduh
                <Icon name="lucide:download" />
            </VButton>
        </VFlex>
    </form>
</template>
