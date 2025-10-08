// userInfo.tsx
import React from 'react';
import { FaPhone, FaEnvelope, FaHome, FaPassport } from 'react-icons/fa';
import { textWidth } from './common';
import { UserPhoto, UserName, UserDesignation, LeftBlockHeading, LeftBlockContactInfo, VL } from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';
/*  ─────────────────────────────────────────────────────────────
    1.  Type aliases keep the two identifiers explicit.
        These correspond to the three folders (fresher / pro / expert)
        and the five template numbers found in the original code base. [file:1][file:13]
─────────────────────────────────────────────────────────────── */
type ResumeType  = 'fresher' | 'pro' | 'expert';          // e.g. “fresher” in userInfo_fresher_template1.js [file:1]
type TemplateType = 1 | 2 | 3 | 4 | 5;                    // five template folders seen across all files [file:10]

/*  ─────────────────────────────────────────────────────────────
    2.  Data passed in from the form layer.  Field names match
        those consumed by every legacy file so downstream logic
        can stay unchanged. [file:1][file:9]
─────────────────────────────────────────────────────────────── */
interface UserData {
  photoDisplay: boolean;
  designation: string;
  phone: string;
  phone2Display?: boolean;
  phone2?: { optional?: boolean; value?: string };
  address: string;
  addressDisplay?: boolean;
  addressFull?: string | { optional?: boolean; value?: string };
  visa?: { optional?: boolean; value?: string };
}

/*  ─────────────────────────────────────────────────────────────
    3.  Layout object mirrors the ‘obj’ that every template
        mutated (left / right arrays + running heights). [file:1]
─────────────────────────────────────────────────────────────── */


/*  ─────────────────────────────────────────────────────────────
    4.  All visual blocks are now *one* component each.  The old
        path is gone; every component receives resumeType +
        template so it can pick its own styling. [file:10]
─────────────────────────────────────────────────────────────── */

/*  ─────────────────────────────────────────────────────────────
    5.  Configuration map ─ this is the heart of portability.
        Values were copied verbatim from the originals:

        • photoHeights ─‐ numbers taken from every template-file
          (53 in fresher-t1 & all pro-t1 files, 40 in t4, …). [file:1][file:10]
        • usesVL       ─‐ templates 1,3,5 push a VL component.  [file:1][file:9]
        • usesMarginProps ─‐ templates 2 & 4 added marginL/R/T/B. [file:6][file:10]
─────────────────────────────────────────────────────────────── */
const getTemplateConfig = (resumeType: ResumeType, template: TemplateType) => {
  const photoHeights: Record<TemplateType, Record<ResumeType, number>> = {
    1: { fresher: 53, pro: 53, expert: 53 },   // “height: 53” lines in template-1 files [file:1][file:13][file:5]
    2: { fresher: 53, pro: 53, expert: 48 },   // expert-t2 uses 48 [file:8]
    3: { fresher: 40, pro: 45, expert: 45 },   // fresher-t3 => 40, pro|expert-t3 => 45 [file:9][file:14]
    4: { fresher: 40, pro: 40, expert: 40 },   // uniform 40 [file:10][file:8]
    5: { fresher: 45, pro: 45, expert: 45 }    // “height: 45” across template-5 files [file:4][file:2abb2bfb]
  };

  const usesVL          = [1, 3, 5].includes(template);      // VL present in those originals [file:1][file:9]
  const usesMarginProps = [2, 4].includes(template);         // marginL/R/T/B only in 2 & 4 [file:6][file:10]
  const photoHeight     = photoHeights[template][resumeType];

  /*  Initial offsets match each old file’s hard-coded
      starting values: t3 began at 10, others at 0. [file:9] */
  const initial: Record<TemplateType, { leftH: number; rightH: number }> = {
    1: { leftH: 0,  rightH: 0 },
    2: { leftH: 0,  rightH: 0 },
    3: { leftH: 10, rightH: 10 },
    4: { leftH: 0,  rightH: 0 },
    5: { leftH: 0,  rightH: 0 }
  };

  const photoTops: Record<TemplateType, number> = {
    1: 10, 2: 10, 3: 12, 4: 2, 5: 10          // direct copies of “top:” lines [file:1][file:6][file:9][file:10]
  };

  const userName: Record<TemplateType, number> = {
    1: 13, 2: 13, 3: 13, 4: 44, 5: 44          // direct copies of “top:” lines [file:1][file:6][file:9][file:10]
  };

  const designationTop: Record<TemplateType, number> = {
    1: 0, 2: 0, 3: 10, 4: 10, 5: 10          // direct copies of “top:” lines [file:1][file:6][file:9][file:10]
  };


  const vlProps: Record<TemplateType, any> = {
    1: { position: 'right', id: 'vl-page1' },
    2: null,  // id seen in template-1 files [file:1]
    3: { position: 'right',  id: 'vert-page1' },  // id seen in template-3 files [file:9]
    4: null,
    5: { position: 'right', id: 'vl-page1' }
  };

  return {
    photoHeight,
    usesVL,
    usesMarginProps,
    initialHeights: initial[template],
    photoTop: photoTops[template],
    vlConfig: usesVL ? vlProps[template] : null,
    userName: userName[template],
    designationTop: designationTop[template]
  };
};

