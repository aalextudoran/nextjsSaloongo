import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const salonCollection = collection(db, "salons");

export const addSalon = async (salonData) => {
  try {
    const docRef = await addDoc(salonCollection, salonData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding salon: ", error);
    throw error;
  }
};

export const getSalons = async () => {
  try {
    const querySnapshot = await getDocs(salonCollection);
    const salons = [];
    querySnapshot.forEach((doc) => {
      salons.push({ id: doc.id, ...doc.data() });
    });
    return salons;
  } catch (error) {
    console.error("Error getting salons: ", error);
    throw error;
  }
};

export const updateSalon = async (id, updatedData) => {
  try {
    const salonDoc = doc(db, "salons", id);
    await updateDoc(salonDoc, updatedData);
  } catch (error) {
    console.error("Error updating salon: ", error);
    throw error;
  }
};

export const deleteSalon = async (id) => {
  try {
    const salonDoc = doc(db, "salons", id);
    await deleteDoc(salonDoc);
  } catch (error) {
    console.error("Error deleting salon: ", error);
    throw error;
  }
};