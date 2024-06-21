const notFound = () => {
  res.json({ message: `Route Not Found` });
};

module.exports = notFound;
