import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="flex justify-center items-center space-x-[25px] pb-[28px]">
        <Link href="/terms">
          <button className="font-family-poppins text-size-[18px] text-white hover:text-gray-400 cursor-pointer">Terms of Use</button>
        </Link>
        <Link href="/contact">
          <button className="font-family-poppins text-size-[18px] text-white hover:text-gray-400 cursor-pointer">Contact Us</button>
        </Link>
      </div>
      <div className="flex justify-center items-center border-t border-[#00AEB9] pt-[22px]">
         <p className="text-sm text-white">Copyright &copy; 2025 Nodexa labs</p>
      </div>
    </footer>
  );
} 