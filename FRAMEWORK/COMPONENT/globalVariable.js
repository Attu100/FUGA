import {createContext, useState} from 'react'
import React from 'react'


export const AppContext = createContext()

export function GlobalVariable({children}) {
    const [preLoader,setPreLoader] = useState(false)
    const [profile, setProfile] = useState({
        name:{
            surName:"",
            middleName:"",
            firstName:"",
        },
        school:{
            faculty:"",
            department:"",
            CourseOfStudy:"",
            level:"",
            matricNumber:"",
        },
        contact:{
            email:"",
            homeAddress:"",
            phoneNumber:""
        },
        authentication:{
            password:""
        },
        profileImage:""
    })
  return (
    <AppContext.Provider
    value={{
        profile, setProfile,
        preLoader,setPreLoader
    }}>
        {children}
    </AppContext.Provider>
  )
}
