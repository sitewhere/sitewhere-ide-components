import moment from "moment";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Format date in YYYY-MM-DD H:mm:ss format. N/A for null.
 * @param date
 */
export function formatDate(date: Date) {
  if (!date) {
    return "N/A";
  }
  return moment(date).format("YYYY-MM-DD H:mm:ss");
}

/**
 * Format date in YYYY-MM-DD H:mm:ss format.
 * @param date
 */
export function formatIso8601(date: Date) {
  if (!date) {
    return null;
  }
  return moment(date).toISOString();
}

/**
 * Parse date in YYYY-MM-DD H:mm:ss format.
 * @param value
 */
export function parseIso8601(value: string) {
  if (!value) {
    return null;
  }
  return moment(value).toDate();
}

/**
 * Tests whether a string is blank.
 * @param str
 */
export function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}

/**
 * Short string with ellipsis if necessary.
 * @param val
 * @param max
 */
export function ellipsis(val: string, max: number) {
  return val.length > max ? val.substring(0, max) + "..." : val;
}

/**
 * Rounds to four decimal places
 * @param val
 */
export function fourDecimalPlaces(val: number): string {
  return Number(Math.round(parseFloat(val + "e4")) + "e-4").toFixed(4);
}

/**
 * Converts metadata object into array.
 * @param meta
 */
export function metadataToArray(meta: { [id: string]: any }) {
  const flat = [];
  if (meta) {
    for (const key in meta) {
      if (Object.prototype.hasOwnProperty.call(meta, key)) {
        flat.push({ name: key, value: meta[key] });
      }
    }
  }
  return flat;
}

/**
 * Converts array to metadata object.
 * @param arrayMeta
 */
export function arrayToMetadata(arrayMeta: any[]) {
  const metadata: { [id: string]: any } = {};
  if (arrayMeta) {
    for (let i = 0; i < arrayMeta.length; i++) {
      metadata[arrayMeta[i].name] = arrayMeta[i].value;
    }
  }
  return metadata;
}

/**
 * Routes to a applicaton-relative URL.
 * @param component
 * @param url
 */
export function routeTo(component: Vue, url: string): void {
  const tenant = component.$store.getters.selectedTenant;
  if (tenant) {
    component.$router.push("/tenants/" + tenant.token + url);
  }
}

/**
 * Routes to device page for hardware id.
 * @param component
 * @param token
 */
export function routeToDevice(component: Vue, token: string) {
  routeTo(component, "/devices/" + token);
}

/**
 * Returns paging value for all results.
 */
export function pagingForAllResults() {
  return "page=1&pageSize=0";
}

/** Generate a unique id */
export function generateUniqueId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Move an element in an array from one index to another.
 * @param arr
 * @param oldIndex
 * @param newIndex
 */
export function arrayMove(
  arr: any[],
  oldIndex: number,
  newIndex: number
): any[] {
  while (oldIndex < 0) {
    oldIndex += arr.length;
  }
  while (newIndex < 0) {
    newIndex += arr.length;
  }
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}
