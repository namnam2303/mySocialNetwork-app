import { CREATE_COMMENT } from "../actions/type";

const initialState = {
  comment: {}, // Comment được lưu trữ như một đối tượng
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        comment: action.payload, // Cập nhật comment với dữ liệu mới nhất
      };
    default:
      return state;
  }
};
