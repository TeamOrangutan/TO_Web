import { Api } from "./baseApi";

export const getUsers = async () => {
  try {
    const response = await Api.get(`/user/AllUsers`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    }

    throw error;
  }
};

export const updateStateUser = async (estado, userId) => {
  try {
    const response = await Api.put("user/State", {
      estado: estado,
      usuario_pk: userId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    }

    throw error;
  }
};
