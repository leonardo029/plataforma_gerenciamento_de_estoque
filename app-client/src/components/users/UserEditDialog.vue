<template>
  <v-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    max-width="900"
  >
    <v-card>
      <v-card-title>
        <span class="text-h6">{{
          isEdit ? "Editar Usuário" : "Novo Usuário"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <div class="mb-2 text-subtitle-2">Dados do usuário</div>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                :model-value="form.name"
                @update:model-value="
                  $emit('update:form', { ...form, name: $event })
                "
                label="Nome"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :model-value="form.email"
                @update:model-value="
                  $emit('update:form', { ...form, email: $event })
                "
                label="Email"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :model-value="form.password"
                @update:model-value="
                  $emit('update:form', { ...form, password: $event })
                "
                type="password"
                label="Senha"
                :hint="isEdit ? 'Deixe em branco para manter' : ''"
                :rules="isEdit ? [] : [rules.required, rules.minPassword]"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                :model-value="form.role"
                @update:model-value="
                  $emit('update:form', { ...form, role: $event })
                "
                :items="roles"
                label="Papel"
                :disabled="isEdit"
                :rules="isEdit ? [] : [rules.required]"
              />
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center">
              <v-switch
                :model-value="form.isActivated"
                @update:model-value="
                  $emit('update:form', { ...form, isActivated: $event })
                "
                inset
                label="Ativo"
              />
            </v-col>
          </v-row>

          <div class="mt-4 mb-2 text-subtitle-2">Contato</div>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :model-value.number="form.contact.country_code"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    contact: { ...form.contact, country_code: $event },
                  })
                "
                type="number"
                label="Código do País"
                :rules="[rules.positiveInt]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :model-value.number="form.contact.ddd"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    contact: { ...form.contact, ddd: $event },
                  })
                "
                type="number"
                label="DDD"
                :rules="[rules.positiveInt]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :model-value="form.contact.phone_number"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    contact: { ...form.contact, phone_number: $event },
                  })
                "
                label="Telefone"
                :rules="[rules.phone]"
              />
            </v-col>
          </v-row>

          <div class="mt-4 mb-2 text-subtitle-2">Endereço</div>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                :model-value="selectedStateCode"
                @update:model-value="$emit('update:selectedStateCode', $event)"
                :items="states"
                item-title="name"
                item-value="stateCode"
                label="Estado"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :model-value="form.address.idCity"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, idCity: $event },
                  })
                "
                :items="cities"
                item-title="name"
                item-value="id"
                label="Cidade"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :model-value="form.address.idStreetType"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, idStreetType: $event },
                  })
                "
                :items="streetTypes"
                item-title="name"
                item-value="id"
                label="Tipo de Logradouro"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                :model-value="form.address.street"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, street: $event },
                  })
                "
                label="Logradouro"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :model-value="form.address.complement"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, complement: $event },
                  })
                "
                label="Complemento"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :model-value="form.address.cep"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, cep: $event },
                  })
                "
                label="CEP"
                :rules="[rules.cep]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :model-value.number="form.address.number"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, number: $event },
                  })
                "
                type="number"
                label="Número"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :model-value="form.address.neighborhood"
                @update:model-value="
                  $emit('update:form', {
                    ...form,
                    address: { ...form.address, neighborhood: $event },
                  })
                "
                label="Bairro"
              />
            </v-col>
            <v-col cols="12">
              <div
                v-if="isEdit && currentAddressLabels"
                class="text-caption text-medium-emphasis"
              >
                Atual: {{ currentAddressLabels }}
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="primary" @click="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import type { IStateItem, ICityItem, IStreetTypeItem } from "@/interfaces";
import type { UserForm } from "@/stores/users/users";
import type { PropType } from "vue";

type VFormRef = {
  validate?: () =>
    | Promise<boolean | { valid: boolean }>
    | boolean
    | { valid: boolean };
  reset?: () => void;
  resetValidation?: () => void;
};

export default {
  name: "UserEditDialog",
  props: {
    dialog: { type: Boolean, required: true },
    isEdit: { type: Boolean, required: true },
    form: { type: Object as PropType<UserForm>, required: true },
    rules: { type: Object, required: true },
    roles: {
      type: Array as PropType<Array<{ title: string; value: string }>>,
      required: true,
    },
    states: { type: Array as PropType<IStateItem[]>, required: true },
    cities: { type: Array as PropType<ICityItem[]>, required: true },
    streetTypes: { type: Array as PropType<IStreetTypeItem[]>, required: true },
    selectedStateCode: {
      type: Number as PropType<number | null>,
      required: false,
    },
    currentAddressLabels: { type: String, required: true },
  },
  emits: [
    "update:dialog",
    "update:form",
    "update:selectedStateCode",
    "close",
    "submit",
  ],
  methods: {
    async submit() {
      const form = this.$refs.formRef as VFormRef | undefined;
      const res = await (form?.validate?.() ?? true);
      const valid = typeof res === "boolean" ? res : !!(res as any)?.valid;
      if (!valid) return;
      this.$emit("submit");
    },
  },
};
</script>
