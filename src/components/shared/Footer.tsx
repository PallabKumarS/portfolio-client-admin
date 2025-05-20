import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaInstagram, FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import ContainerComponent from "./ContainerComponent";

const Footer = () => {
  return (
    <div className="py-10 footer-gradient w-full">
      <ContainerComponent className=" ">
        <div className="md:flex items-center gap-4 justify-between space-y-3 md:space-y-0">
          {/* Logo and Created With Section */}
          <div className="text-center">
            <Logo />
          </div>

          {/* Created With Text */}
          <div className="text-center text-foreground">
            Created With{" "}
            <span className="text-primary font-semibold">NextJs </span>
            and <span className="text-primary font-semibold">Shadcn </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.facebook.com/PallabKumars"
              className="transition-transform hover:scale-110"
            >
              <BsFacebook className="text-4xl text-primary hover:text-accent/80" />
            </a>
            <a
              href="https://www.instagram.com/pallabkumars/"
              className="transition-transform hover:scale-110"
            >
              <FaInstagram className="text-4xl text-primary hover:text-accent/80" />
            </a>
            <a
              href="https://twitter.com/PallabKumarS"
              className="transition-transform hover:scale-110"
            >
              <BsTwitter className="text-4xl text-primary hover:text-accent/80" />
            </a>
            <a
              href="https://github.com/PallabKumarS"
              className="transition-transform hover:scale-110"
            >
              <FaGithub className="text-4xl text-primary hover:text-accent/80" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-muted-foreground text-center mt-4">
          Copyright © 2025 - All right reserved
        </div>
      </ContainerComponent>
    </div>
  );
};

export default Footer;
