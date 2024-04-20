const ImageUpload = ({addImage}) => {

  const onChangeHandler = (e) => {
    const selectedImage = e.target.files[0];
    addImage(selectedImage);
  };

  return (
    <div>
      <label htmlFor="photos"> Снимки на процедурата</label>
      <input id="photos" name="photos" type="file" onChange={onChangeHandler} />
    </div>
  );
};

export default ImageUpload;
