<template>
  <v-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    max-width="800"
  >
    <v-card>
      <v-card-title>
        <span class="text-h6">{{
          isEditing ? "Editar Produto" : "Novo Produto"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="formRef"
          :model-value="formValid"
          @update:model-value="$emit('update:formValid', $event)"
        >
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="form.name"
                  @update:model-value="
                    $emit('update:form', { ...form, name: $event })
                  "
                  label="Nome"
                  :rules="[rules.required, rules.max150]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :model-value="form.identificationCode"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      identificationCode: $event,
                    })
                  "
                  label="Código de Identificação"
                  :rules="[rules.required, rules.max45]"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  :model-value="form.description"
                  @update:model-value="
                    $emit('update:form', { ...form, description: $event })
                  "
                  label="Descrição"
                  :rules="
                    isEditing ? [rules.max255] : [rules.required, rules.max255]
                  "
                  rows="3"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :model-value="form.idBrand"
                  @update:model-value="
                    $emit('update:form', { ...form, idBrand: $event })
                  "
                  :items="brandItems"
                  item-title="name"
                  item-value="id"
                  label="Marca"
                  :rules="[rules.required]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :model-value="form.idCategory"
                  @update:model-value="
                    $emit('update:form', { ...form, idCategory: $event })
                  "
                  :items="categoryItems"
                  item-title="name"
                  item-value="id"
                  label="Categoria"
                  :rules="[rules.required]"
                  required
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :model-value="form.unitOfMeasurement"
                  @update:model-value="
                    $emit('update:form', { ...form, unitOfMeasurement: $event })
                  "
                  :items="['kg', 'g', 'l', 'ml']"
                  label="Unidade de Medida"
                  :rules="[rules.required]"
                  required
                />
              </v-col>
              <v-col cols="12" md="4" v-if="!isEditing">
                <v-switch
                  :model-value="form.isActivated"
                  @update:model-value="
                    $emit('update:form', { ...form, isActivated: $event })
                  "
                  inset
                  label="Ativo"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :model-value="form.nutritionalInformation.portion"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      nutritionalInformation: {
                        ...form.nutritionalInformation,
                        portion: $event,
                      },
                    })
                  "
                  label="Porção"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :model-value.number="form.nutritionalInformation.carbohydrate"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      nutritionalInformation: {
                        ...form.nutritionalInformation,
                        carbohydrate: $event,
                      },
                    })
                  "
                  type="number"
                  label="Carboidratos (g)"
                  :rules="[rules.number]"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :model-value.number="form.nutritionalInformation.protein"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      nutritionalInformation: {
                        ...form.nutritionalInformation,
                        protein: $event,
                      },
                    })
                  "
                  type="number"
                  label="Proteínas (g)"
                  :rules="[rules.number]"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :model-value.number="form.nutritionalInformation.totalFat"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      nutritionalInformation: {
                        ...form.nutritionalInformation,
                        totalFat: $event,
                      },
                    })
                  "
                  type="number"
                  label="Gorduras Totais (g)"
                  :rules="[rules.number]"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :model-value.number="form.nutritionalInformation.fiber"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      nutritionalInformation: {
                        ...form.nutritionalInformation,
                        fiber: $event,
                      },
                    })
                  "
                  type="number"
                  label="Fibras (g)"
                  :rules="[rules.number]"
                />
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-switch
                  :model-value="form.nutritionalInformation.isAllergenic"
                  @update:model-value="
                    $emit('update:form', {
                      ...form,
                      nutritionalInformation: {
                        ...form.nutritionalInformation,
                        isAllergenic: $event,
                      },
                    })
                  "
                  inset
                  label="Possui Alergênicos"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="primary" :loading="saving" @click="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import type { IBrandListItem, ICategoryListItem, IProductCreatePayload } from "@/interfaces";
import type { PropType } from "vue";

type VFormRef = {
  validate: () => Promise<boolean | { valid: boolean }>;
  reset: () => void;
  resetValidation: () => void;
};

export default {
  name: "ProductEditDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    formValid: {
      type: Boolean,
      required: true,
    },
    saving: {
      type: Boolean,
      required: true,
    },
    form: {
      type: Object as PropType<IProductCreatePayload>,
      required: true,
    },
    brandItems: {
      type: Array as PropType<IBrandListItem[]>,
      required: true,
    },
    categoryItems: {
      type: Array as PropType<ICategoryListItem[]>,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    "update:dialog",
    "update:formValid",
    "update:form",
    "close",
    "submit",
  ],
  methods: {
    async submit() {
      const form = this.$refs.formRef as unknown as VFormRef | undefined;
      const result = form ? await form.validate?.() : false;
      const isValid =
        typeof result === "boolean" ? result : !!(result as any)?.valid;
      if (!isValid) return;
      this.$emit("submit");
    },
    reset() {
      const form = this.$refs.formRef as unknown as VFormRef | undefined;
      form?.reset?.();
      form?.resetValidation?.();
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.reset();
      }
    },
  },
};
</script>
