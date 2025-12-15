import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UploadCCTVImage() {
  const [cctvImage, setCctvImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCompare = async () => {
    if (!cctvImage) {
      alert("Please upload CCTV image");
      return;
    }

    const userImage = location.state?.userImage;
    const userPreview = location.state?.userPreview;

    const formData = new FormData();
    formData.append("userImage", userImage);
    formData.append("cctvImage", cctvImage);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/compare",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate("/result", {
        state: {
          ...res.data,
          userPreview,
          cctvPreview: URL.createObjectURL(cctvImage),
        },
      });
    } catch (err) {
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: 40,
        textAlign: "center"
      }}>
      <h2>CCTV Image</h2>

      {/* Choose file on top */}
      <input
        type="file"
        onChange={(e) => setCctvImage(e.target.files[0])}
        style={{ marginTop: 20 }}
      />

      {/* Image preview below choose file */}
      {cctvImage && (
        <img
          src={URL.createObjectURL(cctvImage)}
          alt="CCTV Preview"
          style={{
            width: 250,
            height: 250,
            textAlign: "center",
            objectFit: "cover",
            margin: "20px auto",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #ccc",
          }}
        />
      )}
      <br />
      {/* Compare button at bottom */}
      <button
        onClick={handleCompare}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Compare
      </button>
    </div>
  );
}

export default UploadCCTVImage;