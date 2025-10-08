// @/components/templates/visualresume/fresher/LegacyResumeComponents.tsx

import React, { CSSProperties, useMemo } from 'react';
import { IconContext } from "react-icons";
import parse from 'html-react-parser';

// Type definitions for legacy component props
interface BaseComponentProps {
  fac: number;
  bg: string;
  fontFamily?: string | undefined;
  id: string;
  font?: string | undefined;
}

interface UserNameProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    top: number;
  };
}

interface UserDesignationProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    top: number;
  };
}

interface UserPhotoProps extends BaseComponentProps {
  props: {
    photo: string;
    top: number;
  };
}

interface LeftBlockHeadingProps extends BaseComponentProps {
  props: {
    height: number;
    heading: string;
    top: number;
  };
}

interface LeftBlockContactInfoProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    value: string;
    top: number;
    icon: React.ReactNode;
  };
}

interface LeftBlockBulletProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    top: number;
  };
}

interface LeftBlockSkillProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    rating: number;
    top: number;
  };
}

interface VLProps extends BaseComponentProps {
  props: {
    height: number;
    top: number;
  };
}

interface RightBlockHeadingProps extends BaseComponentProps {
  props: {
    height: number;
    heading: string;
    top: number;
  };
}

interface RightBlockProjectProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    details: string;
    top: number;
  };
}

interface RightBlockWorkExpProps extends BaseComponentProps {
  props: {
    height: number;
    position: string;
    company: string;
    duration: string;
    details: string;
    top: number;
  };
}

interface RightBlockEduProps extends BaseComponentProps {
  props: {
    height: number;
    degree: string;
    institution: string;
    duration: string;
    details: string;
    top: number;
  };
}

interface RightBlockBulletProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    top: number;
  };
}

interface BlockProjectProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    details: string;
    top: number;
  };
}

interface BlockBulletProps extends BaseComponentProps {
  props: {
    height: number;
    name: string;
    top: number;
  };
}

interface BlockEduProps extends BaseComponentProps {
  props: {
    height: number;
    degree: string;
    institution: string;
    duration: string;
    details: string;
    top: number;
  };
}

// TextWidth utility function using DOM measurement
export const textWidth = (fontf: string, weight: string, size: string, width: string, name: string): [number, number] => {
  const t = document.getElementById("text");
  if (t) {
    t.style.fontSize = size;
    t.style.fontFamily = fontf;
    t.style.fontWeight = weight;
    t.style.height = "auto";
    t.style.width = width;
    t.innerHTML = name;
    return [t.clientHeight + 1, t.clientWidth + 1];
  }
  return [12, 100]; // fallback values
};

// Component 1: UserName
export const UserName: React.FC<UserNameProps> = (props) => {
  const fac = props.fac ?? 1;
  const name = props.props.name ?? "";
  const id = props.id;
  const bg = props.bg;
  const font = props.font;

  // Box dimensions (scaled)
  const height = `${fac * props.props.height}px`;
  const widthPx = fac * 120; // allowed width in px (scaled)
  const width = `${widthPx}px`;
  const line = `${fac * props.props.height}px`;
  const left = `${fac * 6}px`;
  const top = `${fac * props.props.top}px`;

  // Loop safety
  const MIN_FONT_PT = 6;   // don't go below this point size
  const DEC = 0.1;         // decrement step (in points)
  const MAX_ITER = 200;    // iteration cap to avoid infinite loops

  const fontSize = useMemo(() => {
    // starting baseline (originally 9.6)
    let a = 9.6;

    // measure using the *rendered* font size so measured px corresponds to displayed size
    const measurePx = (pt: number) => {
      const renderedPt = fac * pt; // CSS will use this
      const sizeStr = `${renderedPt}pt`;
      const arr = textWidth("calibri", "bold", sizeStr, "auto", name) || [];
      const measuredPx = typeof arr[1] === "number" ? arr[1] : parseFloat(arr[1]) || 0;
      return measuredPx;
    };

    let measured = measurePx(a);
    if (!isFinite(measured)) measured = 0;

    let iter = 0;
    while (measured > widthPx && a > MIN_FONT_PT && iter < MAX_ITER) {
      a = +(a - DEC);
      measured = measurePx(a);
      if (!isFinite(measured)) {
        measured = 0;
        break;
      }
      iter++;
    }

    if (iter >= MAX_ITER && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `UserName: hit MAX_ITER (${MAX_ITER}) while sizing "${name}". final pt=${a}, measured=${measured}, allowed=${widthPx}`
      );
    }

    const finalPt = fac * Math.max(a, MIN_FONT_PT);
    return `${finalPt}pt`;
  }, [name, fac]);

  const style: CSSProperties = {
    position: "absolute",
    height,
    width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: fontSize,
    fontFamily: font,
    fontWeight: "bold",
    left,
    top,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    paddingLeft: "4px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  return (
    <div style={style} id={id} title={name}>
      {name}
    </div>
  );
};

