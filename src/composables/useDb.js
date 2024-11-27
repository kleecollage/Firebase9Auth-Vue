import { auth, timeStamp } from '@/firebase';
import { useAuth } from '@vueuse/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { ref } from 'vue';

export const useDb = () => {
  const db = getFirestore();
  const todosCollection = collection(db, 'todos');
  const loading = ref(false)
  const { user } = useAuth(auth)

  //** GET COLLECTION **//
  const getTodos = async () => {
    try {
      loading.value = true

      const todosQuery = query(
        todosCollection,
        where('uid', '==', user.value.uid)
      )

      const querySnapshot = await getDocs(todosQuery);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
		} catch (error) {
      return {
        error,
				res: true,
			};
		} finally {
      loading.value = false
    }
	};
  //** ADD DOC **//
  const addTodo = async(text) => {
    try {
      const todo = {
        text: text,
        date: timeStamp(),
        state: false,
        uid: user.value.uid
      }

      const docRef = await addDoc(todosCollection, todo)

      return {
        id: docRef.id,
        ...todo
      }
    } catch (error) {
      return {
        error,
        res: true
      }
    }
  }
  //** DELETE DOC **//
  const deleteTodo = async(id) => {
    try {
      const docRef = doc(db, 'todos', id)
      await deleteDoc(docRef)

      return {
        res: false
      }
    } catch (error) {
      return {
        error,
        res: true
      }
    }
  }
  //** SWITCH TODO STATE **//
  const finishTodo = async(todo) => {
    try {
      const docRef = doc(db, 'todos', todo.id);
      await updateDoc( docRef, {
        state: !todo.state
      })
      return {
        res: false
      }
    } catch (error) {
      return {
        error,
        res: true
      }
    }
  }

	return {
    loading,
		getTodos,
    addTodo,
    deleteTodo,
    finishTodo
	};
};