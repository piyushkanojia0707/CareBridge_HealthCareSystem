import { createContext, useContext, useEffect, useState } from "react";
import { initialAppointments, initialDoctors, initialPatients } from "./data";

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [doctors, setDoctors] = useState(() => load("cb_doctors", initialDoctors));
  const [patients, setPatients] = useState(() => load("cb_patients", initialPatients));
  const [appointments, setAppointments] = useState(() => load("cb_appointments", initialAppointments));
  const [user, setUser] = useState(() => load("cb_user", null));

  useEffect(() => localStorage.setItem("cb_doctors", JSON.stringify(doctors)), [doctors]);
  useEffect(() => localStorage.setItem("cb_patients", JSON.stringify(patients)), [patients]);
  useEffect(() => localStorage.setItem("cb_appointments", JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem("cb_user", JSON.stringify(user)), [user]);

  return (
    <StoreContext.Provider value={{ doctors, setDoctors, patients, setPatients, appointments, setAppointments, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}