// Component 2: UserDesignation
export const UserDesignation: React.FC<UserDesignationProps> = (props) => {
  const fac = props.fac ?? 1;
  const name = props.props.name ?? "";
  const id = props.id;
  const bg = props.bg;
  const font = props.font;

  // Box dimensions (scaled)
  const height = `${fac * props.props.height}px`;
  const widthPx = fac * 105; // allowed width in px (scaled)
  const width = `${widthPx}px`;
  const line = `${fac * props.props.height}px`;
  const left = `${fac * 6}px`;
  const top = `${fac * props.props.top}px`;

  // Loop safety
  const MIN_FONT_PT = 4.5; // don't go below this point size
  const DEC = 0.1;         // decrement step (in points)
  const MAX_ITER = 200;    // iteration cap to avoid infinite loops

  // Compute final font-size (in pt string) using useMemo
  const fontSize = useMemo(() => {
    // starting point (your original baseline was 7.5)
    let a = 7.5;

    // measurement function: measure using the *rendered* font size,
    // so measured px corresponds to CSS-applied size.
    const measurePx = (pt: number) => {
      const renderedPt = fac * pt; // rendered pt used in CSS
      const sizeStr = `${renderedPt}pt`;
      const arr = textWidth("calibri", "normal", sizeStr, "auto", name) || [];
      // arr[1] should be numeric px width; fallback defensively
      const measuredPx = typeof arr[1] === "number" ? arr[1] : parseFloat(arr[1]) || 0;
      return measuredPx;
    };

    let measured = measurePx(a);
    if (!isFinite(measured)) measured = 0;

    let iter = 0;
    while (measured > widthPx && a > MIN_FONT_PT && iter < MAX_ITER) {
      a = +(a - DEC);
      measured = measurePx(a);
      if (!isFinite(measured)) {
        measured = 0;
        break;
      }
      iter++;
    }

    if (iter >= MAX_ITER && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `UserDesignation: hit MAX_ITER (${MAX_ITER}) while sizing "${name}". final pt=${a}, measured=${measured}, allowed=${widthPx}`
      );
    }

    // final CSS font-size should be scaled (fac * a) in pt units
    const finalPt = fac * Math.max(a, MIN_FONT_PT);
    return `${finalPt}pt`;
  }, [name, fac]);

  const style: CSSProperties = {
    position: "absolute",
    height,
    width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: fontSize,
    fontFamily: font,
    fontWeight: "normal",
    left,
    top,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    paddingLeft: "4px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  return (
    <div style={style} id={id} title={name}>
      {name}
    </div>
  );
};

// Component 3: UserPhoto
export const UserPhoto: React.FC<UserPhotoProps> = (props) => {
  const height = (props.fac * 36).toString() + "px";
  const width = (props.fac * 30).toString() + "px";
  const photo = props.props.photo;
  const left = (props.fac * 6).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    left: left,
    top: top,
    borderRadius: "4px",
    objectFit: "cover"
  };

  return (
    <img 
      src={photo} 
      alt="User Photo"
      style={style}
      id={props.id}
    />
  );
};

