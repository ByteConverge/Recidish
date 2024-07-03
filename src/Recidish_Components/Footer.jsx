import { Link } from "react-router-dom";

let currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-black p-4 md:p-12 flex flex-col items-center md:items-start border-t border-gray-800 min-h-[50vh] md:h-[45vh]">
      <div className="flex w-full md:pl-16 h-[15%] md:h-[40%] items-center justify-center md:justify-start gap-2.5 md:gap-1">
        <figure className="w-16 md:w-30 h-[50%] md:h-full grid place-items-center transform -translate-y-2 md:-translate-y-5">
          <img src="enomalogo2.PNG" alt="" className="h-full w-full" />
        </figure>
        <div className="flex gap-2.5 md:gap-5">
          <Link className="text-white">Our Communities</Link>
          <Link className="text-white">Help</Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-start h-[80%] md:h-[70%] gap-1.5 md:gap-0">
        <div className="flex flex-col md:w-[60%] h-[70%] md:h-full pt-0 md:pt-6 text-center md:text-left gap-4 md:gap-4 md:ml-40">
          <div className="flex flex-col md:grid md:grid-cols-3 text-sm md:text-lg md:row-gap-4 h-full w-full pl-0 md:pl-4">
            <Link className="text-white">Legal & Privacy</Link>
            <Link className="text-white">User Agreement</Link>
            <Link className="text-white">Privacy & Cookie Policy</Link>
            <Link className="text-white">Online Service Updates</Link>
            <Link className="text-white pl-0 md:pl-4">Security</Link>
            <Link className="text-white">Cookie Preferences</Link>
          </div>
          <p className="text-white">&copy; {currentYear} E-NOMA</p>
        </div>
        <div className="flex flex-col items-center justify-center md:justify-start gap-2.5 md:gap-2.5 w-[50%] md:w-40 h-[20%] md:h-auto">
          <h3 className="text-white text-base md:text-lg">Contact Us</h3>
          <div className="flex gap-1.75">
            <Link>
              <figure>
                <img src="Xlogo.svg" alt="" />
              </figure>
            </Link>
            <Link>
              <figure>
                <img src="facebookLogo.svg" alt="" />
              </figure>
            </Link>
            <Link>
              <figure>
                <img src="instaLogo.svg" alt="" />
              </figure>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
