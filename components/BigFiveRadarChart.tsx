
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Text } from 'recharts';
import { BigFiveScores, BigFiveTrait } from '../types';
import { BIG_FIVE_TRAIT_LABELS } from '../constants';

interface BigFiveRadarChartProps {
  scores: BigFiveScores;
}

const CustomAngleAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
        <Text
            x={x}
            y={y}
            textAnchor={x > payload.coordinate ? "start" : "end"}
            dominantBaseline="central"
            fill="#374151"
            fontSize={14}
        >
            {payload.value}
        </Text>
    );
};


const BigFiveRadarChart: React.FC<BigFiveRadarChartProps> = ({ scores }) => {
  const data = Object.entries(scores).map(([trait, score]) => ({
    trait: BIG_FIVE_TRAIT_LABELS[trait as BigFiveTrait],
    score: score,
    fullMark: 7,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="trait" tick={<CustomAngleAxisTick />} />
        <PolarRadiusAxis angle={30} domain={[0, 7]} tick={false} axisLine={false} />
        <Radar name="あなた" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default BigFiveRadarChart;
