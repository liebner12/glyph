<template>
  <div>
    <video ref="localVideo" autoplay class="w-96 aspect-video bg-black" muted />
    <video ref="remoteVideo" class="w-40" />
    <div class="flex gap-4">
      <input ref="callInput" class="w-80 h-10">
      <button class="w-40 h-20 bg-blue-500" @click="answerConnection">
        Answer
      </button>
      <button class="w-40 h-20 bg-blue-500" @click="createOffer">
        Offer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { collection, addDoc, onSnapshot, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { useStream } from '~/composables'
import { initRTCPeerConnection, peerConnection } from '~/utils'

const localVideo: Ref<HTMLVideoElement | null> = ref(null)
const remoteVideo: Ref<HTMLVideoElement | null> = ref(null)
const callInput: Ref<HTMLInputElement | null> = ref(null)

const { initializeVideoStream } = useStream({
  localVideo,
  remoteVideo
})

onMounted(() => {
  initRTCPeerConnection()
  initializeVideoStream()
})

const { $firestore } = useNuxtApp()

async function createOffer () {
  if (!peerConnection || !callInput.value) {
    return
  }

  const callDoc = doc(collection($firestore, 'calls'))
  const offerCandidates = collection(callDoc, 'offerCandidates')
  const answerCandidates = collection(callDoc, 'answerCandidates')

  callInput.value.value = callDoc.id

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(offerCandidates, event.candidate.toJSON())
    }
  }

  const offerDescription = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offerDescription)

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type
  }

  await setDoc(callDoc, { offer })

  onSnapshot(callDoc, (snapshot) => {
    const data = snapshot.data()
    if (!peerConnection) {
      return
    }
    if (!peerConnection.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer)
      peerConnection.setRemoteDescription(answerDescription)
    }
  })

  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.error('changed answer', change)

      if (!peerConnection) {
        return
      }

      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data())
        peerConnection.addIceCandidate(candidate)
      }
    })
  })
}

const answerConnection = async () => {
  if (!peerConnection || !callInput.value) {
    return
  }

  const callId = callInput.value.value
  const callDoc = doc($firestore, 'calls', callId)
  const answerCandidates = collection(callDoc, 'answerCandidates')
  const offerCandidates = collection(callDoc, 'offerCandidates')

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(answerCandidates, event.candidate.toJSON())
    }
  }

  const callData = (await getDoc(callDoc)).data()
  if (!callData) {
    return
  }

  const offerDescription = callData.offer
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription))

  const answerDescription = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answerDescription)

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp
  }
  console.log(answer, callId)
  await updateDoc(callDoc, { answer })

  onSnapshot(offerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.error('changed', change)
      if (!peerConnection) {
        return
      }

      if (change.type === 'added') {
        const data = change.doc.data()
        peerConnection.addIceCandidate(new RTCIceCandidate(data))
      }
    })
  })
}
</script>
