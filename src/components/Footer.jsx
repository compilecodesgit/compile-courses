import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white text-center py-6 mt-auto">
      <div className="min-h-[200px] flex flex-col justify-center items-center">
        <p>
          &copy; {new Date().getFullYear()} Compile Courses. All rights
          reserved.
        </p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
