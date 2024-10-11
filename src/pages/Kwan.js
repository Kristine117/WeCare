import { useState,useEffect } from "react";


const Kwan = ()=>{
    const [value,setValue]=useState();
    async function getKwan(e){
        setValue(e.target.files[0]);
    }

    async function uploadMe 
    (e) {
        const formData = new FormData();
        formData.append("file",value)

        console.log(formData.get("file"));
        const data = await fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`,{
            method:"POST",
            formData
        });

        console.log(await data.json());
    }


    return(
     
            <>
            <input type="file" onChange={getKwan}/>
            <button type="submit" onClick={uploadMe}>Upload</button>
            </>
          
    )
}

export default Kwan;