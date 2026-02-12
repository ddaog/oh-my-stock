import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TIPS = [
    "하늘의 기운과 시장의 에너지를 분석하고 있어요.",
    "사주에 맞는 종목은 당신의 기운과 조화를 이룹니다.",
    "잠시 스트레칭을 하며 여유를 가져보세요.",
    "나의 투자 성향과 오행의 균형을 맞추는 중입니다.",
    "내일의 운세를 미리 보는 마음으로 기다려주세요."
];

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        const duration = 5000;
        const interval = 30;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + step;
            });
        }, interval);

        const tipTimer = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % TIPS.length);
        }, 2200);

        return () => {
            clearInterval(timer);
            clearInterval(tipTimer);
        };
    }, [onComplete]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="relative w-48 h-48 mb-12">
                <div className="absolute inset-0 bg-toss-blue/5 rounded-full blur-3xl scale-150" />
                <motion.img
                    src="/assets/loading_asset.png"
                    alt="Loading"
                    className="w-full h-full object-contain relative z-10"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="text-center space-y-3 mb-12">
                <h2 className="text-2xl font-[900] tracking-tight text-toss-grey-800">
                    기운을 모으고 있어요
                </h2>
                <p className="text-toss-grey-500 font-bold">
                    당신만을 위한 반려주식 분석 중...
                </p>
            </div>

            {/* Modern Progress Bar */}
            <div className="w-full max-w-xs mb-16">
                <div className="h-2 w-full bg-toss-grey-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-toss-blue rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                    />
                </div>
                <div className="mt-3 flex justify-end">
                    <span className="text-sm font-black text-toss-blue/60">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Ad Placement Area */}
            <div className="w-full max-w-sm">
                <div className="modern-card p-6 flex flex-col gap-4 border-none bg-toss-grey-50 shadow-none">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-toss-grey-400 tracking-widest">TOSS INSIGHT</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden border border-toss-grey-100">
                            <img src="https://static.toss.im/assets/favicon/favicon.png" alt="Toss" className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <p className="font-extrabold text-[14px] leading-tight text-toss-grey-700">
                                운세에 맞는<br />자산 관리법 보기
                            </p>
                        </div>
                        <button className="bg-toss-grey-800 text-white text-[11px] px-4 py-2 rounded-full font-bold">확인</button>
                    </div>
                </div>

                <div className="mt-10 h-12 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={tipIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center text-toss-grey-400 text-sm font-bold"
                        >
                            {TIPS[tipIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
