import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UploadUserImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    location: "",
  });

  const navigate = useNavigate();

  // Auto-detect location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setForm((prev) => ({
            ...prev,
            location: `Lat: ${latitude}, Long: ${longitude}`,
          }));
        },
        () => alert("Enable GPS to auto-detect location")
      );
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const nextPage = () => {
    if (!form.name || !form.description || !form.phone) {
      alert("Please fill all details.");
      return;
    }
    if (!image) {
      alert("Please upload an image");
      return;
    }

    navigate("/cctv", {
      state: {
        userImage: image,
        userPreview: preview,
        formData: form,
      },
    });
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Lost Item Report</h2>

      <div style={{ width: "60%", margin: "0 auto" }}>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: 8,
            marginTop: 15,
            border: "1px solid gray",
            borderRadius: 6,
          }}
        />

        {/* DESCRIPTION */}
        <input
          type="text"
          name="description"
          placeholder="Item description"
          value={form.description}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: 8,
            marginTop: 15,
            border: "1px solid gray",
            borderRadius: 6,
          }}
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: 8,
            marginTop: 15,
            border: "1px solid gray",
            borderRadius: 6,
          }}
        />

        {/* AUTO LOCATION */}
        <input
          type="text"
          name="location"
          value={form.location}
          readOnly
          style={{
            width: "100%",
            padding: 8,
            marginTop: 15,
            background: "#f2f2f2",
            border: "1px solid gray",
            borderRadius: 6,
          }}
        />

        {/* FILE UPLOAD BELOW FORM */}
        <div style={{ marginTop: 20 }}>
          <input type="file" onChange={handleImage} />
        </div>

        {/* IMAGE PREVIEW */}
        {preview && (
          <div style={{ marginTop: 20 }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                border: "2px solid #ccc",
                borderRadius: 10,
              }}
            />
          </div>
        )}

        {/* NEXT BUTTON */}
        <button
          onClick={nextPage}
          style={{
            marginTop: 25,
            padding: "10px 25px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UploadUserImage;