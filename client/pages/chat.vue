<template>
  <div>
    <video ref="localVideo" autoplay class="w-96 aspect-video bg-black" muted />
    <video ref="remoteVideo" class="w-40" />
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { io } from 'socket.io-client'
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

const socket = io()
onMounted(() => socket.connect())
onUnmounted(() => socket.close())

const message = ref('')
socket.on('message', (data: string) => (message.value = data))
</script>
