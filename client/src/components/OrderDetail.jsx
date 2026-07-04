import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state || {};
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('productId');

    const [orderDetails, setorderDetails] = useState({
        address: "",
        phoneNo: "",
        paymentMethod: ""
    });

    // Modal state
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Token Guard 
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login', { 
                replace: true, 
                state: { from: { pathname: `/order${location.search}` } } 
            });
        }
    }, [navigate, location]);

    const getValue = (e) => {
        const { name, value } = e.target;
        setorderDetails(pre => ({
            ...pre,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const res = await axios.post("https://mobile-e-commerce-production-e6b9.up.railway.app/api/auth/place-order", {
                productId,
                type: data.type,
                ...orderDetails
            }, {
                headers: {   
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            setShowSuccessModal(true); 
        } catch (error) {
            console.error("Order error:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate("/"); 
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-between bg-slate-950 font-sans antialiased text-slate-200 overflow-hidden selection:bg-yellow-400 selection:text-black relative">
            
            {/* Main Center Container */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 overflow-hidden">
                <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-800/80 relative overflow-hidden my-auto">
                    
                    {/* Header updated with Sunny Mobiles Identity */}
                    <div className="mb-5 text-center">
                        <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-yellow-400 text-black font-black text-xs uppercase tracking-wider mb-2 shadow-sm">
                            Sunny Mobiles
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white">
                            Secure Checkout
                        </h2>
                    </div>

                    {/* Compact Form */}
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1" htmlFor="address">
                                Shipping Address
                            </label>
                            <input 
                                value={orderDetails.address}
                                onChange={getValue}
                                name="address"
                                type="text"
                                placeholder="House #, Street, City"
                                className="w-full px-3 py-2 text-sm bg-slate-950/50 rounded-xl border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1" htmlFor="phoneNo">
                                Phone Number
                            </label>
                            <input 
                                value={orderDetails.phoneNo}
                                onChange={getValue}
                                name="phoneNo"
                                type="tel"
                                placeholder="03xx-xxxxxxx"
                                className="w-full px-3 py-2 text-sm bg-slate-950/50 rounded-xl border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1" htmlFor="paymentMethod">
                                Payment Method
                            </label>
                            <select 
                                value={orderDetails.paymentMethod}
                                onChange={getValue} 
                                name="paymentMethod"
                                className="w-full px-3 py-2 text-sm bg-slate-950/50 rounded-xl border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150 appearance-none cursor-pointer"
                                required
                            >
                                <option value="" className="bg-slate-900 text-slate-400">Select payment option</option>
                                <option value="COD" className="bg-slate-900 text-white">Cash on Delivery (COD)</option>
                                <option value="credit-card" className="bg-slate-900 text-white">Credit Card</option>
                                <option value="debit-card" className="bg-slate-900 text-white">Debit Card</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 py-2.5 mt-2 rounded-xl transition duration-150 font-bold tracking-wide uppercase text-xs shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-[0.99] transform"
                        >
                            Confirm & Place Order
                        </button>
                    </form>
                </div>
            </div>

            {/* Micro System Footer */}
            <div className="py-2.5 text-center text-[10px] text-slate-600 border-t border-slate-900/50 shrink-0">
                © {new Date().getFullYear()} Sunny Mobiles. All Rights Reserved.
            </div>

            {/* NEW TECH-ECOMMERCE SUCCESS MODAL*/}
            
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-800 relative overflow-hidden transform scale-100 transition-all duration-300">
                        
                        {/* Premium Tech Success Tick Animation */}
                        <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-lg shadow-emerald-500/20 animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Modal Content */}
                        <h3 className="font-sans font-extrabold text-xl text-white mb-2 tracking-wide">
                            Order Placed!
                        </h3>
                        <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6 px-2">
                            Your order has been logged into <span className="text-yellow-400 font-semibold">Sunny Mobiles</span>. We will contact you shortly for verification.
                        </p>

                        {/* Theme Matched Action Button */}
                        <button
                            onClick={handleModalClose}
                            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-widest py-3 rounded-xl transition duration-150 shadow-md shadow-yellow-400/10 active:scale-[0.98]"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default OrderDetail;