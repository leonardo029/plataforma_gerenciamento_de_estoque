<template>
  <div class="pa-4 stocks-page">
    <StocksToolbar
      :search="stockListStore.search"
      @update:search="stockListStore.setSearch"
      @create="stockFormStore.openCreate"
    />

    <StocksTable
      :stocks="stockListStore.stocks"
      :loading="stockListStore.loading"
      :page="stockListStore.page"
      @update:page="stockListStore.setPage"
      :items-per-page="stockListStore.limit"
      @update:items-per-page="stockListStore.setLimit"
      :items-length="stockListStore.itemsLength"
      @edit="stockFormStore.openEdit"
      @withdraw="stockWithdrawStore.open"
      @delete="stockListStore.deleteStockById"
      @refresh="stockListStore.fetchStocks"
    />

    <StockEditDialog
      :dialog="stockFormStore.dialog"
      @update:dialog="stockFormStore.dialog = $event"
      :form-valid="stockFormStore.formValid"
      @update:form-valid="stockFormStore.formValid = $event"
      :saving="stockFormStore.saving"
      :form="stockFormStore.form"
      @update:form="stockFormStore.form = $event"
      :is-editing="stockFormStore.isEditing"
      :product-items="stockFormStore.productItems"
      :supplier-items="stockFormStore.supplierItems"
      :shelf-items="stockFormStore.shelfItems"
      :corridor-items="stockFormStore.corridorItems"
      :section-items="stockFormStore.sectionItems"
      :rules="stockRules"
      @close="stockFormStore.closeDialog"
      @submit="stockFormStore.submit"
    />

    <StockWithdrawDialog
      :dialog="stockWithdrawStore.dialog"
      @update:dialog="stockWithdrawStore.dialog = $event"
      :form-valid="stockWithdrawStore.valid"
      @update:form-valid="stockWithdrawStore.valid = $event"
      :loading="stockWithdrawStore.loading"
      :quantity="stockWithdrawStore.quantity"
      @update:quantity="stockWithdrawStore.quantity = $event"
      :rules="stockRules"
      @close="stockWithdrawStore.close"
      @submit="stockWithdrawStore.confirm"
    />

    <AppSnackbar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStockListStore } from "@/stores/stock/stock-list";
import { useStockFormStore } from "@/stores/stock/stock-form";
import { useStockWithdrawStore } from "@/stores/stock/stock-withdraw";
import { stockRules } from "@/utils/rules/stock-rules";

// Importing child components directly
import StocksToolbar from "@/components/stocks/StocksToolbar.vue";
import StocksTable from "@/components/stocks/StocksTable.vue";
import StockEditDialog from "@/components/stocks/StockEditDialog.vue";
import StockWithdrawDialog from "@/components/stocks/StockWithdrawDialog.vue";
import AppSnackbar from "@/components/AppSnackbar.vue";

export default defineComponent({
  name: "StocksPage",
  components: {
    StocksToolbar,
    StocksTable,
    StockEditDialog,
    StockWithdrawDialog,
    AppSnackbar,
  },
  setup() {
    const stockListStore = useStockListStore();
    const stockFormStore = useStockFormStore();
    const stockWithdrawStore = useStockWithdrawStore();

    return {
      stockListStore,
      stockFormStore,
      stockWithdrawStore,
      stockRules,
    };
  },
  async mounted() {
    await this.stockListStore.fetchStocks();
  },
});
</script>

<style scoped>
.stocks-page {
  display: flex;
  flex-direction: column;
}
</style>
