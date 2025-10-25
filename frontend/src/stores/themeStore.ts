import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark" | "system"

type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

/**
 * Tailwind is configured with `darkMode: 'class'`, so adding/removing "dark"
 * switches the entire design system.
 */

function applyTheme(theme: Theme) {
  const root = document.documentElement

  if (theme === "system") {
    // Read the OS/browser preference: true if the user prefers dark mode.
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches
    // Ensure the <html> element has "dark" only when the system prefers dark.
    root.classList.toggle("dark", systemPrefersDark)
  } else {
    // For explicit "light" or "dark", toggle based on the selected value.
    root.classList.toggle("dark", theme === "dark")
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Default to "system" so new users follow their OS preference initially.
      theme: "system",

      // Update the store and immediately apply the theme to the DOM.
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },
    }),
    {
      // Storage key name (localStorage by default via persist).
      name: "theme-preference",

      /**
       * `onRehydrateStorage` runs when persisted state is loaded back into the store.
       * We apply the stored theme to the DOM right away so the UI matches the preference.
       */
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme)
      },
    },
  ),
)
