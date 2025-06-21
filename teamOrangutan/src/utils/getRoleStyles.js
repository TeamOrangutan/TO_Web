 export const getRoleStyles = (role) => {
    switch (role) {
      case "Admin":
        return {
          backgroundColor: "#bbf7d0",
          color: "#166534",
        };
      case "User":
        return {
          backgroundColor: "#dbeafe",
          color: "#1e40af",
        };
      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#374151",
        };
    }
  };
