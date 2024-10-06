import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
    name:'registration',
    initialState: {
        firstname: "",
        lastname: "",
        email:"",

        userType: "",
        street: "",
        barangayId: "",
        experienceId: "",

        password: "",
        gender: "",
        contactNumber: "",
        birthDate: ""
    },
    reducers: {
        collectRegistrationDetails(
            state,
            action
        ){
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.email = action.payload.email
            
            state.userType = action.payload.userType
            state.street = action.payload.street
            state.barangayId = action.payload.barangayId
            state.experienceId = action.payload.experienceId
            state.password = action.payload.password

            state.gender = action.payload.gender
            state.contactNumber = action.payload.contactNumber
            state.birthDate = action.payload.birthDate
        }
    }
})

export default registrationSlice;