import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzh_cy2qbFV04SVyXy4NU55lceyWPrK-o",
  authDomain: "tsreddy-e8b23.firebaseapp.com",
  projectId: "tsreddy-e8b23",
  storageBucket: "tsreddy-e8b23.appspot.com",
  messagingSenderId: "486933045425",
  appId: "1:486933045425:web:d050d217c7fdc7d0cbc290",
  measurementId: "G-RRBVE1TRTL"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
