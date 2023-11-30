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

    localStream.getTracks().forEach(track => peerConnection?.addTrack(track, localStream))
    localVideo.value.srcObject = localStream
  }

  const retrieveRemoteStream = () => {
    if (!peerConnection) {
      return
    }

    const remoteSteam = new MediaStream()

    peerConnection.ontrack = (event) => {
      if (!remoteVideo.value) {
        return
      }

      event.streams[0].getTracks().forEach((track) => {
        remoteSteam.addTrack(track)
      })

      remoteVideo.value.srcObject = remoteSteam
    }
  }

  return { initializeVideoStream, retrieveRemoteStream }
}
