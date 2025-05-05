// features/Donaciones/DonationForm.tsx
import React, { useState } from 'react';

interface DonationFormProps {
    t: (key: string) => string;
    amount: number;
    onBack: () => void;
}

const DonationForm = ({ t, amount, onBack }: DonationFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams({
            public_key: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || '',
            amount: amount.toString(),
            currency: 'COP',
            name: formData.name,
            email: formData.email,
        });
        window.location.href = `https://checkout.epayco.co/checkout.php?${params}`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-ymca-blue dark:text-ymca-white">
                {t('donation_details')}
            </h2>
            <p className="text-center text-ymca-blue dark:text-ymca-white/80">
                {t('amount')}: ${amount.toLocaleString()}
            </p>

            <div>
                <label className="block text-sm font-medium text-ymca-blue dark:text-ymca-white mb-1">
                    {t('full_name')}
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-ymca-blue dark:border-ymca-white rounded-lg bg-ymca-white dark:bg-ymca-black text-ymca-blue dark:text-ymca-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-ymca-blue dark:text-ymca-white mb-1">
                    {t('email')}
                </label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-ymca-blue dark:border-ymca-white rounded-lg bg-ymca-white dark:bg-ymca-black text-ymca-blue dark:text-ymca-white"
                />
            </div>

            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-ymca-orange hover:text-ymca-yellow px-4 py-2 rounded-lg transition-colors"
                >
                    &lt; {t('back')}
                </button>
                <button
                    type="submit"
                    className="bg-ymca-orange hover:bg-ymca-yellow text-ymca-white px-6 py-2 rounded-lg transition-colors"
                >
                    {t('donate_now')}
                </button>
            </div>
        </form>
    );
};

export default DonationForm;