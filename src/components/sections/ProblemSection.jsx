const ProblemSection = ({ onOpenModal }) => {
  return (
    <section className="bg-[#2A3B8F] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-2xl mb-6">For Cosmetics & Skincare Suppliers</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl mb-12">
          Turn Short-Dated Cosmetics into Quick Cash 
        </h1>
        <div className="space-y-6 mb-12">
          {[
            "Losing money on products approaching expiry dates",
            "Storage costs eating into your margins",
            "Need quick turnaround for cosmetics inventory"
          ].map((problem, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-6 h-6 rounded-full bg-red-400/20 flex items-center justify-center">
                <i className="fas fa-exclamation text-red-400"></i>
              </div>
              <p className="text-xl">{problem}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onOpenModal}
          className="bg-white text-[#2A3B8F] px-8 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          List Your Stock
        </button>
      </div>
    </section>
  );
};
export default ProblemSection;