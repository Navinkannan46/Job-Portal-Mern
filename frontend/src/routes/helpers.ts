export const getRedirectPath = (role?: string) => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "EMPLOYER":
      return "/employer/dashboard";
    case "USER":
      return "/";
    default:
      return "/login";
  }
};
