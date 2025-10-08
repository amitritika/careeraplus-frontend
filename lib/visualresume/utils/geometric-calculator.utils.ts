// Geometric Calculation Utils
import { TemplateNumber, GeometricConfig } from '@/types/visualresume';

export class GeometricCalculator {
  private static instance: GeometricCalculator;
  
  private readonly DEFAULT_CONFIG: GeometricConfig = {
    pageHeight: 297,
    pageWidth: 210,
    marginPage: 10,
    marginSec: 2,
    marginBullet: 1
  };

  static getInstance(): GeometricCalculator {
    if (!GeometricCalculator.instance) {
      GeometricCalculator.instance = new GeometricCalculator();
    }
    return GeometricCalculator.instance;
  }

  getGeometricConfig(template?: TemplateNumber): GeometricConfig {
    const config = { ...this.DEFAULT_CONFIG };
    
    // Template-specific adjustments
    if (template === 4) {
      config.marginSec = 2; // Template 4 override
    }
    
    return config;
  }

  calculateOverflowThreshold(pageCount: number, template: TemplateNumber): number {
    if (template === 3) {
      return pageCount * this.DEFAULT_CONFIG.pageHeight - 10;
    }
    return pageCount * this.DEFAULT_CONFIG.pageHeight;
  }

  calculatePageHeight(pageNumber: number, marginPage: number): number {
    return this.DEFAULT_CONFIG.pageHeight * (pageNumber - 1) + marginPage;
  }

  calculateVLDimensions(
    pageCount: number, 
    currentPageHeight: number, 
    template: TemplateNumber,
    marginPage: number,
    marginSec: number
  ): { top: number; height: number } {
    switch (template) {
      case 1:
        return {
          top: pageCount === 1 ? 60 : this.calculatePageHeight(pageCount, marginPage) + marginSec,
          height: pageCount === 1 ? 230 : this.DEFAULT_CONFIG.pageHeight - (
            (this.DEFAULT_CONFIG.pageHeight * pageCount) - currentPageHeight
          )
        };
        
      case 3:
        return {
          top: 15,
          height: 267
        };
        
      case 5:
        return {
          top: 10,
          height: 287
        };
        
      default:
        return { top: 0, height: 0 };
    }
  }

  calculateHeightIncrement(
    baseHeight: number,
    marginSec: number,
    templateNumber: TemplateNumber,
    resumeType: string
  ): number {
    if (templateNumber === 5 && resumeType !== 'fresher') {
      return baseHeight; // Template 5 special case
    }
    return marginSec + baseHeight;
  }
}
