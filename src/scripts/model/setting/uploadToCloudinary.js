'use strict';



export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // Added img file
  formData.append("upload_preset", "unsigned_preset"); // preset name
  const cloudName = "dwmloubwf"; // Cloudinary cloud name

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url; // Get uploaded image URL
  } catch (error) {
    console.error(error);
    return null;
  }
};
