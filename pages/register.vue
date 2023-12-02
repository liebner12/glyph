<script setup>
const publicKey = {
  user: {
    id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
    name: 'jamiedoe',
    displayName: 'Jamie Doe'
  },
  challenge: new Uint8Array([
    // must be a cryptographically random number sent from a server
    0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A,
    0x98, 0x6A, 0x73, 0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38,
    0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
  ]).buffer,
  pubKeyCredParams: [
    {
      type: 'public-key',
      alg: -7
    },
    {
      type: 'public-key',
      alg: -257
    }
  ],
  rp: { id: 'localhost', name: 'Local hosterino' }

}

onMounted(() => {
  navigator.credentials.create({ publicKey })
})

</script>

<template>
  <div class="max-w-screen-xl flex w-full justify-between mx-auto">
    <div class="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm pt-32">
        <img src="~/assets/images/undraw_secure_login_pdn4.svg" alt="Person icon" width="384" height="267">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Already has an account?
        </h2>
        <div class="mx-auto text-center mt-6">
          <NuxtLink href="/login" class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 ">
            Sign in instead <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="max-w-2xl py-10 sm:py-16 lg:py-24">
      <form>
        <div class="space-y-12">
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Personal Information (Optional)
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600 mb-8">
              This information is private, you will be able to decide what You want to show publicly.
            </p>
            <div class="sm:col-span-4">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div class="mt-2 mb-4">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600 sm:max-w-md">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    autocomplete="username"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  >
                </div>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div class="text-center">
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                      </label>
                      <p class="pl-1">
                        or drag and drop
                      </p>
                    </div>
                    <p class="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pb-12">
          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div class="mt-2">
                <input id="first-name" type="text" name="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div class="mt-2">
                <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6">
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div class="mt-2 mb-4">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600 sm:max-w-md">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    autocomplete="username"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit" class="rounded-md bg-emerald-600 px-3 py-2 w-full text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
