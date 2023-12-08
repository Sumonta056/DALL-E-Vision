import "./App.css";
import axios from "axios";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MessageInput, Avatar } from "@chatscope/chat-ui-kit-react";
import { Comment } from "react-loader-spinner";
import avatar1 from "./assets/bot3.png";
import base from "./assets/base3.png";

function App() {
  const [imageUrl, setImage] = useState(base);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (messageText) => {
    const newMessage = {
      content: messageText,
    };
    setLoading(true);
    axios
      .post("http://localhost:8082/chat", newMessage)
      .then((res) => {
        setLoading(false);
        setImage(res.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div className="App">
      <div className="overlay"></div>
      <div className="App-header Blur">
        <div
          style={{
            width: "60px",
            height: "60px",
          }}
        >
          <Avatar src={avatar1} size="fluid" />
        </div>

        <h1>DALL·E ভিশন</h1>
      </div>

      <div
        className="Blur"
        style={{
          position: "relative",
          height: "500px",
          width: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {loading ? (
          <Comment
            visible={true}
            height="200"
            width="200"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#05BFDB"
            backgroundColor="#fff"
          />
        ) : (
          <div
            className="ShowImage"
            style={{
              position: "relative",
              width: "700px", // Set your desired width
              height: "600px", // Set your desired height
              overflow: "hidden", // To hide the overflow when the image is larger than the container
            }}
          >
            <img
              src={imageUrl}
              alt="Loading..."
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}

        <MessageInput
          className="inputbox"
          style={{ padding: "20px", width: "800px" }}
          placeholder="Write Your Prompt ..."
          onSend={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
