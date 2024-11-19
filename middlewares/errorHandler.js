const errorHandler = (error, req, res, next) => {
 
  if (error.errors?.firstName) {
    return res.status(400).json({ message: error.errors.firstName.message });
  }  if (error.errors?.lastName) {
    return res.status(400).json({ message: error.errors.lastName.message });
  }  if (error.errors?.email) {
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

  if (error?.code === 11000 && error?.keyValue.email) {
    return res.status(400).json({ message: "Email already exists" });
  }
  res.status(500).json({ message: error.message });
};

module.exports = errorHandler;
