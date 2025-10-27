<template>
  <v-data-table-server
    :items="users"
    :headers="headers"
    item-key="id"
    :loading="loading"
    :page="page"
    @update:page="$emit('update:page', $event)"
    :items-per-page="limit"
    @update:items-per-page="$emit('update:limit', $event)"
    :items-length="itemsLength"
    class="elevation-1"
  >
    <template #item.isActivated="{ item }">
      <v-chip :color="item.isActivated ? 'success' : 'warning'" size="small">
        {{ item.isActivated ? 'Ativo' : 'Inativo' }}
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <v-btn icon variant="text" color="primary" @click="$emit('edit', item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <template #footer.prepend>
      <v-btn
        icon="mdi-refresh"
        variant="text"
        size="small"
        :loading="loading"
        class="mr-2"
        @click="$emit('refresh')"
        aria-label="Atualizar"
      />
      <v-spacer />
    </template>
  </v-data-table-server>
</template>

<script lang="ts">
import type { UserListItem } from '@/services/users';
import type { PropType } from 'vue';

export default {
  name: 'UsersTable',
  props: {
    users: {
      type: Array as PropType<UserListItem[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    itemsLength: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:page', 'update:limit', 'edit', 'refresh'],
  data() {
    return {
      headers: [
        { title: 'Nome', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Papel', key: 'role' },
        { title: 'Ativo', key: 'isActivated' },
        { title: 'Ações', key: 'actions', sortable: false },
      ] as const,
    };
  },
};
</script>