const getPublications = async () => {
  const response = await fetch("/publications?_order=desc");
  const data = await response.json();

  return data;
};

const pubService = {
  getPublications,
};

export default pubService;
