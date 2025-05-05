import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function getEvents(query = undefined) {
  let url = "events";

  if (query) {
    url += `?${query}`;
  }

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function getEventById(id) {
  return fetchWithResponse(`events/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteEvent(id) {
  return fetchWithoutResponse(`events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function addEvent(event) {
  return fetchWithResponse(`events`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
}

export function editEvent(id, event) {
  return fetchWithoutResponse(`events/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
}

// export function recommendProduct(id, username) {
//   return fetchWithResponse(`products/${id}/recommend`, {
//     method: "POST",
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ recipient: username }),
//   });
// }

// export function likeProduct(productId) {
//   return fetchWithoutResponse(`products/${productId}/like`, {
//     method: "POST",
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   });
// }
// export function getCategories() {
//   return fetchWithResponse("productcategories", {
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//     },
//   });
// }
