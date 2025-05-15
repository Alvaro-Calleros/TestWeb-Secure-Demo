import React, { useState } from "react";
import PenTestingOptions from "./PenTestingOptions";

export default function UrlTested() {
  const [url, setUrl] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    setShowOptions(true);
    // BACKEND: envialr la URL al backend para validacion
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <input
          type="url"
          placeholder="URL objetivo"
          required
          className=""
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className=""
        >
          Go
        </button>
      </form>

      {showOptions && <PenTestingOptions targetUrl={url} />}
    </div>
  );
}
