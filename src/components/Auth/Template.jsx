import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm" 

function Template({ title, description , formType }) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
    </div>
  )
}

export default Template;