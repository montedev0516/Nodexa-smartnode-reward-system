export default function Contact() {
  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">Contact Us</h1>
        </div>
        <div className="w-full py-[10px]">
          <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
          </div>
        </div>
        <div className="w-[300px] sm:w-[527px] py-[30px]">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-family-poppins text-[18px] font-bold py-[10px]">
                First Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[18px] font-bold py-[10px]">
                Last Name
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-[18px] font-bold py-[10px]">
                Email Address
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[18px] font-bold py-[10px]">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full h-[268px] px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex justify-center items-center pt-[20px]">
              <button
                type="submit"
                className="w-[200px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
} 