
import { TIPIQuestion, BigFiveTrait } from './types';

export const BIG_FIVE_TRAIT_LABELS: Record<BigFiveTrait, string> = {
  [BigFiveTrait.Extraversion]: "外向性",
  [BigFiveTrait.Agreeableness]: "協調性",
  [BigFiveTrait.Conscientiousness]: "誠実性",
  [BigFiveTrait.Neuroticism]: "神経症傾向",
  [BigFiveTrait.Openness]: "開放性",
};

export const TIPI_QUESTIONS: TIPIQuestion[] = [
  { id: 1, text: "外向的で、熱意にあふれている", trait: BigFiveTrait.Extraversion, isReversed: false },
  { id: 2, text: "批判的で、もめ事を起こしやすい", trait: BigFiveTrait.Agreeableness, isReversed: true },
  { id: 3, text: "頼りになり、自己規律ができる", trait: BigFiveTrait.Conscientiousness, isReversed: false },
  { id: 4, text: "心配性で、うろたえやすい", trait: BigFiveTrait.Neuroticism, isReversed: false },
  { id: 5, text: "新しい体験に前向きで、複雑なことを好む", trait: BigFiveTrait.Openness, isReversed: false },
  { id: 6, text: "控えめで、物静かだ", trait: BigFiveTrait.Extraversion, isReversed: true },
  { id: 7, text: "思いやりがあり、温かい", trait: BigFiveTrait.Agreeableness, isReversed: false },
  { id: 8, text: "だらしなく、そそっかしい", trait: BigFiveTrait.Conscientiousness, isReversed: true },
  { id: 9, text: "冷静で、感情が安定している", trait: BigFiveTrait.Neuroticism, isReversed: true },
  { id: 10, text: "ありきたりで、創造的ではない", trait: BigFiveTrait.Openness, isReversed: true },
];
