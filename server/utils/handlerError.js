const handlerError = (res, mes, err) => {
  res.status(200).json({ message: mes, error: err });
};

export default handlerError;
