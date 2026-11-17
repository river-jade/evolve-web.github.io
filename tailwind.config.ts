import type { Config } from "tailwindcss";

// Brand tokens from brand/colours-type-spacing.json
const brand = {
    forest: "#123D32",
    sage: "#5C8A6E",
    leaf: "#A7C7A0",
    sand: "#F5EBD7",
    paper: "#FBF6EA",
    sun: "#F4A261",
    coral: "#E76F51",
    "ink-soft": "#2B4A42",
    label: "#2F5646",
    line: "#E5D8BC",
};

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ...brand,
                primary: "var(--primary-color)",
                secondary: "var(--secondary-color)",
                background: "var(--background-color)",
                accent: "var(--accent-color)",
            },
            fontFamily: {
                display: ["var(--font-display)", "Marcellus", "Georgia", "serif"],
                sans: ["var(--font-sans)", "Manrope", "system-ui", "Arial", "sans-serif"],
            },
            fontSize: {
                display: ["56px", { lineHeight: "1.05" }],
                "heading-1": ["38px", { lineHeight: "1.1" }],
                "heading-2": ["26px", { lineHeight: "1.2" }],
                body: ["16px", { lineHeight: "1.5" }],
                small: ["14px", { lineHeight: "1.45" }],
                label: ["12px", { lineHeight: "1.3" }],
            },
            borderRadius: {
                sm: "6px",
                md: "12px",
                pill: "999px",
            },
            typography: {
                DEFAULT: {
                    css: {
                        "--tw-prose-body": brand.forest,
                        "--tw-prose-headings": brand.forest,
                        "--tw-prose-lead": brand["ink-soft"],
                        "--tw-prose-links": brand.forest,
                        "--tw-prose-bold": brand.forest,
                        "--tw-prose-counters": brand.label,
                        "--tw-prose-bullets": brand.sage,
                        "--tw-prose-hr": brand.line,
                        "--tw-prose-quotes": brand.forest,
                        "--tw-prose-quote-borders": brand.sage,
                        "--tw-prose-captions": brand["ink-soft"],
                        "--tw-prose-code": brand.forest,
                        "--tw-prose-th-borders": brand.line,
                        "--tw-prose-td-borders": brand.line,
                        fontSize: "16px",
                        lineHeight: "1.5",
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
