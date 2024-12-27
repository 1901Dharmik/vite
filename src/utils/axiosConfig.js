export const base_url = "https://render-deploy-txzi.onrender.com/api/"

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
// export const base_url = "http://localhost:8000/api/";

// const getTokenFromSessionStorage = () => {
//   const customerData = sessionStorage.getItem("customer");
//   if (customerData) {
//     try {
//       const parsedData = JSON.parse(customerData);
//       return parsedData.token || "";
//     } catch (error) {
//       console.error("Error parsing customer data from sessionStorage:", error);
//       return "";
//     }
//   }
//   return "";
// };

// export const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromSessionStorage()}`,
//     Accept: "application/json",
//   },
// };

// // Function to set token in sessionStorage
// export const setTokenInSessionStorage = (customerData) => {
//   sessionStorage.setItem("customer", JSON.stringify(customerData));
// };

// // Function to remove token from sessionStorage
// export const removeTokenFromSessionStorage = () => {
//   sessionStorage.removeItem("customer");
// };