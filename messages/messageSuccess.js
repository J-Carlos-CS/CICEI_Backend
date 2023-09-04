export function MessageSuccess(response = {}, description = "") {
  return {
    response,
    success: true,
    description,
  };
}
export function MessageFail(response = {}, description = "") {
  return {
    response,
    success: false,
    description,
  };
}
