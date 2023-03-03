const fetchAPI = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data;
  return results;
};

export default fetchAPI;
