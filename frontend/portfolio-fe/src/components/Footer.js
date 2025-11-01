import React from 'react';

const Footer = () => {
  // Define your dynamic data
  const ownerName = "Rejin Shrestha";
  const phoneNumber = "0226067909";
  const emailAddress = "inforejin@gmail.com";
  const location = "Auckland, New Zealand";
  const currentYear = new Date().getFullYear(); // Automatically gets the current year

  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto"> {/* Added a container for better centering on larger screens */}
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">
            © {currentYear} {ownerName}. All rights reserved.
          </p>

          <p className="text-gray-400 text-md mb-2">
            {location}
          </p>
          <p className="text-gray-400 text-md mb-2">
            Phone: <a href={`tel:${phoneNumber}`} className="hover:text-neon-cyan transition-colors">{phoneNumber}</a>
          </p>
          <p className="text-gray-400 text-md mb-4">
            Email: <a href={`mailto:${emailAddress}`} className="hover:text-neon-cyan transition-colors">{emailAddress}</a>
          </p>

          <div className="flex justify-center space-x-6 text-gray-600">
            <span className="hover:text-neon-cyan transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neon-cyan transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-neon-cyan transition-colors cursor-pointer">Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;