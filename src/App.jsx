import React from 'react'

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <span className="text-blue-900 font-bold text-xl">PureStock</span>
            <div className="hidden md:flex space-x-6">
              <a href="#problem" className="text-gray-600 hover:text-blue-900">Problem</a>
              <a href="#solution" className="text-gray-600 hover:text-blue-900">Solution</a>
              <a href="#process" className="text-gray-600 hover:text-blue-900">Process</a>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            >
              Sell Your Stock
            </button>
          </div>
        </div>
      </nav>

      {/* Problem Section */}
      <div id="problem" className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-blue-200 font-semibold mb-2 block">For Pharma & Skincare Suppliers</span>
            <h1 className="text-4xl font-bold mb-6">
              Sitting on Short-Dated Pharma & Skincare Products?
            </h1>
            <div className="space-y-4 mb-8">
              {[
                "Losing money on premium products approaching expiry dates",
                "Complex compliance requirements limiting quick sales",
                "Storage costs eating into your margins"
              ].map((pain, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <i className="fas fa-exclamation-circle mt-1 text-red-300"></i>
                  <p className="text-blue-100">{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div id="solution" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">We Buy Your Stock Directly</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Immediate Purchase",
                description: "We buy your short-dated pharma & skincare products directly - no waiting for buyers",
                icon: "shopping-cart"
              },
              {
                title: "Guaranteed Payment",
                description: "Receive payment within 48 hours of stock verification",
                icon: "money-bill-wave"
              },
              {
                title: "Compliant Process",
                description: "Full documentation and GDP-compliant handling guaranteed",
                icon: "shield-check"
              }
            ].map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas fa-${solution.icon} text-xl text-blue-900`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div id="process" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple 3-Step Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "List Products",
                description: "Share your short-dated inventory details via our simple form",
                time: "5 min",
                icon: "clipboard-list"
              },
              {
                step: 2,
                title: "Get Quote",
                description: "Receive our purchase offer within 24 hours",
                time: "24h",
                icon: "file-invoice-dollar"
              },
              {
                step: 3,
                title: "Get Paid",
                description: "Accept offer and receive payment within 48 hours",
                time: "48h",
                icon: "money-bill-wave"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm relative">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas fa-${step.icon} text-xl text-blue-900`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-2">{step.description}</p>
                <span className="text-blue-900 font-semibold text-sm">{step.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get an Offer Today</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn your short-dated inventory into immediate revenue. 
            GDP-compliant process guaranteed.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800"
          >
            List Your Stock
          </button>
          <div className="flex justify-center mt-8 space-x-8">
            {[
              { icon: "shield-alt", text: "GDP Compliant" },
              { icon: "clock", text: "48h Payment" },
              { icon: "file-contract", text: "Secure Process" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <i className={`fas fa-${item.icon} text-blue-900 text-xl`}></i>
                <span className="text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">List Your Stock</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Company Name</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Product Category</label>
                <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Pharmaceuticals</option>
                  <option>Skincare Products</option>
                  <option>Medical Supplies</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Stock Value (€)</label>
                <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Less than 50,000</option>
                  <option>50,000 - 200,000</option>
                  <option>200,000 - 500,000</option>
                  <option>More than 500,000</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                >
                  Get Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App