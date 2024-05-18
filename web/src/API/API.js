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
    const response = await axios.post(
      `${server}/customer/createCustomer`,
      ClientData,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );

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
    console.log(response);
    return response;
  } catch (error) {
    alert("Возникла ошибка при получении аккаунтов!");
  }
};

// //! Запрос на получение информации о водителе
export const getProfileDriver = async () => {
  try {
    const response = await axios.get(`${server}/driver/getProfile`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при добавлении нового клиента!");
  }
};

// //! Запрос на получение информации о всех водителей
export const getAllDriver = async () => {
  try {
    const response = await axios.get(`${server}/driver/getAllDrivers`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при получении водителей!");
  }
};
// //! Запрос на получение информации о всех водителей
export const getOneDriverData = async (idDriver) => {
  try {
    const response = await axios.get(`${server}/driver/getDriver/${idDriver}`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при получении водителей!");
  }
};


//! Запрос на получение всех машшин
export const apiGetAllCar = async (driverId) => {
  try {
    console.log("получить машины водителя", driverId);
    const response = await axios.get(`${server}/car/getCars/${driverId}`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Пользователь не найден!");
  }
};

//! запрос на получение заказов водителя
export const apiGetAllOrdersDriver = async (driverId) => {
  try {
    console.log("получить машины водителя", driverId);
    const response = await axios.get(
      `${server}/order/getOrderByDriverId/${driverId}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Пользователь не найден!");
  }
};

//! запрос добавить машину
export const apiAddCar = async (data) => {
  try {
    console.log("добавить машину", data);
    const response = await axios.post(
      `${server}/car/createCar`,
      { data },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Пользователь не найден!");
  }
};
