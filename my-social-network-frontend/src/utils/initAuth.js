import { jwtDecode as jwt_decode } from "jwt-decode";
import store from "../store";
import { setCurrentUser, logoutUser } from "../actions/authAction";
import setAuthToken from "./setAuthToken";
import { getUserInfo } from "../actions/userAction";

const initAuth = () => {
  // Kiểm tra token trong localStorage khi ứng dụng khởi động
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken); // Thiết lập token vào tiêu đề mặc định của Axios
    const decoded = jwt_decode(localStorage.jwtToken); // Giải mã token để lấy thông tin người dùng
    store.dispatch(setCurrentUser(decoded)); // Cập nhật Redux store với thông tin người dùng
    store.dispatch(getUserInfo(decoded.sub));

    // Kiểm tra xem token có hết hạn hay không
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser()); // Đăng xuất người dùng nếu token đã hết hạn
      window.location.href = "/login"; // Điều hướng đến trang đăng nhập
    }
  }
};

export default initAuth;
