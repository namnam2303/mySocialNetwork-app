import defaultAvatar from "../assets/images/default.png";
export const getAvatarSrc = (username, avatar) => {
  if (!username || !avatar) {
    return defaultAvatar;
  }
  return "/user/avatar/" + username;
};

export const formatDate = (dateString) => {
  // Convert to Date object
  let dateObject = new Date(dateString);

  // Extract day, month, and year
  let day = ("0" + dateObject.getDate()).slice(-2);
  let month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Months are zero-based
  let year = dateObject.getFullYear();

  // Format the date as dd-MM-yyyy
  return `${day}-${month}-${year}`;
};
