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
            { name: 'F&F', ticker: '383220', price: '68,200원', monthlyReturn: '+12.5%', reason: '나무처럼 뻗어가는 성장 에너지가 패션 브랜드의 확장력과 딱 맞아요. 당신의 木 기운이 이 종목을 만나면 상승 흐름을 탈 수 있어요.' },
            { name: '무림P&P', ticker: '009580', price: '3,120원', monthlyReturn: '+5.2%', reason: '종이와 펄프, 말 그대로 나무에서 태어난 기업이에요. 당신의 뿌리를 단단하게 잡아주는 안정형 종목이에요.' },
            { name: '한샘', ticker: '009240', price: '45,600원', monthlyReturn: '+8.1%', reason: '원목 가구와 공간의 에너지가 木의 기운과 자연스럽게 공명해요. 생활 속에서 기운을 채워주는 종목이에요.' }
        ],
        '火': [
            { name: '에코프로비엠', ticker: '247540', price: '215,000원', monthlyReturn: '+24.1%', reason: '2차전지의 뜨거운 열기가 당신의 火 기운과 폭발적으로 만나요. 불꽃 같은 상승세를 함께 탈 운명이에요.' },
            { name: 'SK이노베이션', ticker: '096770', price: '124,500원', monthlyReturn: '+15.3%', reason: '에너지 산업의 핵심, 화학 반응처럼 당신의 추진력에 불을 지펴줄 종목이에요.' },
            { name: 'LG에너지솔루션', ticker: '373220', price: '380,000원', monthlyReturn: '+10.8%', reason: '전기와 빛의 에너지가 火의 본질 그 자체예요. 당신의 열정을 수익으로 바꿔줄 거예요.' }
        ],
        '土': [
            { name: '삼성물산', ticker: '028260', price: '148,600원', monthlyReturn: '+6.4%', reason: '건설과 상사를 아우르는 대지의 힘, 土의 묵직한 안정감이 자산을 단단히 지켜줄 거예요.' },
            { name: '현대건설', ticker: '000720', price: '32,100원', monthlyReturn: '+3.2%', reason: '땅 위에 세우는 모든 것의 시작, 건설업의 기반이 당신의 土 기운과 완벽히 맞물려요.' },
            { name: 'DL이앤씨', ticker: '375500', price: '35,400원', monthlyReturn: '+5.7%', reason: '대지 위 인프라를 쌓아가듯, 장기적으로 묵묵히 성장할 수 있는 기운을 가진 종목이에요.' }
        ],
        '金': [
            { name: '포스코홀딩스', ticker: '005490', price: '420,000원', monthlyReturn: '+18.2%', reason: '철강의 왕, 金 기운의 정수예요. 강철처럼 단단한 재물운이 당신에게 결실을 가져다줄 거예요.' },
            { name: '현대차', ticker: '005380', price: '245,000원', monthlyReturn: '+14.5%', reason: '금속과 정밀함의 결정체, 자동차 산업이 당신의 金 기운에 속도를 더해줄 거예요.' },
            { name: '기아', ticker: '000270', price: '115,000원', monthlyReturn: '+22.1%', reason: '세련된 금속의 기운이 글로벌 무대에서 빛나고 있어요. 당신의 성공 에너지와 궁합이 최고예요.' }
        ],
        '水': [
            { name: 'HMM', ticker: '011200', price: '18,500원', monthlyReturn: '+9.4%', reason: '바다 위를 누비는 해운업, 水의 유연한 흐름이 당신의 투자 운세와 자연스럽게 어우러져요.' },
            { name: 'CJ제일제당', ticker: '097950', price: '298,000원', monthlyReturn: '+4.2%', reason: '식음료의 순환과 유통의 물결이 水 기운의 본질이에요. 꾸준한 흐름으로 수익을 채워줄 거예요.' },
            { name: '제주항공', ticker: '089590', price: '10,200원', monthlyReturn: '+7.1%', reason: '하늘과 바다를 잇는 이동의 에너지, 水의 역마살이 당신의 투자 반경을 넓혀줄 거예요.' }
        ]
    };

    return stockDatabase[element] || stockDatabase['木'];
};
