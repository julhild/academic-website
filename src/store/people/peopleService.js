const getPeople = async () => {
  const response = await fetch("/people?_sort=name&_order=asc");
  const data = await response.json();

  return data;
};

const peopleService = {
  getPeople,
};

export default peopleService;
