// Enhanced Text Measurement Utilities
interface MeasurementCache {
  [key: string]: [number, number];
}

class OptimizedTextMeasurer {
  private canvasCache = new Map<string, CanvasRenderingContext2D>();
  private measurementCache: MeasurementCache = {};
  private maxCacheSize = 1000;
  private cacheKeys: string[] = [];
  
  private getCanvas(): CanvasRenderingContext2D {
    const cacheKey = 'default';
    if (!this.canvasCache.has(cacheKey)) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        this.canvasCache.set(cacheKey, context);
      }
    }
    return this.canvasCache.get(cacheKey)!;
  }

  private createCacheKey(
    fontFamily: string,
    fontWeight: string | number,
    fontSize: string,
    width: string,
    text: string,
    lineHeight?: string
  ): string {
    return `${fontFamily}-${fontWeight}-${fontSize}-${width}-${text.substring(0, 50)}-${lineHeight || ''}`;
  }

  private manageCacheSize(): void {
    if (this.cacheKeys.length >= this.maxCacheSize) {
      const removeCount = Math.floor(this.maxCacheSize * 0.2);
      const keysToRemove = this.cacheKeys.splice(0, removeCount);
      keysToRemove.forEach(key => delete this.measurementCache[key]);
    }
  }

  private ensureTextElement(): HTMLElement {
    let element = document.getElementById("text-measurer");
    if (!element) {
      element = document.createElement('div');
      element.id = 'text-measurer';
      
      Object.assign(element.style, {
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        visibility: 'hidden',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        margin: '0',
        padding: '0',
        border: 'none',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontSize: '12px',
        fontFamily: 'calibri, sans-serif'
      });
      
      document.body.appendChild(element);
    }
    return element;
  }

  measureText(
    fontFamily: string,
    fontWeight: string | number,
    fontSize: string,
    width: string,
    text: string,
    lineHeight?: string
  ): [number, number] {
    const cacheKey = this.createCacheKey(fontFamily, fontWeight, fontSize, width, text, lineHeight);
    if (this.measurementCache[cacheKey]) {
      return this.measurementCache[cacheKey];
    }

    let result: [number, number];

    try {
      const element = this.ensureTextElement();
      
      Object.assign(element.style, {
        fontSize,
        fontFamily,
        fontWeight: fontWeight.toString(),
        width,
        height: 'auto',
        lineHeight: lineHeight || 'normal'
      });

      element.innerHTML = text;
      
      const height = element.scrollHeight + 1;
      const textWidth = element.scrollWidth + 1;
      
      result = [height, textWidth];
    } catch (error) {
      const fontSizeNum = parseFloat(fontSize.replace(/[^\d.]/g, '')) || 12;
      result = [Math.ceil(fontSizeNum * 1.2), Math.ceil(text.length * fontSizeNum * 0.6)];
    }

    this.manageCacheSize();
    this.measurementCache[cacheKey] = result;
    this.cacheKeys.push(cacheKey);
    
    return result;
  }

  clearCache(): void {
    this.measurementCache = {};
    this.cacheKeys = [];
  }

  dispose(): void {
    const element = document.getElementById("text-measurer");
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    this.clearCache();
    this.canvasCache.clear();
  }
}

// Singleton instance
const textMeasurer = new OptimizedTextMeasurer();

// Export functions
export const textWidth = (
  fontf: string,
  weight: string | number,
  size: string,
  width: string,
  name: string
): [number, number] => {
  return textMeasurer.measureText(fontf, weight, size, width, name);
};

export const textWidthL = (
  fontf: string,
  weight: string | number,
  size: string,
  width: string,
  name: string
): [number, number] => {
  return textMeasurer.measureText(fontf, weight, size, width, name, "3.2pt");
};

export const cleanupTextMeasurer = () => {
  textMeasurer.dispose();
};

export default textMeasurer;
