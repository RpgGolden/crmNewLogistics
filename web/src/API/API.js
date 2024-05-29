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

//! Удаление Клиента
export const CustomersDelete = async (IdCustomer) => {
  try {
    const response = await axios.delete(
      `${server}/customer/deleteCustomer/${IdCustomer}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response;
  } catch (error) {
    alert("Возникла ошибка при удалении клиента!");
  }
};

//! Удаление машины
export const apiDelCar = async (IdCar) => {
  console.log(IdCar);
  try {
    const response = await axios.delete(`${server}/car/deleteCar/${IdCar}`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    alert("Возникла ошибка при удалении машины!");
  }
};

//! Удаление заказа
export const apiDeleteOrder = async (idOrder) => {
  try {
    const response = await axios.delete(
      `${server}/order/deleteOrder/${idOrder}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response;
  } catch (error) {
    alert("Возникла ошибка при удалении заказа!");
  }
};

//! Удаление Водителя
export const driverDelete = async (IdDriver) => {
  try {
    const response = await axios.delete(
      `${server}/driver/deleteDriver/${IdDriver}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("Возникла ошибка при удалении водителя!");
  }
};

//! Запрос на обновление данных драйвера
export const editDriverInfo = async (idSelectDriver, data) => {
  console.log("Обновление вызвал данных ");
  try {
    const response = await axios.post(
      `${server}/driver/updateProfileByAdmin/${idSelectDriver}`,
      data,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("Возникла ошибка при обновление данных драйвера!");
  }
};

//! Запрос на обновление статуса
export const apiUpdateStatus = async (orderId, status) => {
  console.log("Обновление статуса ", orderId, status);
  try {
    const response = await axios.post(
      `${server}/order/changeStatus/${orderId}`,
      { status },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {}
};

//! Запрос на обновление данных драйвера
export const editDriverDriv = async (data) => {
  console.log("Обновление вызвал данных ");
  try {
    const response = await axios.post(`${server}/driver/updateProfile/`, data, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    alert("Возникла ошибка при обновление данных драйвера!");
  }
};

//! Запрос на получение всех клиентов
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

//! Запрос на получение информации о водителе
export const getProfileDriver = async () => {
  try {
    const response = await axios.get(`${server}/driver/getProfile`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при получении информации о водителе!");
  }
};

//! Запрос на получение информации о всех водителей
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

//! Запрос на получение всех клиентов
export const apiAetAllCustomers = async () => {
  try {
    const response = await axios.get(`${server}/customer/getAllCustomers`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при получении клиентов!");
  }
};

//! Запрос на получение информации о водителе
export const getOneDriverData = async (idDriver) => {
  console.log("получить водилу ", idDriver);
  try {
    const response = await axios.get(`${server}/driver/getDriver/${idDriver}`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при получении водителя!");
  }
};

//! Запрос на получение всех машшин водителя
export const apiGetAllCar = async (driverId) => {
  try {
    const response = await axios.get(`${server}/car/getCars/${driverId}`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    alert("Возникла ошибка при получении машин водителя!");
  }
};

//! Запрос на получение всех машин
export const apiGetAllCarsLogistic = async () => {
  try {
    const response = await axios.get(`${server}/car/getAllCars`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    alert("Возникла ошибка при получении всех машин водителя!");
  }
};

//! запрос на получение заказов водителя
export const apiGetAllOrdersDriver = async (driverId) => {
  try {
    const response = await axios.get(
      `${server}/order/getOrderByDriverId/${driverId}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("Возникла ошибка при получении заказов водителя!");
  }
};

export const apiGetFile = async (orderId) => {
  try {
    console.log("получить документ", orderId);
    const response = await axios.get(
      `${server}/document/createDocument/${orderId}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        responseType: "blob", // указываем, что ожидаем получить файл в виде Blob
      }
    );
    // Создаем временную ссылку на файл
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    // Создаем ссылку для скачивания файла
    const tempLink = document.createElement("a");
    tempLink.href = fileURL;
    tempLink.setAttribute("download", "file.docx"); // задаем имя файла
    tempLink.click();
    // Очищаем временную ссылку
    window.URL.revokeObjectURL(fileURL);
    return response;
  } catch (error) {
    alert("ошибка получения документа!");
    throw error;
  }
};

export const apiGetFile2 = async (orderId) => {
  try {
    console.log("получить документ 2", orderId);
    const response = await axios.get(
      `${server}/document/createTravel/${orderId}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        responseType: "blob", // указываем, что ожидаем получить файл в виде Blob
      }
    );
    // Создаем временную ссылку на файл
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    // Создаем ссылку для скачивания файла
    const tempLink = document.createElement("a");
    tempLink.href = fileURL;
    tempLink.setAttribute("download", "file.docx"); // задаем имя файла
    tempLink.click();
    // Очищаем временную ссылку
    window.URL.revokeObjectURL(fileURL);
    return response;
  } catch (error) {
    alert("ошибка получения документа!");
    throw error;
  }
};

//! запрос добавить машину
export const apiAddCar = async (data) => {
  try {
    console.log("добавить машину", data);
    const response = await axios.post(
      `${server}/car/createCar`,
      { ...data },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("Вознникла ошибка при добавлении машины!");
  }
};

//! запрос добавить заказ
export const apiAddOrder = async (data) => {
  try {
    console.log("добавить заказ", data);
    const response = await axios.post(
      `${server}/order/createOrder`,
      { ...data },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("Заказ добавлен");
    return response;
  } catch (error) {
    alert("При добавлении заказа возникла ошибка");
  }
};

//! запрос обновить заказ
export const apiUpdateOrder = async (data, orderId) => {
  try {
    console.log("обновить заказ", data);
    const response = await axios.post(
      `${server}/order/updateOrder/${orderId}`,
      { ...data },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("Заказ обновлен");
    return response;
  } catch (error) {
    alert("При обновлении заказа возникла ошибка");
  }
};

//! запрос обновить машину
export const apiUpdateCar = async (data, carId) => {
  try {
    console.log("обновить заказ", data, carId);
    const response = await axios.post(
      `${server}/car/updateCar/${carId}`,
      { ...data },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("Машина обновлена!");
    return response;
  } catch (error) {
    alert("При обновлении машины возникла ошибка");
  }
};

//! запрос на получение всех заказов
export const apiGetAllOrders = async () => {
  try {
    const response = await axios.get(`${server}/order/getAllOrders`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    alert("При получении всех заказов возникла ошибка");
  }
};

//! запрос на получение данных клиента по Id
export const getCustomeriD = async (CustomerId) => {
  try {
    const response = await axios.get(
      `${server}/customer/getCustomer/${CustomerId}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("При получении данных клиента возникла ошибка");
  }
};

//! запрос на обновление данных клиента по Id
export const UpdateProfileCustomer = async (CustomerId, data) => {
  try {
    const response = await axios.post(
      `${server}/customer/updateCustomer/${CustomerId}`,
      data,
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("При обновлении данных клиента возникла ошибка");
  }
};

//! запрос сформировать файл
export const apiCreateFile = async (data, id) => {
  try {
    console.log("создать файл", data, id);
    const response = await axios.post(
      `${server}/document/createDocument/${id}`,
      { data },
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert("файл не сформирован");
  }
};
