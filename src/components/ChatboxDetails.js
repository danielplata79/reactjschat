import React, { useEffect, useState } from "react";
import "./ChatboxDetails.scss";
import { useContactStore } from "../lib/contactStore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";

const ChatboxDetails = () => {
  const { currentContact, chatId } = useContactStore();
  const [imagesGallery, setImagesGallery] = useState(null);

  const fetchChatImages = async () => {
    const chatImgRef = ref(storage, `chats/privates/${chatId}`);

    try {
      const result = await listAll(chatImgRef);
      const urls = await Promise.all(
        result.items.map(async (images) => {
          const url = await getDownloadURL(images);
          return url;
        })
      )

      return urls;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  useEffect(() => {
    try {
      const displayImages = async () => {
        const imageUrl = await fetchChatImages();
        setImagesGallery(imageUrl);
      }
      displayImages();
    } catch (err) {
      console.error(err);
    }

  }, [chatId]);

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
        {imagesGallery ? (
          imagesGallery.map((imagesUrl) => (
            <img src={imagesUrl} />
          ))
        ) : (
          <img src="description.png" />
        )
        }


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
