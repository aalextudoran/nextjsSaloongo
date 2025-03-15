"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import Firestore db
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import styles from "./SalonServices.module.css"; // Corrected import for CSS module

const ServiceManagement = () => {
  const [salonId, setSalonId] = useState(null);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", price: "", duration: "", description: "" });

  useEffect(() => {
    // Retrieve `salonId` from localStorage
    const cachedSalonId = localStorage.getItem("salonId");
    if (cachedSalonId) {
      setSalonId(cachedSalonId);
    } else {
      console.error("Error: No salon found. Redirecting...");
      // Redirect to dashboard or show an error
    }
  }, []);

  useEffect(() => {
    if (salonId) {
      fetchServices();
    }
  }, [salonId]);

  async function fetchServices() {
    if (!salonId) {
      console.error("Error: salonId is undefined.");
      return;
    }

    try {
      const servicesRef = collection(db, "salons", salonId, "services");
      const servicesSnap = await getDocs(servicesRef);
      const serviceList = servicesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setServices(serviceList);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  async function addService() {
    event.preventDefault();
        if (!salonId) {
      console.error("Cannot add service: salonId is undefined.");
      return;
    }
    if (!newService.name || !newService.price) return;

    try {
      const servicesRef = collection(db, "salons", salonId, "services");
      await addDoc(servicesRef, newService);
      setNewService({ name: "", price: "", duration: "", description: "" });
      fetchServices(); // Refresh list
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  async function editService(serviceId, updatedService) {
    if (!salonId) {
      console.error("Cannot edit service: salonId is undefined.");
      return;
    }

    try {
      const serviceRef = doc(db, "salons", salonId, "services", serviceId);
      await updateDoc(serviceRef, updatedService);
      fetchServices(); // Refresh list
    } catch (error) {
      console.error("Error updating service:", error);
    }
  }

  async function deleteService(serviceId) {
    if (!salonId) {
      console.error("Cannot delete service: salonId is undefined.");
      return;
    }

    try {
      const serviceRef = doc(db, "salons", salonId, "services", serviceId);
      await deleteDoc(serviceRef);
      fetchServices(); // Refresh list
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  if (!salonId) {
    return <p>Error: No salon selected.</p>;
  }

  return (
    <div className={styles.servicesContainer}>
      <h2 className={styles.header}>Manage Services</h2>
      <form className={styles.addServiceForm} onSubmit={addService}>
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={newService.duration}
          onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <button type="submit" onClick={addService}>Add Service</button>
      </form>
      <ul className={styles.serviceList}>
        {services.map((service) => (
          <li key={service.id} className={styles.serviceItem}>
            <div className={styles.serviceDetails}>
              <span className={styles.serviceName}>{service.name}</span>
              <span className={styles.serviceDescription}>{service.description}</span>
            </div>
            <div className={styles.actionButtons}>
              <button className={`${styles.actionButton} ${styles.edit}`} onClick={() => editService(service.id)}>
                Edit
              </button>
              <button className={`${styles.actionButton} ${styles.delete}`} onClick={() => deleteService(service.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceManagement;
