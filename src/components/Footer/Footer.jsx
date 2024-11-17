import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-200 footer footer-center p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