// Component 4: LeftBlockHeading
export const LeftBlockHeading: React.FC<LeftBlockHeadingProps> = (props) => {
  const fac = props.fac ?? 1;
  const heading = props.props.heading ?? "";
  const id = props.id;
  const bg = props.bg;
  const font = props.font;

  // Allowed box width in px (scaled by fac)
  const allowedBoxWidthPx = fac * 70; // same as your width variable previously

  // Safety & iteration limits
  const MIN_FONT_PT = 4;      // don't go below 4pt
  const MAX_ITER = 200;      // arbitrary cap to avoid infinite loops
  const DEC = 0.1;           // decrement step in points

  // Compute the best font-size (in pt string) using useMemo to avoid redoing on unrelated renders
  const fontSizePt = useMemo(() => {
    // Start `a` as baseline pt value (your previous code used 7)
    let a = 7;
    // Use a scaled font size for measurement so measured width matches rendered width:
    const measure = (pt: number) => {
      // size used by the rendered element is scaled by fac: renderedPt = fac * pt
      const renderedPt = fac * pt;
      // textWidth expects a font-size string like "12pt"
      const sizeStr = `${renderedPt}pt`;
      // call textWidth — defensive parseFloat fallback
      const arr = textWidth("calibri", "bold", sizeStr, "auto", heading) || [];
      const measuredPx = typeof arr[1] === "number" ? arr[1] : parseFloat(arr[1]) || 0;
      return measuredPx;
    };

    // initial measurement
    let w = measure(a);

    // If w is NaN or not a number, treat as 0 to avoid running the loop endlessly
    if (!isFinite(w)) w = 0;

    let iter = 0;
    // Reduce 'a' until measured width <= allowed width OR until min font or MAX_ITER reached
    while (w > allowedBoxWidthPx && a > MIN_FONT_PT && iter < MAX_ITER) {
      a = +(a - DEC); // keep numeric precision
      w = measure(a);
      if (!isFinite(w)) { w = 0; break; } // safety: if measurement fails, break
      iter++;
    }

    // If we hit the iteration cap, log a warning in dev mode
    if (iter >= MAX_ITER && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `LeftBlockHeading: reached MAX_ITER (${MAX_ITER}) while adjusting font for "${heading}". ` +
        `Final pts=${a}, measuredWidth=${w}, allowed=${allowedBoxWidthPx}`
      );
    }

    // final font *for CSS* should be the scaled font size (fac * a) in pt
    const finalFontPt = fac * Math.max(a, MIN_FONT_PT);
    return `${finalFontPt}pt`;
  }, [heading, fac]);

  // layout constants (unchanged)
  const height = (fac * props.props.height).toString() + "px";
  const width = (fac * 70).toString() + "px";
  const line = (fac * props.props.height).toString() + "px";
  const left = (fac * 6).toString() + "px";
  const top = (fac * props.props.top).toString() + "px";

  const style: CSSProperties = {
    position: "absolute",
    height,
    width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: fontSizePt,
    fontFamily: font,
    fontWeight: "bold",
    left,
    top,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  };

  return (
    <div style={style} id={id} title={heading}>
      {heading}
    </div>
  );
};
// Component 5: LeftBlockContactInfo
export const LeftBlockContactInfo: React.FC<LeftBlockContactInfoProps> = (props) => {
  const fac = props.fac ?? 1;
  const value = props.props.value ?? "";
  const id = props.id;
  const bg = props.bg;
  const font = props.font;

  // scaled box dimensions
  const height = `${fac * props.props.height}px`;
  const widthPx = fac * 60; // allowed width in px (scaled)
  const width = `${widthPx}px`;
  const line = `${fac * props.props.height}px`;
  const left = `${fac * 16}px`;
  const top = `${fac * props.props.top}px`;

  const iconLeft = `${fac * 6}px`;
  const iconTop = `${fac * (props.props.top + 1)}px`;
  const iconSize = `${fac * 4}px`;

  // Safety params
  const MIN_FONT_PT = 4.5; // floor for pt size
  const DEC = 0.1;         // decrement step in points
  const MAX_ITER = 200;    // cap iterations

  // compute fontSize only when `value` or `fac` changes
  const fontSize = useMemo(() => {
    let a = 6; // baseline in pt (matching your original)
    // measure using the rendered font size (fac * pt)
    const measurePx = (pt: number) => {
      const renderedPt = fac * pt;
      const sizeStr = `${renderedPt}pt`;
      const arr = textWidth("calibri", "normal", sizeStr, "auto", value) || [];
      const measuredPx = typeof arr[1] === "number" ? arr[1] : parseFloat(arr[1]) || 0;
      return measuredPx;
    };

    let measured = measurePx(a);
    if (!isFinite(measured)) measured = 0;

    let iter = 0;
    while (measured > widthPx && a > MIN_FONT_PT && iter < MAX_ITER) {
      a = +(a - DEC);
      measured = measurePx(a);
      if (!isFinite(measured)) { measured = 0; break; }
      iter++;
    }

    if (iter >= MAX_ITER && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `LeftBlockContactInfo: hit MAX_ITER (${MAX_ITER}) while sizing "${value}". final pt=${a}, measured=${measured}, allowed=${widthPx}`
      );
    }

    const finalPt = fac * Math.max(a, MIN_FONT_PT);
    return `${finalPt}pt`;
  }, [value, fac]);

  const textStyle: CSSProperties = {
    position: "absolute",
    height,
    width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: fontSize,
    fontFamily: font,
    fontWeight: "normal",
    left,
    top,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  };

  const iconStyle: CSSProperties = {
    position: "absolute",
    left: iconLeft,
    top: iconTop,
    color: "#ffffff",
    fontSize: iconSize
  };

  return (
    <>
      <div style={iconStyle}>
        <IconContext.Provider value={{ size: iconSize, color: "#ffffff" }}>
          {props.props.icon}
        </IconContext.Provider>
      </div>
      <div style={textStyle} id={id} title={value}>
        {value}
      </div>
    </>
  );
};

