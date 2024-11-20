import React, { useContext,useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ds from "./UserEdit.module.css";
import UserContext from "../../UserContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import Swal from "sweetalert2";
import useUpdate from "../../hooks/useUpdate";
import useFetchData from "../../hooks/useGetData";
import LoadingElement from "../../components/LoadingElement/LoadingElement";
import Button from "../../components/Button/Button";
import ProfileModule from "../Profile/Profile.module.css";

const UserEdit = ()=>{
    const {userId} = useParams();
    const {user} = useContext(UserContext);
    const {updateFunc} = useUpdate();
    const [data,setData]= useState(null);
    const [fullName, setFullName] = useState("");
    const navigate = useNavigate();
    const {fetchDataFuncHandler,loading,error}=useFetchData();


    async function parseData(){
        const composedUrl = `admin/assistant-details/${encodeURIComponent(userId)}`
        const result =await fetchDataFuncHandler(composedUrl);
        setFullName(result.data.lastname +" "+ result.data.firstname);
        setData(result.data);
    }
    useEffect(()=>{
        parseData();
        
    },[userId])

    async function updateUserPassword(e){
        e.preventDefault();
        const form = new FormData(e.target);

        const password = await form.get("password");
        const confirmPassword = await form.get("confirm-password");
     
          const composedUrl = `admin/update-user/password/${encodeURIComponent(userId)}`
        const result =await updateFunc("PUT",{
            password,
            confirmPassword
        },composedUrl)

        const {isSuccess,message}= await result;

        const operationWork = isSuccess ? "Successful Operation": "Something went wrong!";

         Swal.fire({
            title: message,
            icon: isSuccess ? "success": "error",
            text: operationWork,
          });

        return navigate("/users");
    }

    
    return(
        <main>
        {/* {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>} */}
        {user?.id &&  <section className={ds['dashboard']}>
        <SideMenu />
            <DashboardContainer>
          
                <section className={ds["user-profile"]}>

                    {loading && <LoadingElement/>}
                    {!loading && 
                    <form onSubmit={updateUserPassword}>
                        <div className={ProfileModule["profile-container"]}>
                            <div className="m-4">
                                <div className={ProfileModule["profile-head"]}>
                                Modify password of user : {fullName}
                                </div>
                            </div>
                            <div className={`${ProfileModule.containerSizeDifiner}`}>
                                <div  className={`${ProfileModule.card}`}>
                                    <div className="form-group"> 
                                        <label htmlFor="text">Password:</label>
                                        <input 
                                        name="password" 
                                        type="password"
                                        className="form-control"
                                        required/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="text">Confirm Password:</label>
                                        <input 
                                        name="confirm-password" 
                                        type="password" 
                                        className="form-control"
                                        required/>
                                    </div>


                        
                                    <Button className="btn btn-primary" type="submit">Submit</Button> 
                                </div>
                            </div>

                        </div>
                    </form>}

                </section>
           </DashboardContainer>            
        </section>}
    </main>
)
    
}


export default UserEdit;