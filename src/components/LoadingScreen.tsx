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
            <div className="relative w-40 h-40 mb-10">
                <div className="absolute inset-0 bg-toss-blue/10 rounded-full blur-2xl scale-125" />
                <motion.img
                    src="/assets/loading_asset.png"
                    alt="Loading"
                    className="w-full h-full object-contain relative z-10"
                    animate={{
                        y: [0, -12, 0],
                        rotate: [0, 3, -3, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="text-center space-y-2 mb-10">
                <h2 className="text-xl font-[900] tracking-tight text-toss-grey-800">
                    기운을 모으고 있어요
                </h2>
                <p className="text-toss-grey-500 text-sm font-semibold">
                    당신만을 위한 반려주식 분석 중...
                </p>
            </div>

            {/* Progress Bar (Toss-style) */}
            <div className="w-full max-w-[280px] mb-12">
                <div className="h-1.5 w-full bg-toss-grey-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-toss-blue rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.15 }}
                    />
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-toss-grey-500">분석 중</span>
                    <span className="text-sm font-bold text-toss-blue">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Tips (간결한 UX) */}
            <div className="w-full max-w-sm">
                <div className="p-4 rounded-[var(--rounded-sm)] bg-toss-grey-50/80">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={tipIndex}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="text-center text-toss-grey-500 text-sm font-medium leading-relaxed"
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
