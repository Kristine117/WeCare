import { useState } from 'react';

const useUpdate = () => {
  const [error, setError] = useState(null);

  const updateFunc= async (method,body,composedUrl) => {
  
    try {
      const response = await 
      fetch(`${process.env.REACT_APP_API_URL}/${composedUrl}`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body)
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const responseData = await response.json();

      return {
        isSuccess: await responseData?.isSuccess
      }
    
    } catch (err) {
      setError(err.message);  // Set error in state if there's an issue
    }
  };

  return { updateFunc, error };
};

export default useUpdate;
