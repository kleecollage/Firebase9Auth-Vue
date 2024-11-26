import { auth } from "@/firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "vue-router"

export const useUser = () => {
  const router = useRouter()
  const signIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider)
      router.push('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    signIn,
    signOut
  }
}