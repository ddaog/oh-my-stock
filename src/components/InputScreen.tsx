import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';

interface InputScreenProps {
    onNext: (data: SajuFormData) => void;
}

export interface SajuFormData {
    birthDate: string;
    birthTime: string;
    gender: 'male' | 'female';
    isBirthTimeUnknown: boolean;
}

const InputScreen: React.FC<InputScreenProps> = ({ onNext }) => {
    const [formData, setFormData] = useState<SajuFormData>({
        birthDate: '',
        birthTime: '',
        gender: 'male',
        isBirthTimeUnknown: false,
    });

    const isValid = formData.birthDate.length === 10 && (formData.isBirthTimeUnknown || formData.birthTime.length === 5);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (isValid) {
            onNext(formData);
        }
    };

    // Helper to format date input while typing
    const handleDateInput = (val: string) => {
        const cleaned = val.replace(/\D/g, '');
        let formatted = cleaned;
        if (cleaned.length > 4) formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
        if (cleaned.length > 6) formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
        setFormData({ ...formData, birthDate: formatted.slice(0, 10) });
    };

    const handleTimeInput = (val: string) => {
        const cleaned = val.replace(/\D/g, '');
        let formatted = cleaned;
        if (cleaned.length > 2) formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
        setFormData({ ...formData, birthTime: formatted.slice(0, 5) });
    };

    return (
        <div className="flex-1 flex flex-col pt-8 pb-32 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center mb-12"
            >
                <div className="relative w-44 h-44 mb-6">
                    <div className="absolute inset-0 bg-toss-blue/5 rounded-full scale-110 blur-2xl" />
                    <motion.img
                        src="/assets/hero.png"
                        alt="Hero Character"
                        className="w-full h-full object-contain floating relative z-10"
                    />
                </div>
                <h1 className="text-[2.2rem] font-[900] leading-[1.2] mb-4">
                    반려주식을 위한<br />
                    <span className="text-toss-blue">기운을 확인하세요</span>
                </h1>
                <p className="text-toss-grey-600 font-bold text-lg">
                    3D 인공지능이 당신의 사주를 분석해<br />
                    찰떡궁합 종목을 추천해 드릴게요.
                </p>
            </motion.div>

            <div className="space-y-8">
                {/* Date Input */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-toss-grey-600 flex items-center gap-2">
                        <Calendar size={16} strokeWidth={2} /> 생년월일
                    </label>
                    <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="input-modern"
                        value={formData.birthDate}
                        onChange={(e) => handleDateInput(e.target.value)}
                    />
                </div>

                {/* Time Input */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-toss-grey-600 flex items-center gap-2">
                            <Clock size={16} strokeWidth={2} /> 태어난 시각
                        </label>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, isBirthTimeUnknown: !formData.isBirthTimeUnknown })}
                            className={`text-xs font-bold px-3 py-1.5 rounded-[var(--rounded-xs)] transition-all ${formData.isBirthTimeUnknown ? 'bg-toss-grey-800 text-white' : 'bg-toss-grey-100 text-toss-grey-500'
                                }`}
                        >
                            모름
                        </button>
                    </div>
                    <AnimatePresence mode="wait">
                        {!formData.isBirthTimeUnknown && (
                            <motion.input
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                type="text"
                                placeholder="HH:MM"
                                className="input-modern"
                                value={formData.birthTime}
                                onChange={(e) => handleTimeInput(e.target.value)}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Gender Select */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-toss-grey-600 flex items-center gap-2">
                        <User size={16} strokeWidth={2} /> 성별
                    </label>
                    <div className="flex p-1.5 bg-toss-grey-100 rounded-[var(--rounded-md)] relative">
                        <motion.div
                            className="absolute bg-white rounded-[16px] shadow-sm h-[calc(100%-12px)] top-1.5"
                            animate={{
                                width: 'calc(50% - 6px)',
                                x: formData.gender === 'male' ? 0 : 'calc(100%)',
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        <button
                            type="button"
                            className={`flex-1 py-3.5 relative z-10 font-extrabold text-lg transition-colors ${formData.gender === 'male' ? 'text-toss-blue' : 'text-toss-grey-400'
                                }`}
                            onClick={() => setFormData({ ...formData, gender: 'male' })}
                        >
                            남성
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-3.5 relative z-10 font-extrabold text-lg transition-colors ${formData.gender === 'female' ? 'text-toss-blue' : 'text-toss-grey-400'
                                }`}
                            onClick={() => setFormData({ ...formData, gender: 'female' })}
                        >
                            여성
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom CTA (Toss-style) */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[480px] mx-auto z-50 pt-12 bottom-cta-bar">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={!isValid}
                    onClick={() => handleSubmit()}
                    className={`w-full py-5 rounded-[var(--rounded-md)] flex items-center justify-center gap-3 text-lg font-[900] transition-all ${isValid ? 'bg-toss-blue text-white shadow-lg shadow-toss-blue/25' : 'bg-toss-grey-200 text-toss-grey-400 cursor-not-allowed'
                        }`}
                >
                    기운 분석하기
                    <ChevronRight size={22} strokeWidth={2.5} />
                </motion.button>
            </div>
        </div>
    );
};

export default InputScreen;
