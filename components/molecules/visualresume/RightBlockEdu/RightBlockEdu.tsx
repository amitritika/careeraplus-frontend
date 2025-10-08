import React, { CSSProperties, memo, useMemo } from 'react';
import parse from 'html-react-parser';
import { FaCircle } from 'react-icons/fa';

interface EducationDataProps {
  data: EducationItem;
  top: number;
  height: number;
  line?: boolean;
}

interface EducationItem {
  optional: boolean;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
  toggle: boolean;
  // Additional education fields would be defined here
  // Based on the component props, it appears to contain education details
}

export interface RightBlockEduProps {
  fac: number;
  /** Template variant (1-4 = standard, 5 = minimalist) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Background/theme color */
  bg: string;
  /** Font color */
  font: string;
  /** Font family (optional) */
  fontFamily?: string;
  /** Element ID (optional) */
  id?: string;
  /** Additional CSS classes (optional) */
  className?: string;

  props: EducationDataProps;

  resumeType: 'fresher' | 'pro' | 'expert';
}

/** Baseline numbers for each template (unscaled). */
type TemplateCfg = {
  mainLeft: number;
  yearLeft: number;
  cgpaLeft: number;
  bulletLeft: number;
  bulletRadius: number;
  line?: { width: number; left: number; topMultiplier: number };
};

const CFG: Record<1 | 2 | 3 | 4 | 5, TemplateCfg> = {
  1: { mainLeft: 17, yearLeft: 40, cgpaLeft: 90, bulletLeft: -6, bulletRadius: 3 },
  2: { mainLeft: 17, yearLeft: 40, cgpaLeft: 90, bulletLeft: -6, bulletRadius: 3, line: { width: 0.5, left: -5, topMultiplier: -1 } },
  3: { mainLeft: 17, yearLeft: 40, cgpaLeft: 90, bulletLeft: -6, bulletRadius: 3, line: { width: 0.5, left: -5, topMultiplier: -1 } },
  4: { mainLeft: 17, yearLeft: 40, cgpaLeft: 90, bulletLeft: -6, bulletRadius: 3 },
  5: { mainLeft: 6,  yearLeft: 40, cgpaLeft: 90, bulletLeft: -6, bulletRadius: 3 }
};

const px = (n: number, f: number) => `${n * f}px`;
const pt = (n: number, f: number) => `${n * f}pt`;

const RightBlockEdu: React.FC<RightBlockEduProps> = memo(({
  fac = 1,
  template = 1,
  props,
  bg = '#000',
  font = '#000',
  fontFamily = 'Calibri',
  id,
  className
}) => {
  const cfg = CFG[template];

  const styles = useMemo(() => {
    const hPx = px(props.height, fac);

    const wrapper: CSSProperties = {
      height: hPx,
      width: px(113, fac),
      position: 'absolute',
      top: px(props.top, fac),
      left: px(cfg.mainLeft, fac),
      color: font,
      fontFamily,
      fontSize: pt(3.2, fac),
      textAlign: 'left'
    };

    const bullet: CSSProperties = {
      position: 'absolute',
      top: px(3, fac),
      left: px(cfg.bulletLeft, fac),
      width: px(cfg.bulletRadius, fac),
      height: px(cfg.bulletRadius, fac),
      borderRadius: '50%',
      backgroundColor: bg
    };

    const textBase: CSSProperties = {
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: pt(3.2, fac)
    };

    const year = { ...textBase, top: px(1, fac) };
    const degree = { ...textBase, left: px(cfg.yearLeft, fac), color: bg };
    const college: CSSProperties = {
      position: 'absolute',
      top: px(5, fac),
      left: px(cfg.yearLeft, fac),
      color: font,
      fontSize: pt(3.2, fac)
    };
    const cgpa = { ...textBase, left: px(cfg.cgpaLeft, fac), color: font };

    const lineStyle =
      cfg.line && props.line
        ? {
            position: 'absolute',
            width: px(cfg.line.width, fac),
            height: hPx,
            backgroundColor: bg,
            left: px(cfg.line.left, fac),
            top: px(props.height * cfg.line.topMultiplier, fac),
            opacity: 0.6
          } as CSSProperties
        : undefined;

    return { wrapper, bullet, year, degree, college, cgpa, lineStyle };
  }, [cfg, fac, props.height, top, bg, font, fontFamily, props.line]);

  return (
    <div id={id} className={className} style={styles.wrapper}>
      <div style={styles.bullet} />
      {styles.lineStyle && <div style={styles.lineStyle} />}
      <div style={styles.year}>{parse(props.data.year)}</div>
      <div style={styles.degree}>{parse(props.data.degree)}</div>
      <div style={styles.college}>{parse(props.data.college)}</div>
      <div style={styles.cgpa}>{parse(props.data.cgpa)}</div>
    </div>
  );
});

RightBlockEdu.displayName = 'RightBlockEdu';
export default RightBlockEdu;
