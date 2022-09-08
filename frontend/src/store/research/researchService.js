const getResearch = async () => {
  const response = await fetch("/research");
  const data = await response.json();

  return data;
};

const researchService = {
  getResearch,
};

export default researchService;
