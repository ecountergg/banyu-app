<script setup lang="ts">
import type { MeterReadingDetailResponse } from '~/models/MeterReading';
import { now } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useQueryMemberList } from '~/composables/member/queries/useQueryMemberList';
import { useMutationMeterReadingCreate } from '~/composables/meter-reading/mutations/useMutationMeterReadingCreate';
import { useMutationMeterReadingUpdate } from '~/composables/meter-reading/mutations/useMutationMeterReadingUpdate';
import { MeterReadingDto } from '~/models/dtos/MeterReadingDto';
import { MemberPaginationSearchParams } from '~/models/params/MemberPaginationSearchParams';

const { data } = defineProps<{
    data?: MeterReadingDetailResponse;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new MeterReadingDto()
        .setMeterNumber(stringOrEmpty(data?.meterNumber))
        .setReadingDate(data ? convertEpochToDate(data.readingDate) : new Date(now()))
        .setPreviousReading(numberOrZero(0))
        .setCurrentReading(numberOrZero(data?.currentReading))
        .setNotes(stringOrNull(data?.notes))
        .setVersion(numberOrZero(data?.version)),
    id: stringOrEmpty(data?.id),
});

const { showNotification } = useNotification();
const memberQueryParams = reactive(new MemberPaginationSearchParams());
const memberSearchCount = shallowRef<number>(0);
const { results: memberList, isLoading: isLoadingMemberist } = useQueryMemberList(memberQueryParams, memberSearchCount);
const { mutate: createMeterReading, isPending: isPendingCreateMeterReading } = useMutationMeterReadingCreate({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Pembacaan meteran berhasil dibuat`,
        });
        navigateTo({ name: 'meter-reading' });
    },
});

const { mutate: updateMeterReading, isPending: isPendingUpdateMeterReading } = useMutationMeterReadingUpdate(state.id, {
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Pembacaan meteran berhasil diperbarui`,
        });
        navigateTo({ name: 'meter-reading' });
    },
});

const schema = yup.object({
    meterNumber: yup.string().required('No meter harus diisi'),
    readingDate: yup.date().required('Tanggal pembacaan harus diisi'),
    currentReading: yup.number().typeError('Bacaan saat ini harus angka').required('Bacaan saat ini harus diisi'),
    notes: yup.string().nullable(),
    version: yup.string(),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const handleSearchMember = (val?: string) => {
    memberQueryParams.setFullname(val);
};

const onSubmit = handleSubmit(async () => {
    const stateMeterReading = () => {
        return new MeterReadingDto()
            .setMeterNumber(stringOrEmpty(state.meterNumber))
            .setReadingDate(numberOrZero(formatDateToEpoch(state.readingDate)))
            .setPreviousReading(numberOrZero(0))
            .setCurrentReading(numberOrZero(state.currentReading))
            .setNotes(stringOrNull(state.notes))
            .setVersion(numberOrZero(state.version));
    };

    if (data) {
        updateMeterReading(stateMeterReading());
        return;
    }

    createMeterReading(stateMeterReading());
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VCard
            title="Form Pembacaan Meteran"
            class="h-full"
        >
            <VFlex
                direction="col"
                gap="4"
            >
                <VSelect
                    v-model:model-value="state.meterNumber"
                    name="meterNumber"
                    label="Pilih No Meter"
                    :options="memberList"
                    placeholder="Mohon pilih no meter"
                    value-key="meterNumber"
                    label-key="fullName"
                    size="lg"
                    clearable
                    :loading="isLoadingMemberist"
                    searchable
                    as-async
                    @search-change="(val) => handleSearchMember(val)"
                />
                <VInputDate
                    v-model="state.readingDate"
                    placeholder="Masukan Tanggal Pembacaan"
                    name="readingDate"
                    label="Tanggal Pembacaan"
                    required
                />
                <VInput
                    v-model="state.currentReading"
                    placeholder="Masukan Bacaan Saat Ini"
                    name="currentReading"
                    label="Bacaan Saat Ini"
                    type="number"
                    min="0"
                    required
                />
                <VTextarea
                    v-model="state.notes"
                    placeholder="Masukan Catatan"
                    name="notes"
                    label="Catatan"
                />
            </VFlex>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'meter-reading' }"
                >
                    Batal
                </VLink>
                <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateMeterReading || isPendingUpdateMeterReading
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
            </VFlex>
        </VCard>
    </form>
</template>
