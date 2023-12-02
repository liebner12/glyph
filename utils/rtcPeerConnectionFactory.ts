const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }
  ],
  iceCandidatePoolSize: 10
}

// eslint-disable-next-line import/no-mutable-exports
let peerConnection: RTCPeerConnection | null = null

function initRTCPeerConnection () {
  peerConnection = new RTCPeerConnection(servers)
  return peerConnection
}

export { peerConnection, initRTCPeerConnection }
