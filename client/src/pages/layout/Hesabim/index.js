import React from 'react'
import Profile from "./Profile/Index"
import ProfileEmail from "./ProfileEmail/index"
import EditableSkills from "./EditableSkills/index"
import EditableEducation from './EditableEducation'
const Index = () => {


  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">


      <div className="w-full  space-y-4">

        <Profile />



        <div className="bg-white p-4 rounded-[10px] shadow">




          <ProfileEmail />


        </div>

        <div className="bg-white p-4 rounded-[10px] shadow">

          <EditableSkills />
        </div>

        <div className="bg-white p-4 rounded-[10px] shadow">
          <EditableEducation />
        </div>
      </div>


    </div>
  )
}

export default Index