// Component 6: LeftBlockBullet
export const LeftBlockBullet: React.FC<LeftBlockBulletProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 65).toString() + "px";
  const name = props.props.name;
  let a = 6;
  const bg = props.bg;
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 3.5).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 11).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  const bulletLeft = (props.fac * 6).toString() + "px";
  const bulletTop = (props.fac * (props.props.top + 1)).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (65 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const textStyle: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#ffffff",
    textAlign: "justify",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const bulletStyle: CSSProperties = {
    position: "absolute",
    left: bulletLeft,
    top: bulletTop,
    color: "#ffffff",
    fontSize: (props.fac * 3).toString() + "px",
    lineHeight: (props.fac * 3).toString() + "px"
  };

  // Parse HTML content using html-react-parser
  const parsedContent = typeof name === 'string' ? parse(name) : name;

  return (
    <>
      <div style={bulletStyle}>•</div>
      <div style={textStyle} id={id}>
        {parsedContent}
      </div>
    </>
  );
};

// Component 7: LeftBlockSkill
export const LeftBlockSkill: React.FC<LeftBlockSkillProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 45).toString() + "px";
  const name = props.props.name;
  const rating = Math.min(Math.max(props.props.rating, 0), 5); // Clamp between 0-5
  let a = 6;
  const bg = props.bg;
  const font = props.font;
  const id = props.id;
  const line = (props.fac * props.props.height).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 6).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  const ratingLeft = (props.fac * 52).toString() + "px";
  const ratingTop = (props.fac * (props.props.top + 2)).toString() + "px";
  const ratingWidth = (props.fac * 20).toString() + "px";
  const ratingHeight = (props.fac * 2).toString() + "px";
  const fillWidth = (props.fac * (20 * rating / 5)).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (45 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const textStyle: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#ffffff",
    display: "flex",
    alignItems: "center"
  };

  const ratingBgStyle: CSSProperties = {
    position: "absolute",
    left: ratingLeft,
    top: ratingTop,
    width: ratingWidth,
    height: ratingHeight,
    backgroundColor: "#ffffff",
    opacity: 0.3,
    borderRadius: "1px"
  };

  const ratingFillStyle: CSSProperties = {
    position: "absolute",
    left: ratingLeft,
    top: ratingTop,
    width: fillWidth,
    height: ratingHeight,
    backgroundColor: "#ffffff",
    borderRadius: "1px"
  };

  return (
    <>
      <div style={textStyle} id={id}>
        {name}
      </div>
      <div style={ratingBgStyle}></div>
      <div style={ratingFillStyle}></div>
    </>
  );
};

