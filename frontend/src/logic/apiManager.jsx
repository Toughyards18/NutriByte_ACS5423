// File: src/logic/apiManager.jsx
// Description: This file contains the API manager for handling API requests and responses.
import axiosInstance from "../services/axiosConfig";

// Generic API request function
async function apiRequest(url, options = {})
{
    try
    {
        const response = await axiosInstance({ url, ...options });
        return { data: response.data, error: null };
    } catch (error)
    {
        console.error("API Request Error:", error);
        const serverMessage = error.response?.data?.message;
        return { data: null, error: serverMessage || error.message };
    }
}

export const fetchFoodById = async (fdcId) => apiRequest(`/api/nutrients/${fdcId}`);
export const searchFoods = async (query) => apiRequest(`/api/foods?searchString=${encodeURIComponent(query)}`);
export const macroSearchFoods = async ({ protein, carbs, fat }) => apiRequest(`/api/macrosearch?protein=${protein}&carbs=${carbs}&fat=${fat}`);
export const getAllFoods = async () => apiRequest(`/api/foods`);

export const registerUser = async ({ username, email, password }) => apiRequest(`/api/auth/register`, { method: "POST", data: { username, email, password } }); // Register a new user

export const loginUser = async ({ email, password }) =>
{
    const response = await apiRequest(`/api/auth/login`, {
        method: "POST",
        data: { email, password },
    });

    if (response.data?.token)
    {
        localStorage.setItem('token', response.data.token);
    }
    return response;
};


export const logoutUser = () =>
{
    localStorage.removeItem('token');
};

export const getDailyLogs = async () => apiRequest(`/api/logs`);
export const getLogByDate = async (date) => apiRequest(`/api/logs/${date}`);
export const createDailyLog = async (log) => apiRequest(`/api/logs`, { method: "POST", data: log });
export const updateDailyLog = async (logId, updates) => apiRequest(`/api/logs/${logId}`, { method: "PUT", data: updates });
export const deleteDailyLog = async (logId) => apiRequest(`/api/logs/${logId}`, { method: "DELETE" });