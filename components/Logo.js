import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

const Logo = ({ width = 200, height = 120, color = '#FFFFFF' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 200">
      <G>
        {/* Golden accent line over the first two letters */}
        <Path
          d="M50,60 Q80,50 110,60"
          stroke="#FFD700"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Three golden stars above the accent line */}
        <Path
          d="M60,45 L62,50 L67,50 L63,53 L65,58 L60,55 L55,58 L57,53 L53,50 L58,50 Z"
          fill="#FFD700"
        />
        <Path
          d="M80,40 L82,45 L87,45 L83,48 L85,53 L80,50 L75,53 L77,48 L73,45 L78,45 Z"
          fill="#FFD700"
        />
        <Path
          d="M100,45 L102,50 L107,50 L103,53 L105,58 L100,55 L95,58 L97,53 L93,50 L98,50 Z"
          fill="#FFD700"
        />
        
        {/* Main calligraphic text - "بنفرحك" */}
        <Path
          d="M30,80 Q40,70 50,80 Q60,90 70,80 Q80,70 90,80 Q100,90 110,80 Q120,70 130,80 Q140,90 150,80 Q160,70 170,80 Q180,90 190,80 Q200,70 210,80 Q220,90 230,80 Q240,70 250,80 Q260,90 270,80 Q280,70 290,80 Q300,90 310,80 Q320,70 330,80 Q340,90 350,80"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        
        {/* Secondary text below - "بنفرحك" in standard font */}
        <Path
          d="M50,120 L60,120 L65,110 L70,120 L80,120 L75,130 L85,130 L80,140 L70,130 L60,140 L55,130 L65,130 Z"
          fill={color}
        />
        <Path
          d="M90,120 L100,120 L105,110 L110,120 L120,120 L115,130 L125,130 L120,140 L110,130 L100,140 L95,130 L105,130 Z"
          fill={color}
        />
        <Path
          d="M130,120 L140,120 L145,110 L150,120 L160,120 L155,130 L165,130 L160,140 L150,130 L140,140 L135,130 L145,130 Z"
          fill={color}
        />
        <Path
          d="M170,120 L180,120 L185,110 L190,120 L200,120 L195,130 L205,130 L200,140 L190,130 L180,140 L175,130 L185,130 Z"
          fill={color}
        />
        <Path
          d="M210,120 L220,120 L225,110 L230,120 L240,120 L235,130 L245,130 L240,140 L230,130 L220,140 L215,130 L225,130 Z"
          fill={color}
        />
        <Path
          d="M250,120 L260,120 L265,110 L270,120 L280,120 L275,130 L285,130 L280,140 L270,130 L260,140 L255,130 L265,130 Z"
          fill={color}
        />
        <Path
          d="M290,120 L300,120 L305,110 L310,120 L320,120 L315,130 L325,130 L320,140 L310,130 L300,140 L295,130 L305,130 Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default Logo; 