<script setup lang="ts">
import type { GeneralConfigDetailResponse } from '~/models/GeneralConfig';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useMutationGeneralConfigCreate } from '~/composables/general-config/mutations/useMutationGeneralConfigCreate';
import { useMutationGeneralConfigUpdate } from '~/composables/general-config/mutations/useMutationGeneralConfigUpdate';
import { GENERAL_CONFIG_DATA_TYPE } from '~/constants';
import { GeneralConfigDto } from '~/models/dtos/GeneralConfigDto';

const { data, action } = defineProps<{
    data?: GeneralConfigDetailResponse;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new GeneralConfigDto()
        .setCode(stringOrEmpty(data?.code))
        .setDataType(valueOrFallback(GENERAL_CONFIG_DATA_TYPE.TEXT, data?.dataType))
        .setValue(stringOrEmpty(data?.value)),
    code: stringOrEmpty(data?.code),
});
const generalConfigDataTypeList = Object.values(GENERAL_CONFIG_DATA_TYPE).map((status) => {
    return {
        label: status,
        value: status,
    };
});

const { showNotification } = useNotification();
const { mutate: createGeneralConfig, isPending: isPendingCreateGeneralConfig } = useMutationGeneralConfigCreate({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Konfigurasi umum berhasil dibuat - ${data.code}`,
        });
        navigateTo({ name: 'general-config' });
    },
});

const { mutate: updateGeneralConfig, isPending: isPendingUpdateGeneralConfig } = useMutationGeneralConfigUpdate(state.code, {
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Konfigurasi umum berhasil diperbarui - ${data.code}`,
        });
        navigateTo({ name: 'general-config' });
    },
});

const schema = yup.object({
    code: yup.string().required('Kode harus diisi'),
    dataType: yup.string().required('Tipe data harus diisi'),
    value: yup.string().required('Nilai harus diisi'),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async () => {
    const stateGeneralConfig = () => {
        return new GeneralConfigDto()
            .setCode(stringOrEmpty(state.code))
            .setDataType(valueOrFallback(GENERAL_CONFIG_DATA_TYPE.TEXT, state.dataType))
            .setValue(stringOrEmpty(state.value));
    };

    if (data) {
        updateGeneralConfig(stateGeneralConfig());
        return;
    }

    createGeneralConfig(stateGeneralConfig());
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VCard
            title="Form Konfigurasi Umum"
            class="h-full"
        >
            <VFlex
                direction="col"
                gap="4"
            >
                <VInput
                    v-model="state.code"
                    placeholder="Masukan Kode"
                    name="code"
                    label="Kode"
                    required
                    :disabled="action === 'update'"
                />

                <VSelect
                    v-model="state.dataType"
                    name="dataType"
                    label="Pilih Tipe Data"
                    :options="generalConfigDataTypeList"
                    placeholder="Mohon pilih tipe data"
                    value-key="value"
                    label-key="label"
                    required
                    size="lg"
                    clearable
                    :searchable="false"
                />
                <VInput
                    v-model="state.value"
                    placeholder="Masukan Nilai"
                    name="value"
                    label="Nilai"
                    required
                />
            </VFlex>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'general-config' }"
                >
                    Batal
                </VLink>
                <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateGeneralConfig || isPendingUpdateGeneralConfig
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
            </VFlex>
        </VCard>
    </form>
</template>
