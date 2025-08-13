// victoriacarvalho/web-ii/WEB-II-b263f27ce3a273a4089485c48fe2471c7d041967/frontend/src/services/api.ts
const SERVER = "http://localhost:8080";

const api = async (endpoint: string, config?: RequestInit) => {
  console.log(`Requesting: ${config?.method || "GET"} ${SERVER}${endpoint}`);

  const response = await fetch(SERVER + endpoint, config);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("API Error Response:", errorBody);
    throw new Error(
      `Network response was not ok: ${response.status} ${response.statusText}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (
    response.status === 204 ||
    !contentType ||
    !contentType.includes("application/json")
  ) {
    return null;
  }

  return await response.json();
};

export default api;