// external helper retained from legacy codebase

/*  ─────────────────────────────────────────────────────────────
    6.  MAIN FUNCTION – flow is kept identical to every template:

        • mutate obj.left / obj.right exactly in the same order
        • replicate marginSec edge-cases (t4 forces 2) [file:10]
        • copy every arithmetic expression ( +1, +2, +7 … ) so
          final leftH/rightH match originals. [file:1][file:9]
─────────────────────────────────────────────────────────────── */
const userInfo = (
  obj: ComponentSequenceObj,
  name: string,
  email: string,
  photo: string,
  data: UserData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType,
  template: TemplateType
): ComponentSequenceObj => {

  const cfg = getTemplateConfig(resumeType, template);
  let { leftH, rightH } = cfg.initialHeights;     // t3 started at 10, others at 0 [file:9]
    
  /* ───── Photo / Name / Designation ───────────────────── */
  if (data.photoDisplay) {
    // 1. Photo block – values copied from original hard-codes. [file:1][file:10]
    obj.left.components.push(UserPhoto);
    obj.left.ids.push('user-photo-dummy');
    obj.left.props.push({
      top: cfg.photoTop,                          // 10,10,12,2,10 map above [file:1][file:9]
      photo,
      height: cfg.photoHeight,                    // map above
      resumeType, template,
      ...(cfg.usesMarginProps && {                // only t2/t4 carried marginL… properties [file:6][file:10]
        marginL: 7, marginR: 7, marginT: 5, marginB: 5, r: 2
      })
    });
    obj.page1?.left.components.push(UserPhoto);
    obj.page1?.left.ids.push('user-photo-dummy');
    obj.page1?.left.props.push({
      top: cfg.photoTop,                          // 10,10,12,2,10 map above [file:1][file:9]
      photo,
      height: cfg.photoHeight,                    // map above
      resumeType, template,
      ...(cfg.usesMarginProps && {                // only t2/t4 carried marginL… properties [file:6][file:10]
        marginL: 7, marginR: 7, marginT: 5, marginB: 5, r: 2
      })
    });
    leftH = cfg.photoTop + cfg.photoHeight + (template === 3 ? 4 : 0);  // “+4” in template-3 [file:9]

    // 2. Name block – always height 13; top 10 only in t3. [file:9]
    obj.right.components.push(UserName);
    obj.right.ids.push('user-name-dummy');
    obj.right.props.push({
      top: template === 3 ? 10 : 0,
      name,
      height: cfg.userName,
      resumeType, template
    });
    obj.page1?.right.components.push(UserName);
    obj.page1?.right.ids.push('user-name-dummy');
    obj.page1?.right.props.push({
      top: template === 3 ? 10 : 0,
      name,
      height: cfg.userName,
      resumeType, template
    });
    rightH = cfg.designationTop + 13;

    // 3. Designation – original pattern “top = rightH + 1” [file:1]
    obj.right.components.push(UserDesignation);
    obj.right.ids.push('user-designation-dummy');
    obj.right.props.push({
      top: rightH + 1,
      name: data.designation,
      height: 9,
      resumeType, template
    });
    obj.page1?.right.components.push(UserDesignation);
    obj.page1?.right.ids.push('user-designation-dummy');
    obj.page1?.right.props.push({
      top: rightH + 1,
      name: data.designation,
      height: 9,
      resumeType, template
    });
    rightH = rightH + 1 + 9 + (template === 3 ? 2 : 7);   // “+2” in t3, “+7” elsewhere [file:1][file:9]

    /* ──── VL ─ placement matches each template’s arithmetic ─ */
    if (cfg.usesVL) {
      const tgt = cfg.vlConfig.position === 'left' ? obj.left : obj.right;
      const tgtPage1 = cfg.vlConfig.position === 'left' ? obj.page1?.left : obj.page1?.right;
      tgt.components.push(VL);
      tgt.ids.push(cfg.vlConfig.id);
      tgtPage1?.components.push(VL);
      tgtPage1?.ids.push(cfg.vlConfig.id);

      const vl: any = { resumeType, template, position: cfg.vlConfig.position };

      if (template === 1) {                           // top/rightH formula from template-1 [file:1]
        vl.top = rightH + 2;
        vl.height = 297 - rightH - 1 - 10;
      } else if (template === 3) {
        vl.top = 15;
        vl.height = 267;                                  // fixed in t3 originals [file:9]
      } else if (template === 5) {
        vl.top = 10;                          // t5 copies t1 pattern (287 vs 297) [file:2abb2bfb]
        vl.height = 287;
      }
      tgt.props.push(vl);
      tgtPage1?.props.push(vl);
    }
  }

  /* template-4 overrode marginSec → 2 in every file        [file:10] */
  if (template === 4) marginSec = 2;

  /* ───── “CONTACT” section heading – same +9 add-on ───── */
  obj.left.components.push(LeftBlockHeading);
  obj.left.ids.push('contact-dummy');
  obj.left.props.push({
    top: leftH + marginSec,
    name: 'CONTACT',
    height: 9,
    resumeType, template,
    ...(template === 2 || template === 3 ? { icon: FaPhone } : {})  // t2 & t3 headings carried an icon [file:6][file:9]
  });
  obj.page1?.left.components.push(LeftBlockHeading);
  obj.page1?.left.ids.push('contact-dummy');
  obj.page1?.left.props.push({
    top: leftH + marginSec,
    name: 'CONTACT',
    height: 9,
    resumeType, template,
    ...(template === 2 || template === 3 ? { icon: FaPhone } : {})  // t2 & t3 headings carried an icon [file:6][file:9]
  });
  leftH += marginSec + 9;

  /* The four contact items repeat a rigid pattern:          *
   *   Add      → top = leftH + marginSec                    *
   *   Advance  → leftH += marginSec + height                *
   * For template-3 an *extra* marginSec spaced each item.   [file:9] */
  const addContact = (
    id: string, value: string, icon: any, h = 5
  ) => {
    obj.left.components.push(LeftBlockContactInfo);
    obj.left.ids.push(id);
    obj.left.props.push({
      top: leftH + marginSec,
      name: value,
      icon,
      height: h,
      resumeType, template
    });
    obj.page1?.left.components.push(LeftBlockContactInfo);
    obj.page1?.left.ids.push(id);
    obj.page1?.left.props.push({
      top: leftH + marginSec,
      name: value,
      icon,
      height: h,
      resumeType, template
    });
    leftH += marginSec + h + (template === 3 ? marginSec : 0);
  };

  /* phone 1 = always present */                 
  addContact('contact-phone',   data.phone, FaPhone);
  /* phone 2 = several conditional checks */     
  if (data.phone2Display || (data.phone2 && typeof data.phone2 === 'object' && data.phone2.optional)) {
    const v = data.phone2Display
      ? (typeof data.phone2 === 'object' ? data.phone2.value ?? '' : (data.phone2 ?? ''))
      : (typeof data.phone2 === 'object' ? data.phone2.value ?? '' : (data.phone2 ?? ''));
    addContact('contact-phone2', v, FaPhone);
  }
  addContact('contact-email',   email,     FaEnvelope);     // email
  /* address chooses simple vs full, mirroring each template’s   *
   * width-measurement call when full address is enabled. [file:1] */
  if (!data.addressDisplay &&
      !(data.addressFull && typeof data.addressFull === 'object' && data.addressFull.optional)) {
      addContact('contact-address', data.address, FaHome);
  } else {
      const full = typeof data.addressFull === 'string'
                 ? data.addressFull
                 : data.addressFull?.value ?? '';
      const [h]  = textWidth('calibri','normal','3.2pt','62px', full);   // identical invocation [file:1]
      addContact('contact-address', full, FaHome, h);
  }

  /* visa only when .optional === true in the original files [file:13][file:5] */
  if (data.visa?.optional) addContact('contact-visa', data.visa.value!, FaPassport);

  if (template === 3) leftH += 2;                         // t3 extra padding at very end [file:9]

  obj.leftH  = leftH;
  obj.rightH = rightH;
  return obj;
};


export default userInfo;
