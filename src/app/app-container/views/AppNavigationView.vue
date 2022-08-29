<template>
  <Disclosure v-slot="{ open }" as="nav" class="sticky top-0 z-50 bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <a class="flex-shrink-0 flex items-center cursor-pointer" href="/">
            <img
              class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Artemis"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Artemis"
            />
          </a>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <button
              v-for="item in navigation"
              :key="item.name"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'px-3 py-2 rounded-md text-sm font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              @click="$router.push(item.href)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0" v-if="!isLoggedIn">
            <button
              type="button"
              class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              @click="$router.push('/login')"
            >
              <span>Login</span>
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center" v-else>
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative" >
              <div>
                <MenuButton
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <button
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      @click="$router.push(item.href)"
                    >
                      {{ item.name }}
                    </button>
                  </MenuItem>
                  <button class="block px-4 py-2 text-sm text-gray-700" @click="handleLogOut">Sign Out</button>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5 sm:px-6">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">test</div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 px-2 space-y-1 sm:px-3">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue"
import { useRouter } from "vue-router"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue"
import { useRouter } from "vue-router"
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline"
import { useStore } from '@/store'
import { AuthUser } from "@/domain/users/Users.Model"

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
]

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },

  setup() {
    const store = useStore()
    const { push } = useRouter()
    const router = useRouter()

    const isLoggedIn = computed<boolean>(() => !!store.state.auth.userToken)
    const userEmail = computed(() => store.state.auth.authUser?.userId)

    const handleLogOut = () => {
      store.dispatch("auth/logout", {})
      .then(() => {
        push('/login')
      })
      .catch((errorMsg: string) => {
        console.error(errorMsg)
      })
    }
    

    const navigation = ref([
      { name: "Dashboard", href: "/dashboard", current: false },
      { name: "Events", href: "/events", current: false },
      { name: "NFT", href: "/nft", current: false },
      { name: "Research", href: "/research", current: false },
      { name: "Governance", href: "/governance", current: false },
      { name: "Watchlists", href: "/watchlists", current: false },
      { name: "Social", href: "/social", current: false },
    ])

    watch(router.currentRoute, () => {
      navigation.value.forEach((obj) => {
        if (router.currentRoute.value.name === obj.name) {
          obj.current = true
        } else {
          obj.current = false
        }
      })
    })

    return {
      navigation,
      userNavigation,
      isLoggedIn,
      userEmail,
      
      handleLogOut,
    }
  },
})
</script>
