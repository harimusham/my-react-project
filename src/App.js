import React from "react";
import { useState } from "react";
import './App.css';

export default function Index()
{
    const [image, setImage] = useState(null);
    const [bgremove, setBgremove] = useState(null);

    const handleChangebg = async () => {
    const apikey = 'ZEbAdsTMqzFMrc7wiNJt7uh4';
    const url = 'https://api.remove.bg/v1.0/removebg';

    const formData = new FormData();
    formData.append('image_file', image, image.name);
    formData.append('size', 'auto');

    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'X-Api-key': apikey,
    //   },
    //   body: formData,
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`HTTP status ${res.status}`);
    //     }
    //     return res.blob();
    //   })
    //   .then((blob) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => setBgremove(reader.result);
    //     reader.readAsDataURL(blob);
    //   })
    //   .catch((error) => console.error(error));
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'X-Api-key': apikey,
      }, 
      body: formData,
    });
    try{
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgremove(reader.result)
      };
      reader.readAsDataURL(blob);
    }catch(err) {
      console.error("Error", err);
    }
  };

 return(
    <div className="flexs">
      <div>
        <h2 className="remove-bg">Remove Background Image</h2>
        <div>
          <div className="inputs">
            <input
              type="file"
              className="button"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <button onClick={handleChangebg} className="bgrmev">
              Remove Background
            </button>
          </div>
        <div>
          {bgremove && <img src={bgremove} alt="remove Background" />}
        </div>
        </div>
      </div>
    </div>
  );
}
