import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";

const API_BASE_URL =
  "https://canteen-managment-system-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

//user login
export const login = async (credentials: any) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

// User Signup
export const Signup = async (credentials: any) => {
  try {
    const response = await api.post("/auth/signup", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

//user Admin login
export const adminLogin = async (credentials: any) => {
  try {
    const response = await api.post("/auth/admin/login", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const toggleAvailability = async (credentials: any) => {
  try {
    const response = await api.post("/admin/toogleAvailability", credentials);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addItem = async (Credentials: any) => {
  try {
    const response = await api.post("/admin/addNewItem", Credentials);
    return response;
  } catch (error) {}
};

// Real-time items retrieval
export const getItems = (callback: (items: any[]) => void) => {
  const itemsRef = ref(database, "items"); // Adjust the path as necessary

  // Use onValue to listen for changes in real-time
  const unsubscribe = onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    const items = data ? Object.values(data) : [];
    callback(items);
  });
  return unsubscribe;
};

export const getBillsOfUser = async (credentials: any) => {
  try {
    const response = await api.post("/auth/getUserBills", credentials);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addBill = async (credentials: any) => {
  try {
    const response = await api.post("/auth/addBill", credentials);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addBillToAdmin = async (credentials: any) => {
  try {
    const response = await api.post("/admin/addbills", credentials);
    return response;
  } catch (error) {}
};

export const getAdminDashBoardDetails = async (credentials: any) => {
  try {
    const response = await api.get("/admin/getSales");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAdminBills = async (credentials: any) => {
  try {
    const response = await api.get("/admin/getbills");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const changeBillStatus = async (credentials: any) => {
  try {
    const response = await api.post("/admin/changeStatus", {id:credentials});
    return response;
  } catch (error) {}
};
