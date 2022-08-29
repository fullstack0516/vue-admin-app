<template>
  <div class="dark">
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased">
      <div
        class="fixed flex flex-col top-18 left-0 w-14 hover:w-64 md:w-56 bg-gray-800 h-full text-white transition-all duration-300 border-none z-10 sidebar"
      >
        <div
          class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow"
        >
          <ul class="flex flex-col py-4 space-y-1">
            <li class="px-5 hidden md:block">
              <div class="flex flex-row items-center mt-5 h-8">
                <div
                  class="text-sm font-light tracking-wide text-gray-400 uppercase cursor-pointer"
                  @click="filterEventsByChain(null, null)"
                >
                  supported chains
                </div>
              </div>
            </li>
            <li v-for="(chain, index) in chains.chains" :key="index">
              <div
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6 cursor-pointer"
                @click="filterEventsByChain(chain.id, chain.name)"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <img
                    :src="chain.img"
                    width="24px"
                    class="w-5 h-5 max-w-none"
                  />
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">{{
                  chain.name
                }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div class="mt-4 mx-4">
          <div class="w-full overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
              <GridTable
                :grid-options="gridOptions"
                @handle-grid-ready="onGridReady"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { SwitchHorizontalIcon } from '@heroicons/vue/outline';
import { GridOptions, ColDef } from 'ag-grid-community';
import GridTable from '@/ui-kit/table/GridTable.vue';
import useEventPageMange from '@/app/event/event';
import useWebsocket from '@/middleware/useWebsocket';
import {
  TxFromCellRender,
  TokenOutRender,
  TokenInRender,
} from '@/app/event/cells';

export default defineComponent({
  name: 'EventPage',
  components: {
    GridTable,
    TxFromCellRender,
    TokenOutRender,
    TokenInRender,
    SwitchHorizontalIcon,
  },
  setup() {
    const router = useRouter();
    const {
      events,
      chains,
      handleRefetchEventsData,
      handleRefetchSupportedChains,
    } = useEventPageMange();
    const { socket } = useWebsocket();
    const rowHeight = ref(65);
    const gridApi = ref();
    const initialEventLoaded = ref(false);
    const paginationLimit = ref(10);
    const filterChainID = ref();
    const socketEvents = ref(events.value.events);

    const columnDefs: ColDef[] = [
      {
        headerName: 'BC',
        field: 'chain_img',
        flex: 1,
        cellRenderer: (params: any) => {
          return (
            '<img class="round inline" width="18" height="18" src="' +
            params.value +
            '" />'
          );
        },
      },
      {
        headerName: 'From',
        field: 'tx_from',
        flex: 1.5,
        cellRenderer: 'TxFromCellRender',
      },
      {
        headerName: 'Method ',
        field: 'method',
        flex: 1,
        valueFormatter: (params: any) => {
          const method = params.value.split('(')[0];
          return method.charAt(0).toUpperCase() + method.slice(1);
        },
      },
      {
        headerName: 'USD Worth',
        field: 'worth_usd',
        flex: 1,
        cellStyle: {
          textAlign: 'right',
        },
        filter: 'agNumberColumnFilter',
        sortable: true,
        valueFormatter: (params: any) => {
          return '$ ' + params.value;
        },
      },
      {
        headerName: '',
        field: 'token_out_symbol',
        flex: 1,
        cellRenderer: 'TokenOutRender',
        cellStyle: {
          textAlign: 'right',
        },
      },
      {
        headerName: '',
        field: 'token_in_out_swap_tip',
        flex: 0.5,
        cellRenderer: 'SwitchHorizontalIcon',
        cellStyle: {
          padding: '24px',
        },
      },
      {
        headerName: '',
        field: 'token_symbol',
        flex: 1,
        cellRenderer: 'TokenInRender',
        cellStyle: {
          textAlign: 'right',
        },
      },
      {
        headerName: '',
        field: 'tx_to_img',
        flex: 0.5,
        cellStyle: {
          textAlign: 'right',
        },
        cellRenderer: (params: any) => {
          // let contract_to =  (params.data.tx_to_name == "" || params.data.tx_to_name === null) ?params.data.tx_to.slice(0,6) + ".." + params.data.tx_to.slice(38,42) :  params.data.tx_to_name
          return (
            '<img class="round inline" width="18" height="18" onerror="this.style.display=\'none\'" alt=" &nbsp;  &nbsp;  &nbsp; " src="' +
            params.data.tx_to_img +
            '">'
          );
        },
      },
      {
        headerName: 'To',
        hide: false,
        field: 'tx_to',
        flex: 1.5,
        cellRenderer: (params: any) => {
          if (params.data.tx_to_name == '' || params.data.tx_to_name === null) {
            return (
              params.data.tx_to.slice(0, 6) +
              '..' +
              params.data.tx_to.slice(38, 42)
            );
          } else {
            return params.data.tx_to_name;
          }
        },
      },
      {
        headerName: 'Hash',
        field: 'explorer_img',
        flex: 0.2,
        editable: true,
        cellRenderer: (params: any) => {
          return (
            '<a href="' +
            params.data.explorer +
            'tx/' +
            params.value +
            '" target="_blank"><img class="round inline" width=16 height=16 src="' +
            params.data.explorer_img.replace(
              '//',
              'https://www.artemisdigital.io/'
            ) +
            '"/></a>'
          );
        },
      },
    ];

    handleRefetchSupportedChains();

    const refetchEventsData = () => {
      gridApi.value.showLoadingOverlay();
      handleRefetchEventsData();
    };

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
    };

    const onGridReady = (params: any) => {
      gridApi.value = params.api;
      refetchEventsData();
    };

    socket.on('new_events', function (response: any) {
      if (
        initialEventLoaded.value &&
        gridApi.value &&
        !gridApi.value.destroyCalled
      ) {
        const resp = handleApplyTransaction(response);
        socketEvents.value = [...socketEvents.value, ...response];
        if (resp)
          gridApi.value.flashCells({ rowNodes: [...resp.add.reverse()] });
      }
    });

    const handleApplyTransaction = (eventParam: any) => {
      if (filterChainID.value) {
        const filteredEvents = eventParam.filter(
          (event) => event.chain_id === filterChainID.value
        );

        const transaction = {
          add: [...filteredEvents],
          addIndex: 0,
        };

        return gridApi.value.applyTransaction(transaction);
      }

      const transaction = {
        add: [...eventParam],
        addIndex: 0,
      };

      return gridApi.value.applyTransaction(transaction);
    };

    const filterEventsByChain = (id: number | null, name: string | null) => {
      name ? router.push(`?chain=${name}`) : router.push(``);
      filterChainID.value = id;
    };

    watch(events.value, () => {
      if (!events.value.events.length) {
        gridApi.value.showNoRowsOverlay();
      } else {
        gridApi.value.hideOverlay();
      }
      const count = gridOptions.api!.paginationGetRowCount();
      if (count === 0) {
        handleApplyTransaction(events.value.events);
      }

      initialEventLoaded.value = true;
      socketEvents.value = events.value.events;
    });

    watch(filterChainID, () => {
      if (filterChainID.value) {
        const filteredEvents = socketEvents.value.filter(
          (event) => event.chain_id === filterChainID.value
        );
        gridOptions.api!.setRowData(filteredEvents);
      } else {
        gridOptions.api!.setRowData(socketEvents.value);
      }
    });

    return { gridOptions, chains, onGridReady, filterEventsByChain };
  },
});
</script>
