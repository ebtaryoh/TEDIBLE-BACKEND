const methodNotAllowed = (req, res) => {
    res.status(400).json({ message: `This ${req.method} Method is not Allowed` });
  };
  
  module.exports = methodNotAllowed;