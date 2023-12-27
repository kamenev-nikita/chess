const getNameFigureByLink = (link) => {
  return String(link.split("/").slice(-1).join());
};

export default getNameFigureByLink;
