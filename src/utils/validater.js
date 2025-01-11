
// User registration validation
function validateRegisterData(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string." });
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      error: "Password is required and must be at least 6 characters long.",
    });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
}

// Login data validation
function validateLoginData(req, res, next) {
  const { email, password } = req.body;

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      error: "Password is required and must be at least 6 characters long.",
    });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
}

module.exports = {
  validateRegisterData,
  validateLoginData,
  // Include other exported functions like validateRegisterData
};
