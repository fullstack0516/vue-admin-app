<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Sign in to your account
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="state.userName"
              name="username"
              type="text"
              autocomplete="usernmae"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="user name"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="state.userPassword"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div class="text-red-500 mb-2 mt-2">
            <p v-if="v$.userName.$error">
                    {{ v$.userName.$errors[0].$message }}
            </p>
            <p v-if="v$.userPassword.$error">
              {{ v$.userPassword.$errors[0].$message }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-100"> Remember me </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <PrimaryButton label="Sign in" :icon="true" @click="validateOnSubmit">
            <template #icon>
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </template>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue"
import { useRouter } from 'vue-router'

import { useStore } from "@/store"

import { LockClosedIcon } from "@heroicons/vue/solid"
import useValidate from '@vuelidate/core'

import rules from '@/helpers/validation/rules'
import PrimaryButton from "../../ui-kit/buttons/PrimaryButton.vue"

export default defineComponent({
  components: {
    LockClosedIcon,
    PrimaryButton,
  },

  setup() {
    const store = useStore()
    const { push } = useRouter()

    let isLoggedIn = computed<boolean>(() => !!store.state.auth.userToken)
    const state = reactive({
      userName: '',
      userPassword: '',
    })

    const v$ = useValidate(rules, state)

    const loginHandle = () => {
      store.dispatch("auth/login", {
        username: state.userName,
        password: state.userPassword,
      })
      .then(() => {
        if (isLoggedIn) {
          push('/dashboard')
        }
      })
      .catch((errorMsg: string) => {
        console.error(errorMsg)
      })
    }

    function validateOnSubmit() {
      v$.value.$validate()
      if (!v$.value.userName.$error && !v$.value.userPassword.$error) {
        loginHandle();
      }
    }

    return {
      state,
      v$,
      
      validateOnSubmit,
      loginHandle,
    }
  },

})
</script>
