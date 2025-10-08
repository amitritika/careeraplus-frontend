// Template Configuration Manager
import { ResumeType, TemplateNumber, TemplateConfig } from '@/types/visualresume';
import { FaPhone } from 'react-icons/fa';

export class TemplateConfigManager {
  private static instance: TemplateConfigManager;
  private configCache = new Map<string, TemplateConfig>();

  static getInstance(): TemplateConfigManager {
    if (!TemplateConfigManager.instance) {
      TemplateConfigManager.instance = new TemplateConfigManager();
    }
    return TemplateConfigManager.instance;
  }

  private getPhotoHeight(resumeType: ResumeType, template: TemplateNumber): number {
    const photoHeights: Record<TemplateNumber, Record<ResumeType, number>> = {
      1: { fresher: 53, pro: 53, expert: 53 },
      2: { fresher: 53, pro: 53, expert: 48 },
      3: { fresher: 40, pro: 45, expert: 45 },
      4: { fresher: 40, pro: 40, expert: 40 },
      5: { fresher: 45, pro: 45, expert: 45 }
    };
    return photoHeights[template][resumeType];
  }

  private getPhotoTop(template: TemplateNumber): number {
    const photoTops: Record<TemplateNumber, number> = {
      1: 10, 2: 10, 3: 12, 4: 2, 5: 10
    };
    return photoTops[template];
  }

  getTemplateConfig(resumeType: ResumeType, template: TemplateNumber): TemplateConfig {
    const cacheKey = `${resumeType}-${template}`;
    
    if (this.configCache.has(cacheKey)) {
      return this.configCache.get(cacheKey)!;
    }

    const baseConfig: TemplateConfig = {
      marginMultiplier: 2,
      headingIncrement: 13,
      heightAdjustment: 13,
      useBlockHeading: false,
      hasLineSupport: false,
      template3Offset: 0,
      photoConfig: {
        height: this.getPhotoHeight(resumeType, template),
        top: this.getPhotoTop(template)
      },
      contactConfig: {
        extraSpacing: false
      }
    };

    // Template-specific configurations
    const templateSpecific: Partial<TemplateConfig> = this.getTemplateSpecificConfig(resumeType, template);
    const config = { ...baseConfig, ...templateSpecific };
    
    this.configCache.set(cacheKey, config);
    return config;
  }

  private getTemplateSpecificConfig(resumeType: ResumeType, template: TemplateNumber): Partial<TemplateConfig> {
    switch (template) {
      case 1:
        return {
          vlConfig: { position: 'right', id: 'vl-page1' }
        };
        
      case 2:
        return {
          hasLineSupport: true,
          useBlockHeading: resumeType === 'fresher' || resumeType === 'pro',
          photoConfig: {
            height: this.getPhotoHeight(resumeType, template),
            top: 10,
            marginConfig: { marginL: 7, marginR: 7, marginT: 5, marginB: 5, r: 2 }
          },
          contactConfig: {
            headingIcon: FaPhone
          }
        };
        
      case 3:
        return {
          template3Offset: 10,
          hasLineSupport: true,
          useBlockHeading: resumeType === 'fresher' || resumeType === 'pro',
          vlConfig: { position: 'right', id: 'vert-page1' },
          contactConfig: {
            headingIcon: FaPhone,
            extraSpacing: true
          }
        };
        
      case 4:
        return {
          hasLineSupport: resumeType === 'fresher',
          useBlockHeading: resumeType === 'fresher',
          photoConfig: {
            height: this.getPhotoHeight(resumeType, template),
            top: 2,
            marginConfig: { marginL: 7, marginR: 7, marginT: 5, marginB: 5, r: 2 }
          }
        };
        
      case 5:
        return {
          hasLineSupport: resumeType === 'fresher',
          useBlockHeading: resumeType === 'fresher',
          heightAdjustment: resumeType !== 'fresher' ? 10 : 13,
          vlConfig: { position: 'right', id: 'vl-page1' }
        };
        
      default:
        return {};
    }
  }

  clearCache(): void {
    this.configCache.clear();
  }
}
