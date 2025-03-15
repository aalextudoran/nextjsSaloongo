import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const useSalonData = (userId) => {
  const [salonData, setSalonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalon = async () => {
      if (!userId) return;

      try {
        const cachedSalonId = localStorage.getItem("salonId");
        if (cachedSalonId) {
          console.log("Using cached salonId:", cachedSalonId);
        }

        const q = query(collection(db, "salons"), where("ownerId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const salon = querySnapshot.docs[0].data();
          const salonId = querySnapshot.docs[0].id;

          setSalonData({ id: salonId, ...salon });
          localStorage.setItem("salonId", salonId); // Store salonId for session persistence
        } else {
          setSalonData(null);
        }
      } catch (err) {
        console.error("Error fetching salon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalon();
  }, [userId]);

  return { salonData, loading };
};

export default useSalonData;
