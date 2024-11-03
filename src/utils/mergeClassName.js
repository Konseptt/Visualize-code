import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string.
 * This function combines class names using `clsx` and `tailwind-merge` to ensure
 * that Tailwind CSS classes are merged correctly.
 *
 * @param {...string} classNames - The class names to merge.
 * @returns {string} The merged class names.
 */
export function mergeClassNames(...classNames) {
    return twMerge(clsx(classNames));
}
