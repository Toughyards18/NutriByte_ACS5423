// File: src/logic/apiManager.jsx
// Description: This file contains the API manager for handling API requests and responses.

import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKENDAPISTRING || "http://localhost:5000";

// Generic API request function
async function apiRequest(url, options = {})
{
    try
    {
        const response = await axios({ url: API_BASE + url, ...options });
        return { data: response.data, error: null };
    } catch (error)
    {
        console.error("API Request Error:", error.message);
        return { data: null, error: error.message };
    }
}

export const fetchFoodById = async (fdcId) => apiRequest(`/api/nutrients/${fdcId}`);
export const searchFoods = async (query) => apiRequest(`/api/foods?searchString=${encodeURIComponent(query)}`);
export const macroSearchFoods = async ({ protein, carbs, fat }) => apiRequest(`/api/macrosearch?protein=${protein}&carbs=${carbs}&fat=${fat}`);
export const getAllFoods = async () => apiRequest(`/api/foods`);

