const getAllNews = async () => {
  const response = await fetch("/news?_date=desc");
  const data = await response.json();

  data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return data;
};

const newsService = {
  getAllNews,
};

export default newsService;
