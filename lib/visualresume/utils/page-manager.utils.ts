// Page Management System
import { ComponentSequenceObj, PageStructure } from '@/types/visualresume';

export class PageManager {
  private static instance: PageManager;

  static getInstance(): PageManager {
    if (!PageManager.instance) {
      PageManager.instance = new PageManager();
    }
    return PageManager.instance;
  }

  initializePages(obj: ComponentSequenceObj): ComponentSequenceObj {
    // Initialize pages array if not exists
    if (!obj.pages) {
      obj.pages = [];
    }

    // Ensure at least one page exists
    if (obj.pages.length === 0) {
      obj.pages.push(this.createEmptyPage());
    }

    // Set current page to 0 if not set
    if (obj.currentPage === undefined) {
      obj.currentPage = 0;
    }

    return obj;
  }

  createEmptyPage(): PageStructure {
    return {
      left: {
        components: [],
        ids: [],
        props: []
      },
      right: {
        components: [],
        ids: [],
        props: []
      },
      block: {
        components: [],
        ids: [],
        props: []
      }
    };
  }

  ensurePageExists(obj: ComponentSequenceObj, pageIndex: number): void {
    while (obj.pages.length <= pageIndex) {
      obj.pages.push(this.createEmptyPage());
    }
  }

  getCurrentPage(obj: ComponentSequenceObj): PageStructure {
    this.ensurePageExists(obj, obj.currentPage);
    return obj.pages[obj.currentPage];
  }

  getPage(obj: ComponentSequenceObj, pageIndex: number): PageStructure {
    this.ensurePageExists(obj, pageIndex);
    return obj.pages[pageIndex];
  }

  addToCurrentPage(
    obj: ComponentSequenceObj,
    section: 'left' | 'right',
    component: any,
    id: string,
    props: any
  ): void {
    const currentPage = this.getCurrentPage(obj);
    currentPage[section].components.push(component);
    currentPage[section].ids.push(id);
    currentPage[section].props.push(props);
  }

  addToPage(
    obj: ComponentSequenceObj,
    pageIndex: number,
    section: 'left' | 'right',
    component: any,
    id: string,
    props: any
  ): void {
    const page = this.getPage(obj, pageIndex);
    page[section].components.push(component);
    page[section].ids.push(id);
    page[section].props.push(props);
  }

  moveToNextPage(obj: ComponentSequenceObj): void {
    obj.currentPage++;
    obj.countR++;
    
    // Reset height for new page
    const geometricConfig = { pageHeight: 297, marginPage: 10 };
    obj.rightH = geometricConfig.pageHeight * (obj.countR - 1) + geometricConfig.marginPage;
    
    this.ensurePageExists(obj, obj.currentPage);
  }

  copyPageContent(sourcePage: PageStructure, targetPage: PageStructure): void {
    // Deep copy the content
    targetPage.left.components = [...sourcePage.left.components];
    targetPage.left.ids = [...sourcePage.left.ids];
    targetPage.left.props = [...sourcePage.left.props];
    
    targetPage.right.components = [...sourcePage.right.components];
    targetPage.right.ids = [...sourcePage.right.ids];
    targetPage.right.props = [...sourcePage.right.props];
  }

  handlePageOverflow(
    obj: ComponentSequenceObj,
    currentHeight: number,
    overflowThreshold: number
  ): boolean {
    if (currentHeight > overflowThreshold) {
      // Copy current page content to preserve state
      if (obj.currentPage === 0 && obj.pages.length === 1) {
        const page1 = this.createEmptyPage();
        this.copyPageContent(obj.pages[0], page1);
        obj.pages.push(page1);
      }
      
      this.moveToNextPage(obj);
      return true;
    }
    return false;
  }
}
