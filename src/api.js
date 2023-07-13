class ApiServiceClass {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint) {
    const url = this.baseURL + endpoint;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error =>", error);
      throw error;
    }
  }

  async post(endpoint, body) {
    const url = this.baseURL + endpoint;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error =>", error);
      throw error;
    }
  }
}

export const ApiService = new ApiServiceClass("http://localhost:5000");
