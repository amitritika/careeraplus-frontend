/**
 * Enhanced text measurement with caching and multiple fallback strategies
 */
class TextMeasurer {
  private canvasCache = new Map<string, CanvasRenderingContext2D>();
  private measurementCache = new Map<string, [number, number]>();
  private createdElement: boolean = false;
  
  private getCanvas(): CanvasRenderingContext2D {
    const cacheKey = 'default';
    if (!this.canvasCache.has(cacheKey)) {
      const canvas = document.createElement('canvas');
      this.canvasCache.set(cacheKey, canvas.getContext('2d')!);
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
    return `${fontFamily}-${fontWeight}-${fontSize}-${width}-${text}-${lineHeight || ''}`;
  }
  
  private ensureTextElement(): HTMLElement {
    // First try to find existing element with id "text"
    let element = document.getElementById("text");
    
    if (!element) {
      // Create invisible element with id "text" if none exists
      element = document.createElement('div');
      element.id = 'text';
      
      // Make it completely invisible but still measurable
      element.style.position = 'absolute';
      element.style.top = '-9999px';
      element.style.left = '-9999px';
      element.style.visibility = 'hidden';
      element.style.whiteSpace = 'pre-wrap';
      element.style.wordWrap = 'break-word';
      element.style.margin = '0';
      element.style.padding = '0';
      element.style.border = 'none';
      element.style.boxSizing = 'border-box';
      element.style.overflow = 'hidden';
      
      // Append to body for measurement
      document.body.appendChild(element);
      this.createdElement = true;
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
    // Check cache first
    const cacheKey = this.createCacheKey(fontFamily, fontWeight, fontSize, width, text, lineHeight);
    if (this.measurementCache.has(cacheKey)) {
      return this.measurementCache.get(cacheKey)!;
    }
    
    let result: [number, number];
    
    // Strategy 1: DOM element measurement (supports HTML)
    try {
      const domElement = this.ensureTextElement();
      
      // Reset and apply styles
      domElement.style.fontSize = fontSize;
      domElement.style.fontFamily = fontFamily;
      domElement.style.fontWeight = fontWeight.toString();
      domElement.style.width = width;
      domElement.style.height = 'auto';
      if (lineHeight) domElement.style.lineHeight = lineHeight;
      
      // Set content - innerHTML handles HTML tags properly
      domElement.innerHTML = text;
      
      // Use scrollHeight for accurate content height including HTML formatting
      const height = domElement.scrollHeight+1;
      const textWidth = domElement.scrollWidth+1;
      
      result = [height, textWidth];
      this.measurementCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn('DOM measurement failed:', error);
    }
    
    // Strategy 2: Canvas measurement (fallback for plain text)
    try {
      const ctx = this.getCanvas();
      ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      
      const metrics = ctx.measureText(text);
      const textWidth = Math.ceil(metrics.width);
      
      // Calculate height
      const fontSizeNum = parseFloat(fontSize.replace(/[^\d.]/g, ''));
      let textHeight = fontSizeNum;
      
      if (lineHeight) {
        const lineHeightNum = parseFloat(lineHeight.replace(/[^\d.]/g, ''));
        textHeight = lineHeightNum > 0 ? lineHeightNum : fontSizeNum * 1.2;
      } else {
        textHeight = fontSizeNum * 1.2;
      }
      
      // Handle text wrapping
      if (width !== 'auto') {
        const maxWidth = parseFloat(width.replace(/[^\d.]/g, ''));
        if (maxWidth > 0 && textWidth > maxWidth) {
          const lines = Math.ceil(textWidth / maxWidth);
          textHeight *= lines;
        }
      }
      
      result = [Math.ceil(textHeight), textWidth];
    } catch (error) {
      console.error('Canvas measurement failed:', error);
      // Strategy 3: Fallback approximation
      const fontSizeNum = parseFloat(fontSize.replace(/[^\d.]/g, ''));
      const approximateWidth = text.length * fontSizeNum * 0.6;
      const approximateHeight = fontSizeNum * 1.2;
      result = [Math.ceil(approximateHeight), Math.ceil(approximateWidth)];
    }
    
    this.measurementCache.set(cacheKey, result);
    return result;
  }
  
  clearCache(): void {
    this.measurementCache.clear();
  }
  
  // Clean up created element when done
  dispose(): void {
    if (this.createdElement) {
      const element = document.getElementById("text");
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
    this.clearCache();
  }
}

// Create singleton instance
const textMeasurer = new TextMeasurer();

// Export functions remain the same
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
