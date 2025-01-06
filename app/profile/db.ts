import { app } from "@/utils/firebase"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"
import { Profile } from "./interface"

export const createProfile = async (
  firstName: string,
  lastName: string,
  email: string,
  uid: string
) => {
  const db = getFirestore(app)
  return await addDoc(collection(db, "profile"), {
    firstName,
    lastName,
    email,
    authId: uid,
    created: new Date().getTime(),
  })
}

export const getProfileByAuthId = async (authId: string): Promise<Profile> => {
  const db = getFirestore(app)
  const profilesRef = collection(db, "profile")
  const q = query(profilesRef, where("authId", "==", authId))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) throw "Profile not found"
  return querySnapshot.docs[0].data() as Profile
}
