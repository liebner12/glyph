import { peerConnection } from '~/utils'

export const useStream = ({ localVideo, remoteVideo }: {localVideo: Ref<HTMLVideoElement | null>, remoteVideo: Ref<HTMLVideoElement | null>}) => {
  const initializeVideoStream = async () => {
    if (!localVideo.value) {
      return
    }

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    localStream.getTracks().forEach((track) => { console.log(track); peerConnection?.addTrack(track, localStream) })
    localVideo.value.srcObject = localStream
  }

  const retrieveRemoteStream = () => {
    if (!peerConnection) {
      return
    }

    const remoteStream = new MediaStream()

    peerConnection.ontrack = (event) => {
      console.log('ontrack')
      if (!remoteVideo.value) {
        return
      }

      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track)
      })

      remoteVideo.value.srcObject = remoteStream
    }
  }

  return { initializeVideoStream, retrieveRemoteStream }
}