// Component 8: VL (Vertical Line)
export const VL: React.FC<VLProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = "1px";
  const left = (props.fac * 79).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: "#cccccc",
    left: left,
    top: top
  };

  return <div style={style} id={props.id}></div>;
};

// Component 9: RightBlockHeading
export const RightBlockHeading: React.FC<RightBlockHeadingProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 120).toString() + "px";
  const heading = props.props.heading;
  let a = 8;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * props.props.height).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 85).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  let arr = textWidth("calibri", "bold", size, "auto", heading);
  let w = arr[1];
  const dec = 0.1;
  
  while (120 < w && a > 5) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "bold", size1, "auto", heading);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "bold",
    left: left,
    top: top,
    color: props.bg,
    borderBottom: `2px solid ${props.bg}`,
    display: "flex",
    alignItems: "center"
  };

  return (
    <div style={style} id={id}>
      {heading}
    </div>
  );
};

// Component 10: RightBlockLogo
export const RightBlockLogo: React.FC<BaseComponentProps> = (props) => {
  const height = (props.fac * 8).toString() + "px";
  const width = (props.fac * 8).toString() + "px";
  const left = (props.fac * 85).toString() + "px";
  const top = (props.fac * 5).toString() + "px";
  
  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    left: left,
    top: top,
    backgroundImage: "url('/logo.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat"
  };

  return <div style={style} id={props.id}></div>;
};

// Component 11: RightBlockProject
export const RightBlockProject: React.FC<RightBlockProjectProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 120).toString() + "px";
  const name = props.props.name;
  const details = props.props.details;
  let a = 7;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 4).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 85).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const titleStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "bold",
    left: left,
    top: top,
    color: "#000000",
    display: "flex",
    alignItems: "center"
  };

  const detailsStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * (props.props.height - 4)).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: (props.fac * 3.5).toString() + "px",
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 4)).toString() + "px",
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  // Parse HTML content using html-react-parser
  const parsedDetails = typeof details === 'string' ? parse(details) : details;

  return (
    <>
      <div style={titleStyle} id={id + "_title"}>
        {name}
      </div>
      <div style={detailsStyle} id={id + "_details"}>
        {parsedDetails}
      </div>
    </>
  );
};

// Component 12: RightBlockWorkExp
export const RightBlockWorkExp: React.FC<RightBlockWorkExpProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 120).toString() + "px";
  const position = props.props.position;
  const company = props.props.company;
  const duration = props.props.duration;
  const details = props.props.details;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 4).toString() + "px";
  const left = (props.fac * 85).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const positionStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 7).toString() + "pt",
    fontFamily: font,
    fontWeight: "bold",
    left: left,
    top: top,
    color: "#000000",
    display: "flex",
    alignItems: "center"
  };

  const companyStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 4)).toString() + "px",
    color: "#666666",
    display: "flex",
    alignItems: "center"
  };

  const durationStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 3).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 5.5).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 8)).toString() + "px",
    color: "#888888",
    display: "flex",
    alignItems: "center"
  };

  const detailsStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * (props.props.height - 11)).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: (props.fac * 3.5).toString() + "px",
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 11)).toString() + "px",
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  // Parse HTML content using html-react-parser
  const parsedDetails = typeof details === 'string' ? parse(details) : details;

  return (
    <>
      <div style={positionStyle} id={id + "_position"}>
        {position}
      </div>
      <div style={companyStyle} id={id + "_company"}>
        {company}
      </div>
      <div style={durationStyle} id={id + "_duration"}>
        {duration}
      </div>
      <div style={detailsStyle} id={id + "_details"}>
        {parsedDetails}
      </div>
    </>
  );
};

