import { create } from "zustand"
import { persist } from "zustand/middleware"

// Create a Zustand store with persistence
const useStore = create(
    persist(
        () => ({
            code: "", // The code snippet
            title: "Untitled", // The title of the code snippet
            theme: "candy", // The theme for the code snippet
            darkMode: true, // Flag to enable/disable dark mode
            showBackground: true, // Flag to show/hide background
            language: "plaintext", // The language of the code snippet
            autoDetectLanguage: false, // Flag to enable/disable auto-detection of language
            fontSize: 16, // The font size of the code snippet
            fontStyle: "jetBrainsMono", // The font style of the code snippet
            padding: 32, // The padding around the code snippet
        }),
        {
            name: "user-preferences", // The name of the storage key
        }
    )
)

export default useStore;
