<template>
  <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    <div
      class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
    >
      <div
        class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8"
      >
        <div
          class="flex flex-col justify-start items-start bg-[#1e293b] rounded-md shadow-md px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
        >
          <p class="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-100">
            Trading view chart
          </p>
        </div>
        <div
          class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8"
        >
          <GridTable
            :grid-options="gridOptions"
            :pagination-limit="paginationLimit"
            :row-height="rowHeight"
            min-height="400"
            @handle-grid-ready="onGridReady"
          />
        </div>
      </div>
      <div
        class="bg-[#1e293b] rounded-md shadow-md w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
      >
        <h3 class="text-xl font-semibold leading-5 text-gray-100">Information</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { SwitchHorizontalIcon } from "@heroicons/vue/outline"
import { GridOptions, ColDef } from "ag-grid-community"
import GridTable from "@/ui-kit/table/GridTable.vue"
import usePriceHistoryPageMange from "@/app/event/price-history/price-history"
import useWebsocket from "@/middleware/useWebsocket"
import {
  TxFromCellRender,
  TokenOutRender,
  TokenInRender,
  TxTypeCellRender,
  TxPriceCellRender,
} from "@/app/event/cells"

export default defineComponent({
  name: "PriceHistory",
  components: {
    GridTable,
    TxFromCellRender,
    TokenOutRender,
    TokenInRender,
    TxTypeCellRender,
    TxPriceCellRender,
    SwitchHorizontalIcon,
  },
  setup(props) {
    const { events, handleRefetchEventsData, contractId } = usePriceHistoryPageMange()
    const { socket } = useWebsocket()
    const rowHeight = ref(47)
    const gridApi = ref()
    const initialEventLoaded = ref(false)
    const paginationLimit = ref(6)

    const columnDefs: ColDef[] = [
      {
        headerName: "BC",
        field: "chain_img",
        flex: 1,
        cellRenderer: (params: any) => {
          return "<img class=\"round inline\" width=\"18\" height=\"18\" src=\"" + params.value + "\" />"
        },
      },
      {
        headerName: "From",
        field: "tx_from",
        flex: 1.5,
        cellRenderer: "TxFromCellRender",
      },
      {
        headerName: "type",
        flex: 1,
        field: "type",
        cellRenderer: "TxTypeCellRender",
        cellRendererParams: {
          contractId: contractId.value,
        },
      },
      {
        headerName: "price",
        flex: 1.5,
        field: "price",
        cellRenderer: "TxPriceCellRender",
        cellRendererParams: {
          contractId: contractId.value,
        },
      },
      {
        headerName: "Method ",
        field: "method",
        flex: 1,
        valueFormatter: (params: any) => {
          const method = params.value.split("(")[0]
          return method.charAt(0).toUpperCase() + method.slice(1)
        },
      },
      {
        headerName: "USD Worth",
        field: "worth_usd",
        flex: 1,
        cellStyle: {
          textAlign: "right",
        },
        filter: "agNumberColumnFilter",
        sortable: true,
        valueFormatter: (params: any) => {
          return "$ " + params.value
        },
      },
      {
        headerName: "",
        field: "token_out_symbol",
        flex: 1,
        cellRenderer: "TokenOutRender",
        cellStyle: {
          textAlign: "right",
        },
      },
      {
        headerName: "",
        field: "token_in_out_swap_tip",
        flex: 0.5,
        cellRenderer: "SwitchHorizontalIcon",
        cellStyle: {
          padding: "24px",
        },
      },
      {
        headerName: "",
        field: "token_symbol",
        flex: 1,
        cellRenderer: "TokenInRender",
        cellStyle: {
          textAlign: "right",
        },
      },
      {
        headerName: "",
        field: "tx_to_img",
        flex: 0.5,
        cellStyle: {
          textAlign: "right",
        },
        cellRenderer: (params: any) => {
          // let contract_to =  (params.data.tx_to_name == "" || params.data.tx_to_name === null) ?params.data.tx_to.slice(0,6) + ".." + params.data.tx_to.slice(38,42) :  params.data.tx_to_name
          return (
            '<img class="round inline" width="18" height="18" onerror="this.style.display=\'none\'" alt=" &nbsp;  &nbsp;  &nbsp; " src="' +
            params.data.tx_to_img +
            '">'
          )
        },
      },
      {
        headerName: "To",
        hide: false,
        field: "tx_to",
        flex: 1.5,
        cellRenderer: (params: any) => {
          if (params.data.tx_to_name == "" || params.data.tx_to_name === null) {
            return params.data.tx_to.slice(0, 6) + ".." + params.data.tx_to.slice(38, 42)
          } else {
            return params.data.tx_to_name
          }
        },
      },
      {
        headerName: "Hash",
        field: "explorer_img",
        flex: 0.2,
        editable: true,
        cellRenderer: (params: any) => {
          return (
            '<a href="' +
            params.data.explorer +
            "tx/" +
            params.value +
            '" target="_blank"><img class="round inline" width=16 height=16 src="' +
            params.data.explorer_img.replace("//", "https://www.artemisdigital.io/") +
            '"/></a>'
          )
        },
      },
    ]

    const refetchEventsData = () => {
      gridApi.value.showLoadingOverlay()
      handleRefetchEventsData()
    }

    const gridOptions: GridOptions = {
      columnDefs: columnDefs,
      rowData: events.value.events,
      rowHeight: rowHeight.value,
      animateRows: true,
      pagination: true,
      paginationPageSize: paginationLimit.value,
      defaultColDef: {
        resizable: true,
        minWidth: 80,
      },
    }

    const onGridReady = (params: any) => {
      gridApi.value = params.api
      refetchEventsData()
    }

    socket.on("new_events", function (response: any) {
      if (initialEventLoaded.value && gridApi.value && !gridApi.value.destroyCalled) {
        const resp = handleApplyTransaction(response)
        if (resp) gridApi.value.flashCells({ rowNodes: [...resp.add.reverse()] })
      }
    })

    const handleApplyTransaction = (events: any) => {
      const filteredEvents = events.filter(
        (event) =>
          event.token_out_address === contractId.value || event.token_address === contractId.value,
      )
      const transaction = {
        add: [...filteredEvents],
        addIndex: 0,
      }

      return gridApi.value.applyTransaction(transaction)
    }

    watch(events.value, () => {
      if (!events.value.events.length) {
        gridApi.value.showNoRowsOverlay()
      } else {
        gridApi.value.hideOverlay()
      }

      handleApplyTransaction(events.value.events)
      initialEventLoaded.value = true
    })

    return { gridOptions, onGridReady, paginationLimit, rowHeight }
  },
})
</script>
<style></style>
