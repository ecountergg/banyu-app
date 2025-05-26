<script setup lang="ts">
import type { WaterBillPaidListResponse } from '~/models/WaterBillPaid';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VAccordion from '~/components/base/VAccordion/VAccordion.vue';
import VLink from '~/components/base/VLink/VLink.vue';
import VText from '~/components/base/VText/VText.vue';
import FilterWaterBillPaid from '~/components/modules/Filters/FilterWaterBillPaid.vue';
import { useQueryWaterBillPaidList } from '~/composables/water-bill-paid/queries/useQueryWaterBillPaidList';
import { WaterBillPaidPaginationSearchParams } from '~/models/params/WaterBillPaidPaginationSearchParams';

definePageMeta({
    layout: false,
    middleware: ['auth', 'combined-auth'],
    name: 'bill-paid',
});

useSeoMeta({
    title: 'Tagihan Dibayar',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Tagihan Dibayar',
        })
        .build(),
);

const params = reactive(new WaterBillPaidPaginationSearchParams());
const search = reactive({
    count: 0,
});

const { results, total, isLoading } = useQueryWaterBillPaidList(params, search.count);

const columns = computed(() =>
    new TableColumnBuilder<WaterBillPaidListResponse>()
        .setColumn({
            key: 'billNumber',
            sortKey: 'billNumber',
            name: 'No Tagihan',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-primary-500 hover:underline font-bold underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'bill-paid-detail', params: { id: row.id } },
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
            key: 'paidDate',
            sortKey: 'paidDate',
            name: 'Tanggal Dibayar',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.paidDate)),
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
        .build(),
);
</script>

<template>
    <NuxtLayout name="default">
        <VAccordion>
            <VAccordionItem value="item-1">
                <template #title>
                    <p class="text-primary">
                        Filter
                    </p>
                </template>
                <template #default>
                    <FilterWaterBillPaid
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
            title="Tagihan Dibayar"
            :entries="results"
            with-number
            :columns="columns"
            :total="total"
            :loading="isLoading"
            class="mt-4"
        />
    </NuxtLayout>
</template>