// Component 13: RightBlockEdu
export const RightBlockEdu: React.FC<RightBlockEduProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 120).toString() + "px";
  const degree = props.props.degree;
  const institution = props.props.institution;
  const duration = props.props.duration;
  const details = props.props.details;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 4).toString() + "px";
  const left = (props.fac * 85).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const degreeStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 7).toString() + "pt",
    fontFamily: font,
    fontWeight: "bold",
    left: left,
    top: top,
    color: "#000000",
    display: "flex",
    alignItems: "center"
  };

  const institutionStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 4)).toString() + "px",
    color: "#666666",
    display: "flex",
    alignItems: "center"
  };

  const durationStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 3).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 5.5).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 8)).toString() + "px",
    color: "#888888",
    display: "flex",
    alignItems: "center"
  };

  const detailsStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * (props.props.height - 11)).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: (props.fac * 3.5).toString() + "px",
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 11)).toString() + "px",
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  // Parse HTML content using html-react-parser
  const parsedDetails = typeof details === 'string' ? parse(details) : details;

  return (
    <>
      <div style={degreeStyle} id={id + "_degree"}>
        {degree}
      </div>
      <div style={institutionStyle} id={id + "_institution"}>
        {institution}
      </div>
      <div style={durationStyle} id={id + "_duration"}>
        {duration}
      </div>
      <div style={detailsStyle} id={id + "_details"}>
        {parsedDetails}
      </div>
    </>
  );
};

// Component 14: RightBlockBullet
export const RightBlockBullet: React.FC<RightBlockBulletProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 115).toString() + "px";
  const name = props.props.name;
  let a = 6;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * props.props.height).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 90).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  const bulletLeft = (props.fac * 85).toString() + "px";
  const bulletTop = (props.fac * (props.props.top + 2)).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (115 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const textStyle: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  const bulletStyle: CSSProperties = {
    position: "absolute",
    left: bulletLeft,
    top: bulletTop,
    color: "#666666",
    fontSize: (props.fac * 3).toString() + "px"
  };

  // Parse HTML content using html-react-parser
  const parsedContent = typeof name === 'string' ? parse(name) : name;

  return (
    <>
      <div style={bulletStyle}>•</div>
      <div style={textStyle} id={id}>
        {parsedContent}
      </div>
    </>
  );
};

// Component 15: RightBlockBulletSmall
export const RightBlockBulletSmall: React.FC<RightBlockBulletProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 115).toString() + "px";
  const name = props.props.name;
  let a = 5.5;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * props.props.height).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 90).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  const bulletLeft = (props.fac * 85).toString() + "px";
  const bulletTop = (props.fac * (props.props.top + 1.5)).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (115 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const textStyle: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  const bulletStyle: CSSProperties = {
    position: "absolute",
    left: bulletLeft,
    top: bulletTop,
    color: "#666666",
    fontSize: (props.fac * 2.5).toString() + "px"
  };

  // Parse HTML content using html-react-parser
  const parsedContent = typeof name === 'string' ? parse(name) : name;

  return (
    <>
      <div style={bulletStyle}>•</div>
      <div style={textStyle} id={id}>
        {parsedContent}
      </div>
    </>
  );
};

// Component 16: RightBlockArea
export const RightBlockArea: React.FC<RightBlockBulletProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 120).toString() + "px";
  const name = props.props.name;
  let a = 6;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 3.5).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 85).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (120 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  // Parse HTML content using html-react-parser
  const parsedContent = typeof name === 'string' ? parse(name) : name;

  return (
    <div style={style} id={id}>
      {parsedContent}
    </div>
  );
};

