// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTicketForm = () => {
//   const [formData, setFormData] = useState({
//     tTitle: '',
//     tType: '',
//     tContent: '',
//     tDate: '',
//     tReply: '',
//     tReplyDate: '',
//     tStatus: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData); // Log the form data before the request
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await axios.post('http://localhost:4000/api/tickets/add', formData);
//         console.log('Response:', response.data); // Log the response from the API
//         // Reset the form and handle success as needed
//       } catch (error) {
//         console.error('API Error:', error); // Log any API errors
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = (data) => {
//     const errors = {};
//     if (!data.tTitle) {
//       errors.tTitle = 'Title is required';
//     }
//     if (!data.tType) {
//       errors.tType = 'Type is required';
//     }
//     // Add more validation checks as needed

//     return errors;
//   };

//   return (
//     <div>
//       <h2>Add New Ticket</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="tTitle"
//             value={formData.tTitle}
//             onChange={handleChange}
//           />
//           {errors.tTitle && <div className="error">{errors.tTitle}</div>}
//         </div>

//         <div>
//           <label>Type:</label>
//           <input
//             type="text"
//             name="tType"
//             value={formData.tType}
//             onChange={handleChange}
//           />
//           {errors.tType && <div className="error">{errors.tType}</div>}
//         </div>

//         <div>
//           <label>Content:</label>
//           <textarea
//             name="tContent"
//             value={formData.tContent}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="tDate"
//             value={formData.tDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Reply:</label>
//           <textarea
//             name="tReply"
//             value={formData.tReply}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Reply Date:</label>
//           <input
//             type="date"
//             name="tReplyDate"
//             value={formData.tReplyDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Status:</label>
//           <input
//             type="text"
//             name="tStatus"
//             value={formData.tStatus}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddTicketForm;


import React, { useState } from 'react';
import axios from 'axios';
import "../../addTicketForm.css"

const AddTicketForm = () => {
    const [formData, setFormData] = useState({
      tTitle: '',
      tType: '',
      tContent: '',
      tDate: '',
      tReply: '',
      tReplyDate: '',
      tStatus: '',
    });
  
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form Data:', formData); // Log the form data before the request
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length === 0) {
        try {
          const response = await axios.post('http://localhost:4000/api/tickets/add', formData);
          console.log('Response:', response.data); // Log the response from the API
          // Reset the form and handle success as needed
        } catch (error) {
          console.error('API Error:', error); // Log any API errors
        }
      } else {
        setErrors(validationErrors);
      }
    };
  
    const validateForm = (data) => {
      const errors = {};
      if (!data.tTitle) {
        errors.tTitle = 'Title is required';
      }
      if (!data.tType) {
        errors.tType = 'Type is required';
      }
      // Add more validation checks as needed
  
      return errors;
    };
  
    return (
      <div className="form-container">
        <h1>Add New Ticket</h1>
        <img src="https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg" alt="ticket Image" className="ticket-image"/>
        <form onSubmit={handleSubmit}>
        
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="tTitle"
              className={`input ${errors.tTitle ? 'is-invalid' : ''}`}
              value={formData.tTitle}
              onChange={handleChange}
            />
            {errors.tTitle && <div className="invalid-feedback">{errors.tTitle}</div>}
          </div>
  
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="tType"
              className={`input ${errors.tType ? 'is-invalid' : ''}`}
              value={formData.tType}
              onChange={handleChange}
            />
            {errors.tType && <div className="invalid-feedback">{errors.tType}</div>}
          </div>
  
          <div>
            <label>Content:</label>
            <textarea
              name="tContent"
              className="input"
              value={formData.tContent}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="tDate"
              className="input"
              value={formData.tDate}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <label>Reply:</label>
            <textarea
              name="tReply"
              className="input"
              value={formData.tReply}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <label>Reply Date:</label>
            <input
              type="date"
              name="tReplyDate"
              className="input"
              value={formData.tReplyDate}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="tStatus"
              className="input"
              value={formData.tStatus}
              onChange={handleChange}
            />
          </div>
  
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    );
  };
  
  export default AddTicketForm;