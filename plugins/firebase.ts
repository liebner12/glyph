import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAmZ1vb8tEs-rwdawewn5dWGic6RmWVDN8',
    authDomain: 'glyph-d5a95.firebaseapp.com',
    projectId: 'glyph-d5a95',
    storageBucket: 'glyph-d5a95.appspot.com',
    messagingSenderId: '419626247346',
    appId: '1:419626247346:web:edb12a84ed03eb30fa15ab'
  }

  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)

  return {
    provide: {
      firestore
    }
  }
})