// Component 17: BlockProject
export const BlockProject: React.FC<BlockProjectProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 200).toString() + "px";
  const name = props.props.name;
  const details = props.props.details;
  let a = 7;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 4).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 6).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const titleStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "bold",
    left: left,
    top: top,
    color: "#000000",
    display: "flex",
    alignItems: "center"
  };

  const detailsStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * (props.props.height - 4)).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: (props.fac * 3.5).toString() + "px",
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 4)).toString() + "px",
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  // Parse HTML content using html-react-parser
  const parsedDetails = typeof details === 'string' ? parse(details) : details;

  return (
    <>
      <div style={titleStyle} id={id + "_title"}>
        {name}
      </div>
      <div style={detailsStyle} id={id + "_details"}>
        {parsedDetails}
      </div>
    </>
  );
};

// Component 18: BlockBullet
export const BlockBullet: React.FC<BlockBulletProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 195).toString() + "px";
  const name = props.props.name;
  let a = 6;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 3.5).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 11).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  const bulletLeft = (props.fac * 6).toString() + "px";
  const bulletTop = (props.fac * (props.props.top + 1)).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (195 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const textStyle: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  const bulletStyle: CSSProperties = {
    position: "absolute",
    left: bulletLeft,
    top: bulletTop,
    color: "#666666",
    fontSize: (props.fac * 3).toString() + "px"
  };

  // Parse HTML content using html-react-parser
  const parsedContent = typeof name === 'string' ? parse(name) : name;

  return (
    <>
      <div style={bulletStyle}>•</div>
      <div style={textStyle} id={id}>
        {parsedContent}
      </div>
    </>
  );
};

// Component 19: BlockBulletSmall
export const BlockBulletSmall: React.FC<BlockBulletProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 195).toString() + "px";
  const name = props.props.name;
  let a = 5.5;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 3.5).toString() + "px";
  let size = (props.fac * a).toString() + "pt";
  const left = (props.fac * 11).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  const bulletLeft = (props.fac * 6).toString() + "px";
  const bulletTop = (props.fac * (props.props.top + 1)).toString() + "px";
  
  let arr = textWidth("calibri", "normal", size, "auto", name);
  let w = arr[1];
  const dec = 0.1;
  
  while (195 < w && a > 4) {
    a = a - dec;
    const size1 = (a).toString() + "pt";
    arr = textWidth("calibri", "normal", size1, "auto", name);
    w = arr[1];
    size = (props.fac * a).toString() + "pt";
  }
  
  const textStyle: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: size,
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: top,
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  const bulletStyle: CSSProperties = {
    position: "absolute",
    left: bulletLeft,
    top: bulletTop,
    color: "#666666",
    fontSize: (props.fac * 2.5).toString() + "px"
  };

  // Parse HTML content using html-react-parser
  const parsedContent = typeof name === 'string' ? parse(name) : name;

  return (
    <>
      <div style={bulletStyle}>•</div>
      <div style={textStyle} id={id}>
        {parsedContent}
      </div>
    </>
  );
};

