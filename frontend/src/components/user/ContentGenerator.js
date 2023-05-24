import React, { useState } from "react";
import Swal from "sweetalert2";
import app_config from "../../config";

const ContentGenerator = () => {
  const [promt, setPromt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { apiUrl } = app_config;

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const saveContent = async (content) => {
    const res = await fetch(apiUrl+"/content/add", {
      method : 'POST',
      body : JSON.stringify({
        prompt: promt,
        content,
        user: currentUser._id,
        created_at: new Date()
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Content Saved Successfully",
      });
    }
  }

  const generateCode = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("text", promt);

    const res = await fetch("https://api.deepai.org/api/text-generator", {
      method: "POST",
      headers: {
        "api-key": "d54edfd1-e974-4676-b598-ff468113088c",
      },
      body: form,
    });

    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setGeneratedContent(data.output);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Content Generated Successfully",
      });
      saveContent(data.output);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container py-5">
        <div className="header-img d-flex align-items-end">
          <h1 className="text-center text-white display-4 fw-bold">AI Content Generator</h1>
        </div>
        <div className="card">
          <div className="card-header">
            <textarea
              className="form-control"
              rows="10"
              onChange={(e) => setPromt(e.target.value)}
            ></textarea>
            <div className="my-3">
              <button className="btn btn-primary" onClick={generateCode}>
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Generate"
                )}
              </button>

              <button className="btn btn-danger ms-3">Save Content</button>
            </div>
          </div>
          <div className="card-body">
            {generatedContent ? (
              <div>
                <h5 className="card-title">Generated Content</h5>
                <p className="card-text">{generatedContent}</p>
              </div>
            ) : (
              <div>
                <p className="text-center text-muted display-4">
                  Enter Promt to Generate Content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
