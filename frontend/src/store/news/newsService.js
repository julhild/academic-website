const getAllNews = async (perPage, pageNumber) => {
  const response = await fetch("/news");
  const data = await response.json();

  data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const isMoreNews = data.length > perPage * pageNumber;
  const dataToDisplay = data.splice(0, perPage * pageNumber);

  return { dataToDisplay, isMoreNews };
};

const newsService = {
  getAllNews,
};

export default newsService;
