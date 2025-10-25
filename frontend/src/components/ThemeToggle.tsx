import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";

type ThemeOption = {
    value: "light" | "dark" | "system";
    icon: React.ComponentType<{ className?: string }>;
    label: string;
};

export function ThemeToggle() {
    const { theme, setTheme } = useThemeStore();

    const themes: ThemeOption[] = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
        { value: "system", icon: Monitor, label: "System" },
    ];

    return (
        <div className="flex gap-1 p-1 bg-card/50 border border-border rounded-lg">
            {themes.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`p-2 rounded transition-all
            ${theme === value
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground/60 hover:text-foreground hover:bg-accent/20"
                        }`}
                    title={label}
                >
                    <Icon className="w-4 h-4" />
                </button>
            ))}
        </div>
    );
}
