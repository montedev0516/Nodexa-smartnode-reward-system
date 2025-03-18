// import Link from 'next/link'

export default function  NewPassword() {
  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">New Password</h1>
        </div>
        <div className="w-full py-[10px]">
          <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
          </div>
        </div>
        <div className="w-[300px] sm:w-[527px] py-[100px]">
          <form className="space-y-6">
            <div>
              <label htmlFor="email_address" className="block font-family-poppins text-[18px] font-bold py-[10px]">
                Set New password
              </label>
              <input
                type="text"
                id="email_address"
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[18px] font-bold py-[10px]">
                Confirm New password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="********"
              />
            </div>
            <div className="flex justify-center items-center pt-[20px]">
              <button
                type="submit"
                className="w-[200px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center cursor-pointer"
              >
                Set
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
} 