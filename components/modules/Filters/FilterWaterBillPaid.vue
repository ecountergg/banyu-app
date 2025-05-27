<script setup lang="ts">
import type { WaterBillPaginationSearchParams } from '~/models/params/WaterBillPaginationSearchParams';
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { useQueryMemberList } from '~/composables/member/queries/useQueryMemberList';
import { MONTH } from '~/constants';
import { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';
import { MemberPaginationSearchParams } from '~/models/params/MemberPaginationSearchParams';

const props = defineProps<{
    params: WaterBillPaginationSearchParams;
}>();

const filter = reactive(props.params);

const areaQueryParams = reactive(new AreaPaginationSearchParams());
const areaSearchCount = shallowRef<number>(0);
const memberQueryParams = reactive(new MemberPaginationSearchParams());
const memberSearchCount = shallowRef<number>(0);
const { results: areaList, isLoading: isLoadingAreaList } = useQueryAreaList(areaQueryParams, areaSearchCount);
const { results: memberList, isLoading: isLoadingMemberist } = useQueryMemberList(memberQueryParams, memberSearchCount);

const handleSearchMember = (val?: string) => {
    memberQueryParams.setFullname(val);
};

const handleSearchArea = (val?: string) => {
    areaQueryParams.setCode(val);
};
</script>

<template>
    <form>
        <VGrid
            type="cols"
            md="2"
            sm="1"
            gap="4"
            class="md:grid-cols-2 sm:grid-cols-1 pt-4"
        >
            <VMultiSelect
                v-model:model-value="filter.areaCode"
                name="areaCode"
                label="Pilih Kode Area"
                :options="areaList"
                placeholder="Mohon pilih kode area"
                size="lg"
                value-key="code"
                label-key="code"
                clearable
                :loading="isLoadingAreaList"
                as-async
                searchable
                @search-change="(val) => handleSearchArea(val)"
            />
            <VSelect
                v-model:model-value="filter.memberName"
                name="memberName"
                label="Pilih Member"
                :options="memberList"
                placeholder="Mohon pilih member"
                value-key="fullName"
                label-key="fullName"
                size="lg"
                clearable
                :loading="isLoadingMemberist"
                searchable
                as-async
                @search-change="(val) => handleSearchMember(val)"
            />
            <VSelect
                v-model:model-value="filter.year"
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
                v-model:model-value="filter.month"
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
        </VGrid>
    </form>
</template>
