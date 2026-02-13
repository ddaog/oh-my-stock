import { motion } from 'framer-motion';
import { Share2, RefreshCw, TrendingUp, Sparkles } from 'lucide-react';
import type { StockInfo, SajuElement } from '../utils/sajuLogic';
import confetti from 'canvas-confetti';

interface ResultScreenProps {
    element: SajuElement;
    stocks: StockInfo[];
    onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ element, stocks, onReset }) => {

    const handleShare = async () => {
        const shareText = `나의 오행 기운은 '${element}'! 추천 주식은 ${stocks[0].name}입니다.`;
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '내 사주에 맞는 반려주식 찾기',
                    text: shareText,
                    url: shareUrl,
                });
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#3182f6', '#ffffff']
                });
            } catch {
                copyToClipboard(shareUrl);
            }
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#3182f6', '#ffffff']
            });
            alert('링크가 복사되었어요!');
        }).catch(() => {
            alert('복사에 실패했어요. 링크를 직접 공유해 주세요.');
        });
    };

    const elementTheme: Record<SajuElement, { icon: string; name: string; color: string; bg: string }> = {
        '木': { icon: '/assets/wood_element.png', name: '뿌리 깊은 나무 (木)', color: '#27ae60', bg: 'bg-green-50' },
        '火': { icon: '/assets/fire_element.png', name: '타오르는 불꽃 (火)', color: '#e67e22', bg: 'bg-orange-50' },
        '土': { icon: '/assets/earth_element.png', name: '풍요로운 대지 (土)', color: '#d35400', bg: 'bg-yellow-50' },
        '金': { icon: '/assets/metal_element.png', name: '단단한 황금 (金)', color: '#f1c40f', bg: 'bg-gray-50' },
        '水': { icon: '/assets/water_element.png', name: '고요한 바다 (水)', color: '#2980b9', bg: 'bg-blue-50' },
    };

    const theme = elementTheme[element];

    return (
        <div className="flex-1 flex flex-col pt-4 pb-32 px-6">
            <div className="text-center space-y-6 pt-8 pb-12 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative w-48 h-48 mb-2"
                >
                    <div className={`absolute inset-0 opacity-10 blur-3xl rounded-full scale-125 ${theme.bg}`} />
                    <img src={theme.icon} alt={element} className="w-full h-full object-contain relative z-10 floating" />
                </motion.div>
                <div className="space-y-2">
                    <p className="text-lg font-black text-toss-grey-400 flex items-center justify-center gap-2">
                         당신의 강력한 기운
                    </p>
                    <h1 className="text-[2.4rem] font-[900] tracking-tight leading-tight">
                        {theme.name}
                    </h1>
                </div>
            </div>

            <div className="space-y-6 mb-12">
                <h3 className="font-[900] text-xl px-1 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Sparkles size={20} className="text-toss-blue" fill="currentColor" /> 반려주식 TOP 3
                    </span>
                    <span className="text-xs text-toss-grey-400 font-bold uppercase">Ranked</span>
                </h3>
                <div className="space-y-4">
                    {stocks.map((stock, index) => (
                        <motion.div
                            key={stock.ticker}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.12, type: 'spring', stiffness: 300, damping: 24 }}
                            className="modern-card transition-all active:scale-[0.99] relative overflow-hidden group"
                        >
                            {index === 0 && (
                                <div className="absolute top-0 right-0 p-3">
                                    <div className="bg-toss-blue/10 text-toss-blue text-[10px] font-black px-2 py-0.5 rounded-full">BEST</div>
                                </div>
                            )}
                            <div className="flex items-center gap-5">
                                <div className="w-11 h-11 bg-toss-grey-50 rounded-[var(--rounded-sm)] flex items-center justify-center font-[900] text-toss-grey-800 border border-toss-grey-100">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-[900] text-[1.15rem] leading-tight mb-1 truncate">{stock.name}</h4>
                                    <p className="text-xs text-toss-grey-400 font-black uppercase tracking-wider">{stock.ticker}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-[900] text-lg text-toss-grey-900 leading-tight mb-1">{stock.price}</p>
                                    <p className={`text-xs font-black ${stock.monthlyReturn.startsWith('+') ? 'text-red-500' : 'text-blue-500'}`}>
                                        {stock.monthlyReturn}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="space-y-10 pb-16">
                <div className={`modern-card p-6 space-y-3 border-none shadow-none rounded-[var(--rounded-md)] ${theme.bg}`}>
                    <h4 className="font-black text-toss-grey-800 flex items-center gap-2">
                        <TrendingUp size={18} strokeWidth={3} /> 상세 분석
                    </h4>
                    <p className="text-toss-grey-600 leading-relaxed font-bold text-[15px]">
                        분석 결과, 당신은 <strong>{theme.name}</strong>의 기운을 가지고 태어났습니다. 
                        이는 어떤 상황에서도 중심을 잃지 않는 강한 정신력을 의미합니다. {stocks[0].name}와 같이 흐름을 주도하는 대형주들이 당신의 기운을 보완하며 최상의 시너지를 낼 것입니다.
                    </p>
                </div>

                <div className="space-y-8">
                    <h4 className="font-[900] text-xl px-1">추천 이유</h4>
                    <div className="space-y-8">
                        {stocks.map((stock) => (
                            <div key={stock.ticker + '-detail'} className="px-1 group">
                                <h5 className="font-black text-lg text-toss-grey-800 mb-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-toss-blue" /> {stock.name}
                                </h5>
                                <p className="text-toss-grey-500 font-bold text-[15px] leading-relaxed pl-4 border-l-2 border-toss-grey-100 group-hover:border-toss-blue transition-colors">
                                    {stock.reason}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[480px] mx-auto flex gap-3 z-50 pt-12 bottom-cta-bar">
                <button
                    onClick={handleShare}
                    className="flex-1 btn-secondary py-5 rounded-[var(--rounded-md)] flex items-center justify-center gap-2 text-base font-bold transition-all hover:bg-toss-grey-200 active:scale-[0.98]"
                >
                    <Share2 size={20} strokeWidth={2.5} /> 공유하기
                </button>
                <button
                    onClick={onReset}
                    className="flex-1 btn-primary py-5 rounded-[var(--rounded-md)] flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-toss-blue/20 active:scale-[0.98]"
                >
                    <RefreshCw size={20} strokeWidth={2.5} /> 다시 하기
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;
