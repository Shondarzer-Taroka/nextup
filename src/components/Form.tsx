


// 'use client'
// import React, { useState } from 'react';

// const Form = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     photo: '',
//     description: '',
//     hobby: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file)); // Preview image
//       setFormData({
//         ...formData,
//         photo: file.name, // You can later replace this with Cloudinary's URL once uploaded
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Upload image to Cloudinary
//     const formDataToSend = new FormData();
//     formDataToSend.append("file", formData.photo);
//     formDataToSend.append("upload_preset", "my-uploads");
// console.log(formData);

//     const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dw72swggv/image/upload", {
//       method: "POST",
//       body: formDataToSend,
//     });

//     const cloudinaryData = await cloudinaryResponse.json();

//     // Use Cloudinary URL
//     const uploadedImageUrl = cloudinaryData.secure_url;

//     const response = await fetch('http://localhost:3000/api/submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ...formData, photo: uploadedImageUrl }),
//     });

//     const result = await response.json();
//     setLoading(false);

//     if (result.success) {
//       alert('Data submitted successfully');
//       setFormData({
//         name: '',
//         email: '',
//         photo: '',
//         description: '',
//         hobby: '',
//       });
//       setImagePreview(null); // Reset preview
//     } else {
//       alert('Error submitting data');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Submit Your Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="photo" className="block text-lg font-medium text-gray-700">Upload Photo</label>
//           <input
//             type="file"
//             id="photo"
//             name="photo"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none"
//           />
//           {imagePreview && (
//             <div className="mt-4">
//               <img src={imagePreview} alt="Preview" className="max-w-xs h-auto rounded-lg shadow-md" />
//             </div>
//           )}
//         </div>

//         <div className="mb-6">
//           <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             rows={4}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="hobby" className="block text-lg font-medium text-gray-700">Hobby</label>
//           <input
//             type="text"
//             id="hobby"
//             name="hobby"
//             value={formData.hobby}
//             onChange={handleChange}
//             className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex justify-center mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 focus:ring-4 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Form;


'use client'
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    description: '',
    hobby: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure a file is selected
      if (!imagePreview) {
        alert('Please upload an image first.');
        setLoading(false);
        return;
      }

      // Create form data for ImgBB
      const formDataToSend = new FormData();
      const photoInput = document.getElementById('photo') as HTMLInputElement;
      const file = photoInput?.files?.[0];

      if (!file) {
        alert('Image file missing!');
        setLoading(false);
        return;
      }

      formDataToSend.append('image', file);

      // Upload image to ImgBB
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API}`, {
        method: 'POST',
        body: formDataToSend,
      });

      const imgbbData = await imgbbResponse.json();

      if (!imgbbData.success) {
        alert('Image upload failed');
        setLoading(false);
        return;
      }

      // Use the ImgBB URL
      const uploadedImageUrl = imgbbData.data.url;

      // Send the form data with the uploaded image URL
      const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, photo: uploadedImageUrl }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        alert('Data submitted successfully');
        setFormData({
          name: '',
          email: '',
          photo: '',
          description: '',
          hobby: '',
        });
        setImagePreview(null); // Reset preview
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Submit Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="photo" className="block text-lg font-medium text-gray-700">Upload Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-w-xs h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hobby" className="block text-lg font-medium text-gray-700">Hobby</label>
          <input
            type="text"
            id="hobby"
            name="hobby"
            value={formData.hobby}
            onChange={handleChange}
            className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 focus:ring-4 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
