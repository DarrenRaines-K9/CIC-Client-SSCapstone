import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function getInventory(query = undefined) {
  let url = "inventory";

  if (query) {
    url += `?${query}`;
  }

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function getInventoryById(id) {
  return fetchWithResponse(`inventory/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteInventory(id) {
  return fetchWithoutResponse(`inventory/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function addInventory(inventory) {
  return fetchWithResponse(`inventory`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  });
}

export function editInventory(id, inventory) {
  return fetchWithoutResponse(`inventory/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  });
}
