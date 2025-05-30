import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:5000/api/files/upload", formData);
      setImageUrl(res.data.url);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Upload an Image</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={handleUpload} style={{ marginTop: "1rem" }}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width="300px" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
