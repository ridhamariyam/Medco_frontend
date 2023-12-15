import axios from "axios";
export const API_URL ='http://localhost:8000/'

    const csrfTokenElement = document.getElementsByName("csrfmiddlewaretoken")[0];
    const csrfToken = csrfTokenElement ? csrfTokenElement.value : null;
    console.log(csrfToken,'csrf')

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    "X-CSRFToken": csrfToken,
  }
});
export default class ApiService{
  static saveStripeInfo(data={}){
    return api.post(`${API_URL}/payments/save_stripe_info/`, data)
  }
}