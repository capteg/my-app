// src/components/layout/Navigation.jsx
import logo from '../../assets/ps_purostock_logo transparent.png';

const Navigation = ({ onOpenModal }) => {
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <img src={logo} alt="PureStock" className="h-12 w-auto" />
          </div>
          <button 
            onClick={onOpenModal}
            className="bg-[#2A3B8F] text-white px-6 py-2 rounded-full hover:bg-[#1e2a6a] transition-colors"
          >
            List Your Stock
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;