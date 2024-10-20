import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUpdateAppointment = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const updateAppointment = async (appId, method,body) => {
    console.log(body)
    const newAppId = encodeURIComponent(appId)
    try {
      const response = await 
      fetch(`${process.env.REACT_APP_API_URL}/appointment/update-appointment/${newAppId}`, {
        method: method,
        headers: {
          "servingname":body.servingName,
          "status":body.result,
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const responseData = await response.json();
      console.log(responseData);

      navigate('/appointment');  // Redirect to /appointment after success
    } catch (err) {
      console.error(err.message);
      setError(err.message);  // Set error in state if there's an issue
    }
  };

  return { updateAppointment, error };
};

export default useUpdateAppointment;
