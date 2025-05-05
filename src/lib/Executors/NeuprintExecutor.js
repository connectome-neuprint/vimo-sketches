import axios from "axios";

export default class NeuprintExecutor {
  constructor(dataServer, dataset, token, vimoServer) {
    this.dataServer = dataServer;
    this.dataset = dataset;
    this.token = token;
    this.vimoServer = vimoServer;
  }

  async fetchData(endpoint, attrs = {}) {
    try {
      const res = await axios.post(`${this.vimoServer}/${endpoint}`, {
        server: this.dataServer,
        version: this.dataset,
        token: JSON.stringify(this.token),
        ...attrs,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `${error.response.status}: ${error.response.data?.detail?.error}`
        );
      }
      throw error;
    }
  }

  async getNodeFields() {
    try {
      const res = await this.fetchData("fetch_node_fields");
      return res;
    } catch (error) {
      console.error("Error fetching node fields:", error);
      return {};
    }
  }

  async getEdgeFields() {
    try {
      const res = await this.fetchData("fetch_edge_fields");
      return res;
    } catch (error) {
      console.error("Error fetching edge fields:", error);
      return {};
    }
  }

  async json2cypher(motifJson, lim) {
    return await this.fetchData("cypher", {
      motif: motifJson,
      lim: lim,
    });
  }

  getMotifCount = async (motif) => {
    try {
      // get request to backend to get motif count
      const url = `${this.vimoServer}/count/motif=${motif}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching motif count:", error);
      return 0;
    }
  };

  getRelativeMotifCount = async (motif) => {
    try {
      // get request to backend to get motif count
      const url = `${this.vimoServer}/rel_count/motif=${motif}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching relative motif count:", error);
      return 0;
    }
  };
}
