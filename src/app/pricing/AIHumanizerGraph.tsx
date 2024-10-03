import React from 'react';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Bar } from '@visx/shape';
import { Text } from '@visx/text';

const data = [
  { player: 'NoAIGPT', price: 100, accuracy: 98 },
  { player: 'Competitor A', price: 80, accuracy: 85 },
  { player: 'Competitor B', price: 90, accuracy: 88 },
  { player: 'Competitor C', price: 70, accuracy: 82 },
];

const width = 600;
const height = 400;
const margin = { top: 20, right: 20, bottom: 60, left: 80 };

const AIHumanizerGraph = () => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => Math.max(d.price, d.accuracy)))],
    range: [0, xMax],
  });

  const yScale = scaleBand({
    domain: data.map(d => d.player),
    range: [0, yMax],
    padding: 0.2,
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <AxisLeft scale={yScale} tickLabelProps={() => ({ fontSize: 12, fill: '#333' })} />
        <AxisBottom
          top={yMax}
          scale={xScale}
          tickLabelProps={() => ({ fontSize: 12, fill: '#333' })}
          label="Price ($) / Accuracy (%)"
        />
        {data.map(d => (
          <Group key={d.player}>
            <Bar
              x={0}
              y={yScale(d.player)}
              width={xScale(d.price)}
              height={yScale.bandwidth() / 2}
              fill="#4299e1"
              opacity={0.8}
            />
            <Bar
              x={0}
              y={(yScale(d.player) ?? 0) + yScale.bandwidth() / 2}
              width={xScale(d.accuracy)}
              height={yScale.bandwidth() / 2}
              fill="#48bb78"
              opacity={0.8}
            />
            <Text
              x={xScale(Math.max(d.price, d.accuracy)) + 5}
              y={(yScale(d.player) ?? 0) + yScale.bandwidth() / 2}
              verticalAnchor="middle"
              fontSize={12}
            >
              {`$${d.price} / ${d.accuracy}%`}
            </Text>
          </Group>
        ))}
      </Group>
      <Text x={width / 2} y={height - 10} textAnchor="middle" fontSize={14}>
        Price ($) / Accuracy (%)
      </Text>
      <Text x={10} y={height / 2} textAnchor="middle" fontSize={14} transform={`rotate(-90 10 ${height / 2})`}>
        Players
      </Text>
    </svg>
  );
};

export default AIHumanizerGraph;