import axios from 'axios';
import {  useEffect, useState } from 'react';
import { formatMoney } from '../../utils/money';
import { OrderSummary } from './OrderSummary.jsx';
import {PaymentSummary} from './payment-summary.jsx';
import './checkout-header.css';
import './checkoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);


    useEffect(() => {

        const fetchCheckoutData = async () => {
            let response = await axios
            .get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);

            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        };
        
        fetchCheckoutData();
        
    }, [cart]);

    return (
        <>

            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout Item(<a className="return-to-home-link"
                            href="/"> s</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} 
                    loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary}
                    loadCart={loadCart} />
                </div>
            </div>
        </>
    );
}