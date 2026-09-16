import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      logged_in: false,
      message: 'Unauthorized: No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_dsan_2026');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      logged_in: false,
      message: 'Unauthorized: Invalid or expired token'
    });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Access Denied: Insufficient permissions'
      });
    }
    next();
  };
};
