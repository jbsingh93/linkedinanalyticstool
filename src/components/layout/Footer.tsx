import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-100 p-4 text-center text-sm text-neutral-600 border-t border-neutral-200">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} LinkedIn Post Search. For personal use.</p>
      </div>
    </footer>
  );
};

export default Footer;
