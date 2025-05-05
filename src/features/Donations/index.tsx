// features/Donaciones/index.tsx
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import DonationAmount from './DonationAmount';
import DonationForm from './DonationForm';

const Donaciones = () => {
    const { t } = useTranslation('common');
    const [step, setStep] = useState<'amount' | 'form'>('amount');
    const [amount, setAmount] = useState<number | null>(100); // 100 predeterminado

    return (
        <div className="max-w-md mx-auto bg-ymca-white dark:bg-ymca-blue/90 rounded-xl shadow-md overflow-hidden p-6 border border-ymca-blue/90">
            {step === 'amount' ? (
                <DonationAmount
                    t={t}
                    onContinue={(selectedAmount) => {
                        setAmount(selectedAmount);
                        setStep('form');
                    }}
                    initialAmount={100} // 100 predeterminado
                />
            ) : (
                <DonationForm
                    t={t}
                    amount={amount!}
                    onBack={() => setStep('amount')}
                />
            )}
        </div>
    );
};

export default Donaciones;