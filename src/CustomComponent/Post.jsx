

import { useRef, useState, useEffect } from "react";

const Post = () => {
  const editorRef = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  // Execute formatting commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  // Insert Image from URL
  const insertImage = () => {
    if (imageURL.trim() !== "") {
      addImageToEditor(imageURL);
      setImageURL(""); // Clear input
    }
  };

  // Upload Image from Local System
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addImageToEditor(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag & Drop Image Upload
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleImageUpload({ target: { files: e.dataTransfer.files } });
  };

  // Insert Emoji
  const addEmoji = (emoji) => {
    editorRef.current.innerHTML += emoji.native;
  };

  // Insert Link
  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  // Remove Link
  const removeLink = () => {
    execCommand("unlink");
  };

  // Insert Horizontal Line
  const insertHorizontalLine = () => {
    execCommand("insertHorizontalRule");
  };

  // Insert Date & Time
  const insertDateTime = () => {
    const date = new Date();
    execCommand("insertText", date.toLocaleString());
  };

  // Add Code Block
  const addCodeBlock = () => {
    const codeBlock = document.createElement("pre");
    codeBlock.textContent = "// Your code here";
    editorRef.current.appendChild(codeBlock);
  };

  // Save Drafts to Local Storage
  const saveDraft = () => {
    const content = editorRef.current.innerHTML;
    localStorage.setItem("draft", content);
  };

  // Load Draft from Local Storage
  const loadDraft = () => {
    const savedContent = localStorage.getItem("draft");
    if (savedContent) {
      editorRef.current.innerHTML = savedContent;
    }
  };

  // Word Count
  const updateWordCount = () => {
    const text = editorRef.current.innerText;
    const words = text.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  // Handle Publish
  const handlePublish = () => {
    const content = editorRef.current.innerHTML;
    console.log(content);
  };

  // Add image to the editor
  const addImageToEditor = (src) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.maxWidth = "100%"; // Responsive image
    img.style.cursor = "pointer";
    img.style.margin = "10px 0";
    img.onclick = () => setSelectedImage(img); // Select image on click
    editorRef.current.appendChild(img);
  };

  // Handle image controls
  const deleteImage = () => {
    if (selectedImage) {
      selectedImage.remove();
      setSelectedImage(null);
    }
  };

  const alignImage = (alignment) => {
    if (selectedImage) {
      selectedImage.style.display = "block";
      selectedImage.style.margin = alignment === "left" ? "10px auto 10px 0" :
                                   alignment === "right" ? "10px 0 10px auto" :
                                   "10px auto";
    }
  };

  useEffect(() => {
    loadDraft();
    editorRef.current.addEventListener("input", updateWordCount);
  }, []);

  return (
    <div className="w-full mx-auto p-4 bg-white border rounded-lg shadow-md">
      {/* Toolbar */}
      <div className="flex flex-wrap space-x-2 space-y-2 mb-4 p-2 bg-gray-100 rounded-lg shadow-sm">
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("bold")}>B</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("italic")}>I</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("underline")}>U</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("insertOrderedList")}>OL</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("insertUnorderedList")}>UL</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("justifyLeft")}>Left</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("justifyCenter")}>Center</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("justifyRight")}>Right</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("undo")}>Undo</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("redo")}>Redo</button>
        <button className="px-3 py-1 bg-blue-400 text-white rounded-md" onClick={insertLink}>🔗 Link</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={removeLink}>Remove Link</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("superscript")}>Sup</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("subscript")}>Sup</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={() => execCommand("strikeThrough")}><del>Del</del></button>
        <input type="color" className="h-8 w-10 rounded-md border-none" onChange={(e) => execCommand("backColor", e.target.value)} />
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={insertHorizontalLine}>Insert HR</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={addCodeBlock}>Code Block</button>
        <button className="px-3 py-1 bg-gray-300 rounded-md" onClick={insertDateTime}>Insert Date & Time</button>
      </div>

      {/* Image Upload Inputs */}
      <div className="flex space-x-2 mb-4">
        <input type="text" placeholder="Enter Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="px-3 py-2 border rounded-md w-full" />
        <button onClick={insertImage} className="px-4 py-2 bg-green-500 text-white rounded-md">Insert Image</button>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
        <label htmlFor="imageUpload" className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">Upload</label>
      </div>

      {/* Drag & Drop Area */}
      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-6 text-center ${dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}>
        Drag & Drop an image here
      </div>

      {/* Image Editing Controls */}
      {selectedImage && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md flex space-x-2">
          <button onClick={deleteImage} className="px-3 py-1 bg-red-500 text-white rounded-md">Delete</button>
          <button onClick={() => alignImage("left")} className="px-3 py-1 bg-gray-500 text-white rounded-md">Left</button>
          <button onClick={() => alignImage("center")} className="px-3 py-1 bg-gray-500 text-white rounded-md">Center</button>
          <button onClick={() => alignImage("right")} className="px-3 py-1 bg-gray-500 text-white rounded-md">Right</button>
        </div>
      )}

      {/* Content Editable Area */}
      <div ref={editorRef} contentEditable="true" className="w-full h-60 p-4 border border-gray-300 rounded-lg text-lg bg-white shadow-inner overflow-auto mt-4" style={{ minHeight: "200px" }}></div>

      {/* Word Count */}
      <div className="mt-2 text-sm text-gray-600">Word Count: {wordCount}</div>

      {/* Publish Button */}
      <button onClick={handlePublish} className="mt-4 px-6 py-2  bg-blue-500 text-white rounded-md">Publish</button>

      {/* Save Draft Button */}
      <button onClick={saveDraft} className="mt-4 ml-3 px-6 py-2 bg-yellow-500 text-white rounded-md">Save Draft</button>
    </div>
  );
};

export default Post;






