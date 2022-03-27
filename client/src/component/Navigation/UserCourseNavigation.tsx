import React from 'react'

type naviType = {
  test: string;
  setTest: React.Dispatch<React.SetStateAction<string>>;
}
const style2 = "inline-block py-2 px-3 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-4 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400  dark:hover:text-gray-100"
const style1 = "inline-block py-2 px-3 text-sm font-medium text-center text-white rounded-t-lg border-b-4 border-gray-50 active dark:text-white dark:border-white"
const UserCourseNavigation = (props: naviType) => {
  return (
    <div className="min-h-full">
      <nav className="bg-black ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-start text-3xl  h-20">
            <p className='text-white ml-11 font-serif font-bold'>Öğrenim İçeriğim</p>
          </div>

          <div className="flex items-end justify-start mt-5">
            <div className="flex items-center">

              <div className="hidden md:block ">
                <div className="ml-10 flex items-baseline space-x-4 mb-1">

                  <a href="#" className={props.test == "mycourse" ? style1 : style2} onClick={() => props.setTest("mycourse")} aria-current="page">Tüm kurslar
                  </a>

                  <a href="#" className={props.test == "Wishlist" ? style1 : style2} onClick={() => props.setTest("Wishlist")}>İstek Listesi
                  </a>
                  {/* 
                  <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-3 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400  dark:hover:text-gray-100" >Projects</a>

                  <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg border-b-2 border-white active dark:text-white dark:border-white">Calendar</a>

                  <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-100">Reports</a> */}
                </div>
              </div>
            </div>


          </div>
        </div>


      </nav>


      {/* <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>

        </div>
      </main> */}
    </div>
  )
}

export default UserCourseNavigation