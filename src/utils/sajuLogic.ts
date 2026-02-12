export type SajuElement = '木' | '火' | '土' | '金' | '水';

export interface StockInfo {
    name: string;
    ticker: string;
    price: string;
    monthlyReturn: string;
    reason: string;
}

export const analyzeSaju = (birthDate: string): SajuElement => {
    // Simple deterministic mapping for demo purposes
    const day = new Date(birthDate).getDate();
    const elements: SajuElement[] = ['木', '火', '土', '金', '水'];
    return elements[day % 5];
};

export const getRecommendedStocks = (element: SajuElement): StockInfo[] => {
    const stockDatabase: Record<SajuElement, StockInfo[]> = {
        '木': [
            { name: 'F&F', ticker: '383220', price: '68,200원', monthlyReturn: '+12.5%', reason: '목(木)의 기운인 성장과 의복 기운이 강하며, 현재 패션 섹터의 상승세와 맞물립니다.' },
            { name: '무림P&P', ticker: '009580', price: '3,120원', monthlyReturn: '+5.2%', reason: '자연과 나무의 에너지를 담고 있어 안정적인 기운을 보강해줍니다.' },
            { name: '한샘', ticker: '009240', price: '45,600원', monthlyReturn: '+8.1%', reason: '가구와 인테리어 기운이 당신의 사주 평형을 맞춰줍니다.' }
        ],
        '火': [
            { name: '에코프로비엠', ticker: '247540', price: '215,000원', monthlyReturn: '+24.1%', reason: '화(火)의 강력한 에너지와 2차전지의 열기가 당신의 운세와 공명합니다.' },
            { name: 'SK이노베이션', ticker: '096770', price: '124,500원', monthlyReturn: '+15.3%', reason: '에너지와 화학의 기운이 당신의 추진력을 극대화해줍니다.' },
            { name: 'LG에너지솔루션', ticker: '373220', price: '380,000원', monthlyReturn: '+10.8%', reason: '빛과 전기의 에너지가 부족한 화 기운을 보충합니다.' }
        ],
        '土': [
            { name: '삼성물산', ticker: '028260', price: '148,600원', monthlyReturn: '+6.4%', reason: '토(土)의 견고함과 건설/상사의 안정성이 당신의 자산을 지켜줍니다.' },
            { name: '현대건설', ticker: '000720', price: '32,100원', monthlyReturn: '+3.2%', reason: '땅의 기운이 강한 건설 섹터가 당신의 근본 기운을 강화합니다.' },
            { name: 'DL이앤씨', ticker: '375500', price: '35,400원', monthlyReturn: '+5.7%', reason: '대지의 기안을 바탕으로 장기적인 성장을 도모할 수 있습니다.' }
        ],
        '金': [
            { name: '포스코홀딩스', ticker: '005490', price: '420,000원', monthlyReturn: '+18.2%', reason: '금(金)의 기운인 철강과 단단한 결실이 당신의 재물운을 상승시킵니다.' },
            { name: '현대차', ticker: '005380', price: '245,000원', monthlyReturn: '+14.5%', reason: '금속과 기계의 에너지가 당신의 사주 흐름에 활력을 줍니다.' },
            { name: '기아', ticker: '000270', price: '115,000원', monthlyReturn: '+22.1%', reason: '단단한 금의 기운이 비즈니스의 성공 가능성을 높여줍니다.' }
        ],
        '水': [
            { name: 'HMM', ticker: '011200', price: '18,500원', monthlyReturn: '+9.4%', reason: '수(水)의 기운인 흐름과 물류가 당신의 변화무쌍한 운세와 잘 어우러집니다.' },
            { name: 'CJ제일제당', ticker: '097950', price: '298,000원', monthlyReturn: '+4.2%', reason: '식음료와 유통의 기운이 부족한 수 기운을 유연하게 채워줍니다.' },
            { name: '제주항공', ticker: '089590', price: '10,200원', monthlyReturn: '+7.1%', reason: '역마와 이동의 에너지가 당신의 활동 범위를 넓혀줄 것입니다.' }
        ]
    };

    return stockDatabase[element] || stockDatabase['木'];
};
