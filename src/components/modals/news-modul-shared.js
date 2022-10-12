import { Timestamp } from "firebase/firestore";

export const getTimestamp = (inputDate) => {
  const [month, day, year] = inputDate.split("/");
  return Timestamp.fromDate(new Date(year, month - 1, day));
};

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "var(--light-blue-background)",
    padding: "2rem",
    transform: "translate(-50%, -50%)",
    border: "",
    borderBottom: "solid var(--green) 2px",
    borderRadius: "10px",
    color: "var(--green)",
  },
  overlay: {
    zIndex: "1000",
    overflowY: "auto",
  },
};

export const defaultNewsFormValues = {
  title: "",
  content: "",
  imageUrl: "",
  tags: ["News Tag"],
  links: [
    {
      title: "",
      url: "",
    },
  ],
  date: new Date().toLocaleDateString("en-US"),
};

export const validateNewsFormInput = (data) => {
  let errorMessage = null;

  const isLinkIncomplete = (links) => {
    let isIncomplete = false;
    links.forEach((link) => {
      if (link.title.trim() === "" && link.url.trim() !== "") {
        isIncomplete = true;
      }

      if (link.title.trim() !== "" && link.url.trim() === "") {
        isIncomplete = true;
      }
    });

    return isIncomplete;
  };

  if (data.title.trim() === "") {
    errorMessage = "Please add a title to the post.";
  } else if (data.content.trim() === "") {
    errorMessage = "Please add the content.";
  } else if (data.date.trim() === "") {
    errorMessage = "Please add the date of the post.";
  } else if (isNaN(getTimestamp(data.date).seconds)) {
    errorMessage = "Invalid date";
  } else if (isLinkIncomplete(data.links)) {
    errorMessage = "Every link should have both: a title and the address.";
  }

  return errorMessage;
};

export const newsDataToSubmit = (data) => {
  const tagsToSubmit = [];
  const linksToSubmit = [];

  data.tags.forEach((tag) => {
    if (tag.trim() !== "" && tag.trim() !== "News Tag") {
      tagsToSubmit.push(tag);
    }
  });

  data.links.forEach((link) => {
    if (link.title.trim() !== "" && link.url.trim() !== "") {
      linksToSubmit.push(link);
    }
  });

  const dataToSubmit = {
    ...data,
    date: getTimestamp(data.date),
    tags: tagsToSubmit,
    links: linksToSubmit,
  };

  return dataToSubmit;
};
