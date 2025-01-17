import { registerPaymentMethod } from '@woocommerce/blocks-registry';
import { decodeEntities } from '@wordpress/html-entities';
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';

// Fetch settings from WooCommerce
const settings = getSetting('tiankii_data', {}); // Ensure 'tiankii_data' matches the key used in PHP

// Default label if no title is provided
const defaultLabel = __('Tiankii Payments', 'woo-gutenberg-products-block');

// Use title from settings, or fallback to default
const label = settings.title ? decodeEntities(settings.title) : defaultLabel;

// Content component for displaying description
const Content = () => {
    return <div>{settings.description ? decodeEntities(settings.description) : ''}</div>;
};

// Label component for displaying the payment method label and image
const Label = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {
                (settings.showImage === 'yes') 
                && settings.image 
                && <img src={settings.image} alt="Tiankii Logo" style={{ marginRight: '10px' }} />
            }
            <span>{label}</span>
        </div>
    );
};

// Configuration for the Tiankii payment method
const Tiankii = {
    name: 'tiankii',
    label: <Label />,
    content: <Content />,
    edit: <Content />,
    canMakePayment: () => true,
    ariaLabel: label,
    supports: {
        features: settings.supports,
    },
};

// Register the payment method
registerPaymentMethod(Tiankii);