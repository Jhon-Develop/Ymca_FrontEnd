// features/Donaciones/DonationAmount.tsx
import React, { useState, useEffect } from 'react';

interface DonationAmountProps {
    t: (key: string) => string;
    onContinue: (amount: number) => void;
    initialAmount: number;
}

const DonationAmount = ({ t, onContinue, initialAmount }: DonationAmountProps) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(initialAmount);
    const [customAmount, setCustomAmount] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [error, setError] = useState('');

    const presetAmounts = [10, 25, 50, 100, 250];

    useEffect(() => {
        // Seleccionar automáticamente el valor inicial (100)
        setSelectedAmount(initialAmount);
        setCustomAmount('');
        setIsCustom(false);
    }, [initialAmount]);

    const handleSubmit = () => {
        const amount = isCustom ? parseFloat(customAmount) : selectedAmount;

        if (!amount || amount <= 0) {
            setError(t('amount_error'));
            return;
        }

        setError('');
        onContinue(amount);
    };

    const handleCustomClick = () => {
        setIsCustom(true);
        setSelectedAmount(null);
        setCustomAmount(''); // Limpiar el valor anterior
        setError('');
    };

    const handlePresetClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount(amount.toString());
        setIsCustom(false);
        setError('');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-ymca-blue dark:text-ymca-white">
                {t('donation_title')}
            </h2>

            <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((amount) => (
                    <button
                        key={amount}
                        onClick={() => handlePresetClick(amount)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                            selectedAmount === amount && !isCustom
                                ? 'border-ymca-green bg-ymca-green/10 text-ymca-green'
                                : 'border-ymca-blue hover:border-ymca-green text-ymca-blue dark:text-ymca-white'
                        }`}
                    >
                        ${amount}
                    </button>
                ))}

                <button
                    onClick={handleCustomClick}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                        isCustom
                            ? 'border-ymca-green bg-ymca-green/10 text-ymca-green'
                            : 'border-ymca-blue hover:border-ymca-green text-ymca-blue dark:text-ymca-white'
                    }`}
                >
                    {t('custom_amount')}
                </button>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-ymca-blue dark:text-ymca-white mb-1">
                    {t('amount')}
                </label>
                <input
                    type="number"
                    value={isCustom ? customAmount : (selectedAmount?.toString() || '')}
                    onChange={(e) => {
                        if (isCustom) {
                            setCustomAmount(e.target.value);
                        }
                    }}
                    placeholder="$0.00"
                    className="w-full p-3 border border-ymca-blue dark:border-ymca-white rounded-lg focus:ring-ymca-green focus:border-ymca-green bg-ymca-white dark:bg-ymca-black text-ymca-blue dark:text-ymca-white"
                    disabled={!isCustom}
                />
            </div>

            {error && <p className="text-ymca-red text-sm">{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={(!selectedAmount && !customAmount) || (isCustom && !customAmount)}
                className="w-full bg-ymca-green hover:bg-[#059247] text-ymca-white py-3 px-4 rounded-lg disabled:opacity-50 transition-colors"
            >
                {t('continue')} &gt;
            </button>
        </div>
    );
};

export default DonationAmount;