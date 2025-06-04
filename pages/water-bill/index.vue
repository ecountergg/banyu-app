<script setup lang="ts">
import type { WaterBillListResponse } from '~/models/WaterBill';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VAccordion from '~/components/base/VAccordion/VAccordion.vue';
import VLink from '~/components/base/VLink/VLink.vue';
import VText from '~/components/base/VText/VText.vue';
import FilterWaterBill from '~/components/modules/Filters/FilterWaterBill.vue';
import { useQueryWaterBillList } from '~/composables/water-bill/queries/useQueryWaterBillList';
import { WaterBillPaginationSearchParams } from '~/models/params/WaterBillPaginationSearchParams';

definePageMeta({
    layout: false,
    middleware: ['auth', 'combined-auth'],
    name: 'water-bill',
});

useSeoMeta({
    title: 'Tagihan',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Tagihan',
        })
        .build(),
);

const params = reactive(new WaterBillPaginationSearchParams());
const search = reactive({
    count: 0,
});
const modal = reactive({
    report: false,
});

const { results, total, isLoading } = useQueryWaterBillList(params, search.count);

const handleDownload = () => {
    modal.report = true;
};

const columns = computed(() =>
    new TableColumnBuilder<WaterBillListResponse>()
        .setColumn({
            key: 'billNumber',
            sortKey: 'billNumber',
            name: 'No Tagihan',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-primary-500 hover:underline font-bold underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'water-bill-detail', params: { id: row.id } },
            }, () => truncateString(row.billNumber, 20)),
        })
        .setColumn({
            key: 'billDate',
            sortKey: 'billDate',
            name: 'Tanggal Tagihan',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.billDate)),
        })
        .setColumn({
            key: 'dueDate',
            sortKey: 'dueDate',
            name: 'Jatuh Tempo',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.dueDate)),
        })
        .setColumn({
            key: 'areaCode',
            sortKey: 'areaCode',
            name: 'Kode Area',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.areaCode)),
        })
        .setColumn({
            key: 'memberName',
            sortKey: 'm.fullName',
            name: 'Nama Member',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.memberName)),
        })
        .setColumn({
            key: 'createdDate',
            sortKey: 'createdDate',
            name: 'Tanggal Dibuat',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.createdDate)),
        })
        .setColumn({
            key: 'lastModifiedDate',
            sortKey: 'wd.modifiedDate',
            name: 'Tanggal Diubah',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.lastModifiedDate)),
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
                    @click="handleDownload"
                >
                    Untuh Laporan
                    <Icon name="lucide:download" />
                </VButton>
            </VFlex>
        </template>
        <VAccordion>
            <VAccordionItem value="item-1">
                <template #title>
                    <p class="text-primary">
                        Filter
                    </p>
                </template>
                <template #default>
                    <FilterWaterBill
                        :params="params"
                    />
                </template>
            </VAccordionItem>
        </VAccordion>

        <VTable
            v-model:sort-key="params.sort"
            v-model:sort-direction="params.direction"
            v-model:page="params.page"
            v-model:per-page="params.size"
            title="Tagihan"
            :entries="results"
            with-number
            :columns="columns"
            :total="total"
            :loading="isLoading"
            class="mt-4"
        />

        <VDialog
            v-model:open="modal.report"
            title="Unduh Report"
        >
            <FilterDownloadReport @close="modal.report = false" />
        </VDialog>
    </NuxtLayout>
</template>
