
import { useState } from 'react'
import Learning from '../../component/learning/Learning'
import UserCourseNavigation from '../../component/Navigation/UserCourseNavigation'
import Wishlist from '../../component/wishlist/Wishlist'


const MyCourses = () => {
  const [test, setTest] = useState("mycourse")
  return (
    <div className="bg-white">
      <UserCourseNavigation test={test} setTest={setTest} ></UserCourseNavigation>
      {test == "mycourse" ? <Learning></Learning> : <Wishlist></Wishlist>

      }

    </div>
  )
}

export default MyCourses