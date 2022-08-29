<template>
  <div class="md:container md:mx-auto">
    <ag-grid-vue
      :style="{
        height: contentHeight + 'px',
        minHeight: minHeight + 'px',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 600,
      }"
      class="ag-theme-alpine-dark"
      :grid-options="gridOptions"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, PropType } from "vue"
import { AgGridVue } from "ag-grid-vue3"
import { GridOptions } from "ag-grid-community"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"

export default defineComponent({
  name: "GridTable",
  components: {
    AgGridVue,
  },
  props: {
    gridOptions: {
      type: Object as PropType<GridOptions>,
      required: true,
    },
    paginationLimit: {
      type: Number,
      default: 10,
    },
    minHeight: {
      type: Number,
      default: 400,
    },
    rowHeight: {
      type: Number,
      default: 65,
    },
  },
  emits: ["handle-grid-ready"],
  setup(props, { emit }) {
    const { paginationLimit, rowHeight } = props

    const contentHeight = computed(() => {
      return rowHeight * (paginationLimit + 1.8)
    })

    const onGridReady = (params: any) => {
      emit("handle-grid-ready", params)
    }

    return { contentHeight, onGridReady }
  },
})
</script>
<style>
.ag-root-wrapper {
  border: none !important;
  background: none !important;
}

.ag-header {
  background: none !important;
}

.ag-theme-alpine-dark .ag-row {
  background: none !important;
  border: none !important;
}

.ag-theme-alpine-dark .ag-row .ag-cell {
  display: flex;
  align-items: center;
}

.ag-theme-alpine-dark .ag-row:hover {
  transition: all 0.2s ease 0s;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  background: #1f2937 !important;
}
</style>
