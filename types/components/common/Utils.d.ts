/**
 * Format date in YYYY-MM-DD H:mm:ss format. N/A for null.
 * @param date
 */
export declare function formatDate(date: Date): string;
/**
 * Format date in YYYY-MM-DD H:mm:ss format.
 * @param date
 */
export declare function formatIso8601(date: Date): string | null;
/**
 * Parse date in YYYY-MM-DD H:mm:ss format.
 * @param value
 */
export declare function parseIso8601(value: string): Date | null;
/**
 * Tests whether a string is blank.
 * @param str
 */
export declare function isBlank(str: string): boolean;
/**
 * Short string with ellipsis if necessary.
 * @param val
 * @param max
 */
export declare function ellipsis(val: string, max: number): string;
/**
 * Rounds to four decimal places
 * @param val
 */
export declare function fourDecimalPlaces(val: number): string;
/**
 * Converts metadata object into array.
 * @param meta
 */
export declare function metadataToArray(meta: {
    [id: string]: any;
}): {
    name: string;
    value: any;
}[];
/**
 * Converts array to metadata object.
 * @param arrayMeta
 */
export declare function arrayToMetadata(arrayMeta: any[]): {
    [id: string]: any;
};
/**
 * Routes to a applicaton-relative URL.
 * @param component
 * @param url
 */
export declare function routeTo(component: Vue, url: string): void;
/**
 * Routes to device page for hardware id.
 * @param component
 * @param token
 */
export declare function routeToDevice(component: Vue, token: string): void;
/**
 * Returns paging value for all results.
 */
export declare function pagingForAllResults(): string;
/** Generate a unique id */
export declare function generateUniqueId(): string;
/**
 * Move an element in an array from one index to another.
 * @param arr
 * @param oldIndex
 * @param newIndex
 */
export declare function arrayMove(arr: any[], oldIndex: number, newIndex: number): any[];
