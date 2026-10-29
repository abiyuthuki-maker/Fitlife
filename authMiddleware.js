
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required.",
    });
  }

  const token = authHeader.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is missing from backend environment.");
    return res.status(500).json({
      success: false,
      message: "Server authentication configuration error.",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    // Support common JWT user ID field names.
    const userId =
      decoded.userId ||
      decoded.id ||
      decoded._id ||
      decoded.sub;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Token does not contain a user ID.",
      });
    }

    req.userId = userId;
    req.user = {
      userId,
      id: userId,
      _id: userId,
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

export default authMiddleware;