// Component 20: BlockEdu
export const BlockEdu: React.FC<BlockEduProps> = (props) => {
  const height = (props.fac * props.props.height).toString() + "px";
  const width = (props.fac * 200).toString() + "px";
  const degree = props.props.degree;
  const institution = props.props.institution;
  const duration = props.props.duration;
  const details = props.props.details;
  const bg = "#ffffff";
  const font = props.font;
  const id = props.id;
  const line = (props.fac * 4).toString() + "px";
  const left = (props.fac * 6).toString() + "px";
  const top = (props.fac * props.props.top).toString() + "px";
  
  const degreeStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 7).toString() + "pt",
    fontFamily: font,
    fontWeight: "bold",
    left: left,
    top: top,
    color: "#000000",
    display: "flex",
    alignItems: "center"
  };

  const institutionStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 4).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 4)).toString() + "px",
    color: "#666666",
    display: "flex",
    alignItems: "center"
  };

  const durationStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * 3).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: line,
    fontSize: (props.fac * 5.5).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 8)).toString() + "px",
    color: "#888888",
    display: "flex",
    alignItems: "center"
  };

  const detailsStyle: CSSProperties = {
    position: "absolute",
    height: (props.fac * (props.props.height - 11)).toString() + "px",
    width: width,
    backgroundColor: bg,
    lineHeight: (props.fac * 3.5).toString() + "px",
    fontSize: (props.fac * 6).toString() + "pt",
    fontFamily: font,
    fontWeight: "normal",
    left: left,
    top: (props.fac * (props.props.top + 11)).toString() + "px",
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden"
  };

  // Parse HTML content using html-react-parser
  const parsedDetails = typeof details === 'string' ? parse(details) : details;

  return (
    <>
      <div style={degreeStyle} id={id + "_degree"}>
        {degree}
      </div>
      <div style={institutionStyle} id={id + "_institution"}>
        {institution}
      </div>
      <div style={durationStyle} id={id + "_duration"}>
        {duration}
      </div>
      <div style={detailsStyle} id={id + "_details"}>
        {parsedDetails}
      </div>
    </>
  );
};

// Component 21: LeftBlock Layout
export const LeftBlock: React.FC<BaseComponentProps & { height: number; children: React.ReactNode }> = (props) => {
  const height = (props.fac * props.height).toString() + "px";
  const width = (props.fac * 80).toString() + "px";
  const bg = props.bg;
  const font = props.font;
  const id = props.id;

  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    fontFamily: font,
    left: "0px",
    top: "0px"
  };

  return (
    <div style={style} id={id}>
      {props.children}
    </div>
  );
};

// Component 22: RightBlock Layout
export const RightBlock: React.FC<BaseComponentProps & { height: number; children: React.ReactNode }> = (props) => {
  const height = (props.fac * props.height).toString() + "px";
  const width = (props.fac * 130).toString() + "px";
  const marginLeft = (props.fac * 80).toString() + "px";
  const bg = props.bg;
  const font = props.font;
  const id = props.id;

  const style: CSSProperties = {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: bg,
    fontFamily: font,
    left: marginLeft,
    top: "0px"
  };

  return (
    <div style={style} id={id}>
      {props.children}
    </div>
  );
};

// Component 23: Hidden Text Element (for textWidth calculations)
export const HiddenTextElement: React.FC = () => {
  const style: CSSProperties = {
    position: "absolute",
    left: "-9999px",
    top: "-9999px",
    visibility: "hidden",
    whiteSpace: "nowrap",
    fontSize: "12pt",
    fontFamily: "calibri"
  };

  return <div id="text" style={style}></div>;
};

// Component 24: MainBlock (Container for entire resume)
export const MainBlock: React.FC<BaseComponentProps & { 
  height: number; 
  children: React.ReactNode;
}> = (props) => {
  const height = (props.fac * props.height).toString() + "px";
  const width = (props.fac * 210).toString() + "px";
  const bg = "#ffffff";
  const fontFamily = props.fontFamily;
  const id = props.id;

  const style: CSSProperties = {
    position: "relative",
    height: height,
    width: width,
    backgroundColor: bg,
    fontFamily: fontFamily,
    margin: "0 auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflow: "hidden"
  };

  return (
    <div style={style} id={id}>
      <HiddenTextElement />
      {props.children}
    </div>
  );
};

// Component 25: ResumeWrapper (Main container with scaling)
export const ResumeWrapper: React.FC<{
  fac: number;
  children: React.ReactNode;
  className?: string;
}> = (props) => {
  const containerStyle: CSSProperties = {
    transform: `scale(${props.fac})`,
    transformOrigin: "top left",
    width: `${210 * props.fac}mm`,
    height: `${297 * props.fac}mm`,
    overflow: "hidden"
  };

  return (
    <div style={containerStyle} className={props.className}>
      {props.children}
    </div>
  );
};

// Export all components

