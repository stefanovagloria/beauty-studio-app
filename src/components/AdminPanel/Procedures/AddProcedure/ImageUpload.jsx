import { useState } from "react";
import { storage } from "../../../../firebase";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  return (
    <>
      <label htmlFor="photos"> Снимки на процедурата</label>
      <input id="photos" name="photos" type="file" onChange={onChangeHandler} />
    </>
  );
};

export default ImageUpload;
