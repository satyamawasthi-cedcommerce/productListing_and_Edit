export default function useFetch() {
  async function extractDataFromApi(url, payload, method, headers) {
    const result = await fetch(url, {
      method: method,
      payload: payload,
      headers: headers,
    });
    return await result.json();
  }
  return { extractDataFromApi };
}
