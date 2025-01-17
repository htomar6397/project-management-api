const addPagination = (req, res, next) => {
  req.pagination = {
    page: parseInt(req.query.page, 10) || 1, // Default to page 1
    limit: parseInt(req.query.limit, 10) || 10, // Default to 10 items per page
  };
  next();
};

module.exports = addPagination;
