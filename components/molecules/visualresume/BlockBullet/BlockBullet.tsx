import React, { CSSProperties, useMemo } from 'react';
import { FaCircle, FaCheck } from 'react-icons/fa';

type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface BulletItemProps {
  name: string;
  height: number;
  top: number;
  line?: boolean | number;
}

interface BlockBulletProps {
  resumeType?: ResumeType;
  template?: TemplateNumber;
  fac: number;
  props: BulletItemProps;
  bg: string;
  font: string;
  id?: string;
  fontFamily?: string;
}

interface TemplateConfig {
  left: string;
  bulletTop: string;
  bulletLeft: string;
  bulletSize: string;
  bulletColor: string;
  Icon: React.ComponentType<any>;
  // Optional decorations
  hasVerticalLine?: boolean;
  lineH?: string;
  lineT?: string;
  lineL?: string;
  lineW?: string;
}

export const BlockBullet: React.FC<BlockBulletProps> = ({
  resumeType = 'fresher',
  template = 1,
  props: item,
  bg,
  font,
  fontFamily,
  id,
  fac,
}) => {
  // Preserve exact calculations (copied as-is from the original templates)
  const height = `${fac * item.height}px`;
  const width = `${fac * 183}px`;
  const size = `${fac * 3.2}pt`;
  const top = `${fac * item.top}px`;

  // Build typed template map (data-driven, no conditionals in render)
  const config = useMemo<TemplateConfig>(() => {
    const common = {
      bulletLeft: `${fac * -5.5}px`,
      bulletSize: `${fac * 2}px`,
      bulletColor: bg,
    };
    const families: Record<ResumeType, Record<TemplateNumber, TemplateConfig>> = {
      fresher: {
        1: { left: `${fac * 17}px`, bulletTop: `${fac * 1.5}px`, Icon: FaCircle, ...common },
        2: {
          left: `${fac * 17}px`,
          bulletTop: `${fac * 1.5}px`,
          Icon: FaCircle,
          hasVerticalLine: !!item.line,
          lineH: `${fac * (item.height - 4)}px`,
          lineT: `${fac * 6}px`,
          lineL: `${fac * -5}px`,
          lineW: `${fac * 0.5}px`,
          ...common,
        },
        3: { left: `${fac * 17}px`, bulletTop: `${fac * 3}px`, Icon: FaCheck, ...common },
        4: { left: `${fac * 17}px`, bulletTop: `${fac * 3}px`, Icon: FaCircle, ...common },
        5: { left: `${fac * 8}px`, bulletTop: `${fac * 3}px`, Icon: FaCircle, ...common },
      },
      pro: { /* mirror fresher with pro-specific tweaks if needed */ 
        1: { left: `${fac * 17}px`, bulletTop: `${fac * 1.5}px`, Icon: FaCircle, ...common },
        2: {
          left: `${fac * 17}px`,
          bulletTop: `${fac * 1.5}px`,
          Icon: FaCircle,
          hasVerticalLine: !!item.line,
          lineH: `${fac * (item.height - 4)}px`,
          lineT: `${fac * 6}px`,
          lineL: `${fac * -5}px`,
          lineW: `${fac * 0.5}px`,
          ...common,
        },
        3: { left: `${fac * 17}px`, bulletTop: `${fac * 3}px`, Icon: FaCheck, ...common },
        4: { left: `${fac * 17}px`, bulletTop: `${fac * 3}px`, Icon: FaCircle, ...common },
        5: { left: `${fac * 8}px`, bulletTop: `${fac * 3}px`, Icon: FaCircle, ...common },
      },
      expert: {
        1: { left: `${fac * 17}px`, bulletTop: `${fac * 1.5}px`, Icon: FaCircle, ...common },
        2: {
          left: `${fac * 17}px`,
          bulletTop: `${fac * 1.5}px`,
          Icon: FaCircle,
          hasVerticalLine: !!item.line,
          lineH: `${fac * (item.height - 4)}px`,
          lineT: `${fac * 6}px`,
          lineL: `${fac * -5}px`,
          lineW: `${fac * 0.5}px`,
          ...common,
        },
        3: { left: `${fac * 17}px`, bulletTop: `${fac * 3}px`, Icon: FaCheck, ...common },
        4: { left: `${fac * 17}px`, bulletTop: `${fac * 3}px`, Icon: FaCircle, ...common },
        5: { left: `${fac * 8}px`, bulletTop: `${fac * 3}px`, Icon: FaCircle, ...common },
      },
    };
    return families[resumeType][template];
  }, [resumeType, template, fac, bg, item.height, item.top, item.line]);

  const container: CSSProperties = {
    position: 'absolute',
    height,
    width,
    left: config.left,
    top,
    fontFamily: fontFamily || 'calibri',
    color: font,
    fontSize: size,
    textAlign: 'left',
  };

  const bulletStyle: CSSProperties = {
    position: 'absolute',
    left: config.bulletLeft,
    top: config.bulletTop,
    color: config.bulletColor,
    fontSize: config.bulletSize,
  };

  const lineStyle: CSSProperties | undefined = config.hasVerticalLine
    ? {
        position: 'absolute',
        height: config.lineH,
        width: config.lineW,
        backgroundColor: bg,
        left: config.lineL,
        top: config.lineT,
      }
    : undefined;

  return (
    <div id={id} style={container}>
      <div style={bulletStyle}><config.Icon /></div>
      {lineStyle && <div style={lineStyle} />}
      <div style={{ lineHeight: size }}>{item.name}</div>
    </div>
  );
};

export default BlockBullet;