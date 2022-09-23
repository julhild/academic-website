const getLectures = async () => {
  const response = await fetch("/lectures");
  const data = await response.json();

  return data;
};

const fetchLecture = async (id) => {
  const response = await fetch(`/lectures/${id}`);
  const data = await response.json();

  return data;
};

const teachingService = {
  getLectures,
  fetchLecture,
};

export default teachingService;
