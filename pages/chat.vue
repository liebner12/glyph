<template>
  <div>
    <video ref="localVideo" autoplay class="w-96 aspect-video bg-black" muted />
    <video ref="remoteVideo" class="w-40" />
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStream } from '~/composables'
import { initRTCPeerConnection } from '~/utils'

const localVideo: Ref<HTMLVideoElement | null> = ref(null)
const remoteVideo: Ref<HTMLVideoElement | null> = ref(null)

const { initializeVideoStream } = useStream({
  localVideo,
  remoteVideo
})

onMounted(() => {
  initRTCPeerConnection()
  initializeVideoStream()
})

const message = ref('')
</script>
