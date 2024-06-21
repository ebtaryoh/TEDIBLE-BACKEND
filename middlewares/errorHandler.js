const errorHandler = (error, req, res, next) => {
  if (error.errors?.name) {
    return res.status(400).json({ message: error.errors.name.message });
  }
  if (error.errors?.username) {
    return res.status(400).json({ message: error.errors.username.message });
  }
  if (error.errors?.email) {
    return res.status(400).json({ message: error.errors.email.message });
  }
  if (error.errors?.phone) {
    return res.status(400).json({ message: error.errors.phone.message });
  }
  if (error.errors?.password) {
    return res.status(400).json({ message: error.errors.password.message });
  }
  if (error.errors?.title) {
    return res.status(400).json({ message: error.errors.title.message });
  }
  if (error.errors?.message) {
    return res.status(400).json({ message: error.errors.message.message });
  }

  if (error?.code === 11000 && error?.keyValue.username) {
    return res.status(400).json({ message: "Username already exists" });
  }
  res.status(500).json({ message: error.message });
};

module.exports = errorHandler;
