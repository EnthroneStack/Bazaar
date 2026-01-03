import { Mail, MapPinIcon, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const linkSections = [
    {
      title: "PRODUCTS",
      links: [
        { text: "Earphones", path: "/", icon: null },
        { text: "Headphones", path: "/", icon: null },
        { text: "Smartphones", path: "/", icon: null },
        { text: "Laptops", path: "/", icon: null },
      ],
    },
    {
      title: "WEBSITE",
      links: [
        { text: "Home", path: "/", icon: null },
        { text: "Privacy Policy", path: "/", icon: null },
        { text: "Become Plus Member", path: "/pricing", icon: null },
        { text: "Create Your Store", path: "/create-store", icon: null },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { text: "+2348122273000", path: "/", icon: Phone },
        { text: "info@bazaar.com", path: "/", icon: Mail },
        { text: "245 Abuja, 94102", path: "/", icon: MapPinIcon },
      ],
    },
  ];

  const socialIcons = [
    { icon: SiFacebook, link: "https://www.facebook.com" },
    { icon: SiInstagram, link: "https://www.instagram.com" },
    { icon: SiX, link: "https://x.com" },
    { icon: SiLinkedin, link: "https://www.linkedin.com" },
  ];

  return (
    <footer className="w-full bg-primary-900 pt-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-30 py-10 border-b border-slate-500/30 text-slate-500">
          <div className="sm:w-1/3">
            <Image
              src={"/bazaar_logo.png"}
              width={100}
              height={100}
              alt="Bazaar"
              className="mb-4"
            />

            <p className="text-slate-300 text-sm max-w-[410px]">
              Welcome to Bazaar, your ultimate destination for the latest and
              smartest gadgets. From smartphones and smartwatches to essential
              accessories, we bring you the best innovation - all in one place.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map((socialIcon, index) => (
                <Link
                  href={socialIcon.link}
                  key={index}
                  className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:scale-105 hover:border border-slate-300 transition rounded-full"
                >
                  {<socialIcon.icon />}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 text-sm">
            {linkSections.map((section, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="font-semibold mb-3 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-300 hover:text-white hover:underline decoration-1 transition"
                    >
                      {link.icon && <link.icon size={16} />}
                      <Link href={link.path}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-sm text-slate-500 text-center">
          Copyright 2025 © Bazaar All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
