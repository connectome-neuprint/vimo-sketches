import React, { useEffect, useState } from "react";
import Sketch from "./lib/Sketch/Sketch";
import NeuprintExecutor from "./lib/Executors/NeuprintExecutor";
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2kuamluaGFuQGdtYWlsLmNvbSIsImxldmVsIjoibm9hdXRoIiwiaW1hZ2UtdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN1FUTFhzenM3UEFZNVdTbHRkX3lmOVZDQ3prNFFBby1zV1RTaVA9czk2LWM_c3o9NTA_c3o9NTAiLCJleHAiOjE4NTY5ODY3NDN9.BIiJdKzPQJcA431XUNpaxwpqLd4ziaEa6pfdI2pi02M";
  const data_server = "https://neuprint.janelia.org/";
  const data_version = "hemibrain:v1.2.1";
  const vimo_server = "http://localhost:4242"; //"https://vimo-server-bmcp5imp6q-uk.a.run.app";
  const ne = new NeuprintExecutor(
    data_server,
    data_version,
    token,
    vimo_server
  );

  const isQuerying = false;
  const processRequest = async (motifJson, lim) => {
    const query = await ne.json2cypher(motifJson, lim);
    console.log(query);
    return query;
  };

  const [attrs, setAttrs] = useState({});

  useEffect(async () => {
    setAttrs({
      NodeFields: await ne.getNodeFields(),
      EdgeFields: await ne.getEdgeFields(),
      getMotifCount: ne.getMotifCount,
      getRelativeMotifCount: ne.getRelativeMotifCount,
    });
  }, []);

  return (
    <div>
      <Sketch
        isQuerying={isQuerying}
        processRequest={processRequest}
        attrs={attrs}
      />
    </div>
  );
}

export default App;
