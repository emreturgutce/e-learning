import React from 'react'
import HorizontalNonLinearStepper from '../../component/CretaeCourse/CustomStepper'
import {useParams} from "react-router-dom";

const CreateCourse = () => {
    const { id } = useParams();

  return (
    <div>
      <HorizontalNonLinearStepper id={id}></HorizontalNonLinearStepper>
    </div>
  )
}

export default CreateCourse