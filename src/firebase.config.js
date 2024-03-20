import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDrEOlKwZT4Ry-MJDh7W_teriiMWWNG4Y8',
  authDomain: 'bbmarket-50f36.firebaseapp.com',
  projectId: 'bbmarket-50f36',
  storageBucket: 'bbmarket-50f36.appspot.com',
  messagingSenderId: '810244151553',
  appId: '1:810244151553:web:07ec180c9d4753284f2300'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
