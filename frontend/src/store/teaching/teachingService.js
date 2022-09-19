const getLectures = async () => {
  const response = await fetch("/lectures");
  const data = await response.json();

  return data;
};

const teachingService = {
  getLectures,
};

export default teachingService;
