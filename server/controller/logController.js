function postLog(req, res) {
  console.log(123);
  console.log(req.body, req.user);
}

export { postLog };
