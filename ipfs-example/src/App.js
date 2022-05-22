import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";

//public
const ipfsUrl = "https://ipfs.infura.io:5001/api/v0"
const client = create(ipfsUrl);

function App() {
  const [fileUrl, setFileUrl] = useState("");

  async function onChange(e) {
    try {
      // const projectId = "";
      // const projectSecret = "";
      // const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')
      // const client = create({
      //   host: "ipfs.infura.io",
      //   port: 5001,
      //   protocol: "https",
      //   headers: {
      //     authorization: auth
      //   }
      // })

      const file = e.target.files[0];
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("url", url, added);
   
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="App">
      upload your file
      <br />
      <input type="file" onChange={onChange} />
    </div>
  );
}

export default App;
