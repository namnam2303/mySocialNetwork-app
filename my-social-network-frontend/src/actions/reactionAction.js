import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
export const createOrUpdateReaction =
  (postPublicId, username, reaction) => async (dispatch) => {
    try {
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `/api/reaction/${postPublicId}/${username}`,
        { reactionType: reaction.reactionType },
        config
      );

      return response.data;
    } catch (error) {
      console.error("Error creating/updating reaction:", error);
      throw error;
    }
  };
