import axios from "axios";
const server = "http://localhost:3000";

const REFRESH_INTERVAL = 1500000; // 25 минут
let refreshTokensTimeout;

export const refreshTokens = async (accessToken, refreshToken) => {
  try {
    const response = await axios.post(
      `${server}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  } catch (error) {
    console.error("Тоекны не обновлены!");
  }
};

const refreshTokensTimer = () => {
  clearTimeout(refreshTokensTimeout);
  if (localStorage.getItem("accessToken") === "null") {
    return;
  }
  const lastRefreshTime = localStorage.getItem("lastRefreshTime");
  const currentTime = Date.now();
  let timeRemaining;
  if (lastRefreshTime) {
    const nextRefreshTime = parseInt(lastRefreshTime) + REFRESH_INTERVAL;
    timeRemaining = Math.max(0, nextRefreshTime - currentTime);
  } else {
    timeRemaining = 0;
  }
  refreshTokensTimeout = setTimeout(() => {
    refreshTokens(
      localStorage.getItem("accessToken"),
      localStorage.getItem("refreshToken")
    );
    localStorage.setItem("lastRefreshTime", Date.now());
    refreshTokensTimer();
  }, timeRemaining);

  localStorage.setItem("refreshTokensInterval", refreshTokensTimeout);
};

window.addEventListener("load", () => {
  refreshTokensTimer();
});

window.addEventListener("unload", () => {
  clearTimeout(refreshTokensTimeout);
});

//! Запрос на регистрацию
export const RegisterApi = async (UserData) => {
  try {
    const response = await axios.post(`${server}/auth/register`, UserData);
    const { accessToken, refreshToken, ...userData } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    refreshTokensTimer();
    return userData;
  } catch (error) {
    alert("Регистрация не прошла!");
  }
};

//! Запрос на авторизацию
export const Login = async (UserData) => {
  try {
    const response = await axios.post(`${server}/auth/login`, UserData);
    const { accessToken, refreshToken, ...userData } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    refreshTokensTimer();
    return userData;
  } catch (error) {
    alert("Пользователь не найден!");
  }
};

//! Запрос на добавление клиента
export const AddClient = async (ClientData) => {
    try {
        const response = await axios.post(`${server}/customer/createCustomer`, ClientData, {
            headers: {
              Authorization: `${localStorage.getItem("accessToken")}`,
            },
          });
    
    
      return response;
    } catch (error) {
      alert("Возникла ошибка при добавлении нового клиента!");
    }
  };

//! Запрос на получение заявок
export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${server}/customer/getAllCustomers`, {
            headers: {
              Authorization: `${localStorage.getItem("accessToken")}`,
            },
          });
    
      return response;
    } catch (error) {
      alert("Возникла ошибка при добавлении нового клиента!");
    }
  };
