export const initialDoctors = [
  { id: 1, name: "Dr. Rahul Sharma", specialization: "Cardiologist", experience: 8, availability: "Available", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Dr. Priya Verma", specialization: "Dermatologist", experience: 6, availability: "Available", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Dr. Amit Singh", specialization: "Neurologist", experience: 10, availability: "Unavailable", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Dr. Neha Kapoor", specialization: "Pediatrician", experience: 5, availability: "Available", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80" }
];

export const initialPatients = [
  { id: 1, name: "Aman Sharma", age: 22, gender: "Male", phone: "9876543210", email: "aman@example.com" },
  { id: 2, name: "Simran Kaur", age: 29, gender: "Female", phone: "9876501234", email: "simran@example.com" },
  { id: 3, name: "Arjun Mehta", age: 35, gender: "Male", phone: "9876512345", email: "arjun@example.com" }
];

export const initialAppointments = [
  { id: 1, patientName: "Aman Sharma", doctorName: "Dr. Rahul Sharma", date: "2026-10-28", time: "10:00", reason: "Regular check-up", status: "Confirmed" },
  { id: 2, patientName: "Simran Kaur", doctorName: "Dr. Priya Verma", date: "2026-10-29", time: "11:30", reason: "Skin consultation", status: "Pending" },
  { id: 3, patientName: "Arjun Mehta", doctorName: "Dr. Amit Singh", date: "2026-10-30", time: "14:00", reason: "Follow-up", status: "Pending" }
];
