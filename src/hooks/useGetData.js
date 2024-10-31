import { useState } from "react";

const useFetchData = ()=>{
    const [loading,setLoading] = useState(false);
  
    const [error,setError]= useState(null);

    const fetchDataFuncHandler= async(composedUrl)=>{
        try{
            setLoading(true);

            const dataSet = await fetch(`${process.env.REACT_APP_API_URL}/${composedUrl}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json' 
                }
            })
    
            if(!dataSet.ok) {
                setError("Something went wrong. Please Try again");
            }
    
            const response = await dataSet.json();
            setLoading(false)
            return response;
        }catch(e){
            setError(e.message)
        }

       
    }
    

    return {
        fetchDataFuncHandler,
        error,
        loading
    }

}

export default useFetchData;