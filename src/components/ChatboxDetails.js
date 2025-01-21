import React from "react";
import "./ChatboxDetails.scss";

const ChatboxDetails = () => {

  return (
    <div className="chatboxdetails--container">
      <h1>Chat Details</h1>

      <div className="chatboxdetails--action-buttons">
        <button><img src="./bell-50.png" /></button>
        <button><img src="./pin-64.png" /></button>
        <button><img src="./remove-50.png" /></button>
        <button><img src="./block-user-48.png" /></button>
      </div>

      <span>
        <h2>Gallery</h2>
        <p>15</p>
        <span>
          <p>See all</p>
        </span>
      </span>

      <div className="chatboxdetails--gallery">
        <img src="description.png" />
        <img src="description.png" />
        <img src="description.png" />
        <img src="description.png" />
        <img src="description.png" />
      </div>

      <span>
        <h2>Shared Files</h2>
        <p>335</p>
        <span>
          <p>See all</p>
        </span>
      </span>

      <div className="chatboxdetails--sharedfiles">
        <div className="sharedfiles--file">
          <span>
            <img src="./pdf-50.png" />
          </span>
          <p>This is a large title which container the name of the file
            This is a large title which container the name of the
          </p>
        </div>

        <div className="sharedfiles--file">
          <span>
            <img src="./pdf-50.png" />
          </span>
          <p>This is a large title which container the name of the file
            This is a large title which container the name of the
          </p>
        </div>

        <div className="sharedfiles--file">
          <span>
            <img src="./pdf-50.png" />
          </span>
          <p>This is a large title which container the name of the file
            This is a large title which container the name of the
          </p>
        </div>

      </div>

      <span>
        <h2>Shared Links</h2>
        <p>83</p>
        <span>
          <p>See all</p>
        </span>
      </span>


      <div className="chatboxdetails--sharedfiles">
        <div className="sharedfiles--file">
          <span>
            <img src="./www-50.png" />
          </span>
          <p>This is a large title which container the name of the file
            This is a large title which container the name of the
          </p>
        </div>

        <div className="sharedfiles--file">
          <span>
            <img src="./www-50.png" />
          </span>
          <p>This is a large title which container the name of the file
            This is a large title which container the name of the
          </p>
        </div>

        <div className="sharedfiles--file">
          <span>
            <img src="./www-50.png" />
          </span>
          <p>This is a large title which container the name of the file
            This is a large title which container the name of the
          </p>
        </div>
      </div>
    </div >
  )
};

export default ChatboxDetails;
