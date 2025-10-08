// Optimized userInfo.tsx using the new modular system
import React from 'react';
import { FaPhone, FaEnvelope, FaHome, FaPassport } from 'react-icons/fa';
import { 
  UserName, 
  UserDesignation, 
  LeftBlockHeading, 
  LeftBlockContactInfo, 
  VL 
} from '@/components/molecules/visualresume';

import {UserPhoto} from '@/components/molecules/visualresume/BlockBulletUnified';

// Import the new modular system
import { 
  ComponentSequenceObj, 
  ResumeType, 
  TemplateNumber
} from '@/types/visualresume';
import { TemplateConfigManager } from '../config/template-config.manager';
import { PageManager } from '../utils/page-manager.utils';

// User data interface
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

/**
 * Optimized UserInfo Component using the new modular system
 * Features:
 * - Array-based pages structure
 * - Modular component injection
 * - Template-driven configuration
 * - Geometric calculations
 * - Shared utility functions
 */
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
  template: TemplateNumber
): ComponentSequenceObj => {
  
  // Initialize the modular system
  const templateConfigManager = TemplateConfigManager.getInstance();
  const pageManager = PageManager.getInstance();

  // Get configurations
  const templateConfig = templateConfigManager.getTemplateConfig(resumeType, template);

  // Initialize pages structure
  pageManager.initializePages(obj);

  // Initialize heights based on template
  let leftH = template === 3 ? 10 : 0;
  let rightH = template === 3 ? 10 : 0;

  // Set initial values
  obj.leftH = leftH;
  obj.rightH = rightH;
  obj.currentPage = 0;

  // ============ PHOTO COMPONENT ============
  if (data.photoDisplay) {
    const photoProps = {
      top: templateConfig.photoConfig.top,
      photo,
      height: templateConfig.photoConfig.height,
      resumeType,
      template,
      ...templateConfig.photoConfig.marginConfig
    };

    pageManager.addToPage(obj, 0, 'left', UserPhoto, 'user-photo', photoProps);
    leftH = templateConfig.photoConfig.top + templateConfig.photoConfig.height + (template === 3 ? 4 : 0);
  }

  // ============ NAME AND DESIGNATION ============
  const nameProps = {
    top: template === 3 ? 10 : 0,
    name,
    height: template === 4 || template === 5 ? 44 : 13,
    resumeType,
    template
  };

  const designationTop = template === 3 || template === 4 || template === 5 ? 10 : 0;
  const designationProps = {
    top: designationTop + 13 + 1,
    name: data.designation,
    height: 9,
    resumeType,
    template
  };

  pageManager.addToPage(obj, 0, 'right', UserName, 'user-name', nameProps);
  pageManager.addToPage(obj, 0, 'right', UserDesignation, 'user-designation', designationProps);

  rightH = designationTop + 13 + 1 + 9 + (template === 3 ? 2 : 7);

  // ============ VL COMPONENT ============
  if (templateConfig.vlConfig) {
    const vlProps = {
      resumeType,
      template,
      ...templateConfig.vlConfig
    };
    
    pageManager.addToPage(obj, 0, templateConfig.vlConfig.position, VL, templateConfig.vlConfig.id, vlProps);
  }

  // ============ CONTACT SECTION ============
  
  // Template 4 margin override
  if (template === 4) {
    marginSec = 2;
  }

  // Add contact heading
  const contactHeadingProps = {
    top: leftH + marginSec,
    name: 'CONTACT',
    height: 9,
    resumeType,
    template,
    ...(templateConfig.contactConfig.headingIcon && { icon: templateConfig.contactConfig.headingIcon })
  };

  pageManager.addToPage(obj, 0, 'left', LeftBlockHeading, 'contact-heading', contactHeadingProps);
  leftH += marginSec + 9;

  // Helper function for contact items
  const addContactItem = (id: string, value: string, icon: any, height = 5) => {
    const contactProps = {
      top: leftH + marginSec,
      name: value,
      icon,
      height,
      resumeType,
      template
    };

    pageManager.addToPage(obj, 0, 'left', LeftBlockContactInfo, id, contactProps);
    leftH += marginSec + height + (template === 3 ? marginSec : 0);
  };

  // ============ CONTACT ITEMS ============
  
  // Phone 1 (always present)
  addContactItem('contact-phone', data.phone, FaPhone);

  // Phone 2 (conditional)
  if (data.phone2Display || (data.phone2?.optional)) {
    const phone2Value = typeof data.phone2 === 'object' ? data.phone2.value ?? '' : data.phone2 ?? '';
    if (phone2Value) {
      addContactItem('contact-phone2', phone2Value, FaPhone);
    }
  }

  // Email
  addContactItem('contact-email', email, FaEnvelope);

  // Address (simple vs full)
  if (!data.addressDisplay && !(data.addressFull && typeof data.addressFull === 'object' && data.addressFull.optional)) {
    addContactItem('contact-address', data.address, FaHome);
  } else {
    const fullAddress = typeof data.addressFull === 'string'
      ? data.addressFull
      : data.addressFull?.value ?? '';
    
    if (fullAddress) {
      addContactItem('contact-address', fullAddress, FaHome);
    }
  }

  // Visa (conditional)
  if (data.visa?.optional && data.visa.value) {
    addContactItem('contact-visa', data.visa.value, FaPassport);
  }

  // Template 3 final padding
  if (template === 3) {
    leftH += 2;
  }

  // ============ FINALIZATION ============
  
  // Update final heights
  obj.leftH = leftH;
  obj.rightH = rightH;

  // Ensure page1 compatibility (legacy support)
  if (obj.pages.length > 0) {
    // Copy first page content to legacy page1 structure for backward compatibility
    const page1 = {
      left: {
        components: [...obj.pages[0].left.components],
        ids: [...obj.pages[0].left.ids],
        props: [...obj.pages[0].left.props]
      },
      right: {
        components: [...obj.pages[0].right.components],
        ids: [...obj.pages[0].right.ids],
        props: [...obj.pages[0].right.props]
      }
    };

    // Also maintain legacy left/right references
    obj.left = page1.left;
    obj.right = page1.right;
  }

  return obj;
};

export default userInfo;
export type { ResumeType, TemplateNumber, UserData };
