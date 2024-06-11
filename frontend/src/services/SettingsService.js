import axios from "./BaseService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const SETTINGS_URL =
  `${process.env.REACT_APP_API_URL}/settings` ||
  "http://localhost:3001/settings";

export async function getSettings(token) {
  const settingsUrl = `${API_URL}/settings`;
  const headers = {
    authorization: token,
  };
  const response = await axios.get(settingsUrl, { headers });
  return response.data;
}

export async function updateSettings(settings, token) {
  const headers = { authorization: token };
  const response = await axios.patch(SETTINGS_URL, settings, { headers });
  return response.data;
}
