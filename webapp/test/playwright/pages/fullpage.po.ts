export interface FullPagePageObject {
    /** A full page must have a unique route - used in the openPage function for navigation */
    route: string;
    openPage: () => {};
    /** Asserts if the root element of the pages component is loaded. 
     * Implement by extending FullPageAssertions class */
    assertIfOpened(): Promise<void>;
    /** Asserts if all components are present on the page. 
     * Implement by extending FullPageAssertions class */
    assertIfPageFullyLoaded(): Promise<void>;
    /** Asserts if page is displayed as expected with image compare. 
     * Implement by extending FullPageAssertions class */
    assertIfPageDisplayedProperly(): Promise<void>;
}