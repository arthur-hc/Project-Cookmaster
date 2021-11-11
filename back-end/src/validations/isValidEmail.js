module.exports = (email) => {
  // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};