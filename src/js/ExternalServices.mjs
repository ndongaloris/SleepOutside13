// Retrieve the base URL from environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

// Utility function to convert response to JSON or throw an error
function convertToJson(res) {
  const data = res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

// Class for interacting with external services
export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }

  // Fetch product data based on category
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Find product by ID
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Perform checkout operation
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout", options).then(convertToJson);
  }
}
