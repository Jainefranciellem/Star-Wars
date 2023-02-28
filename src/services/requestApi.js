const fetchAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      const data = await response.json();
      throw data.message;
    }
    const data = await response.json();
    const { results } = data;
    return results;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAPI;
