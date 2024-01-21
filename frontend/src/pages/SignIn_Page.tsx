
const SignIn = () => {

    return (
      <div className="flex flex-col items-center">
          <h1 className="text-[#305F56] text-center text-[50px] font-[800] mt-[123px]">
            wy.ai
          </h1>

          <div className=" w-[319px] h-[500px] mt-[100px] bg-[#CFDED2] flex flex-col items-center gap-y-[0.625rem] \
                rounded-2xl border-4 border-[#305F56] ">

                  <h1 className="text-[#305F56] text-center text-[38px] font-[800] mt-[32px]">
                    Sign in
                  </h1>

                  <div className=" w-[282px] h-[69px] bg-[#FFFEF6] flex flex-col justify-center mt-[30px] \
                      rounded-2xl border-4 border-[#305F56] " > 
                    <h1 className="text-[#305F56] text-[20px] font-[400] ml-3">
                      Email or Phone
                     </h1>
                  </div>

                  <div className=" w-[282px] h-[69px] bg-[#FFFEF6] flex flex-col justify-center mt-[24px] \
                      rounded-2xl border-4 border-[#305F56] " > 
                    <h1 className="text-[#305F56] text-[20px] font-[400] ml-3">
                      Password
                     </h1>
                  </div>

                  <h1 className="text-[#424242] text-[16px] font-[400] ml-[120px] mt-[10px]">
                    Forgot Password?
                  </h1>

                  <div className=" w-[210px] h-[49px] bg-[#63926C] flex flex-col justify-center items-center mt-[10px] \
                      rounded-full drop-shadow-xl" > 
                    <h1 className="text-[#F0F7F2] text-[16px] font-[600]">
                      Sign in
                     </h1>
                  </div>

                  <h1 className="text-[#1C274C] text-[16px] font-[200] mt-5">
                    Don’t have an account? Sign Up
                     </h1>
          </div>
      </div>
    )
}

export default SignIn