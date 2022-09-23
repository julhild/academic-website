export function errorMessage(error) {
  const errorMessage =
    error.response?.data?.message || error.message || error.toString();

  return errorMessage;
}
