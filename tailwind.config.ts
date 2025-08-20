import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: {
					DEFAULT: 'hsl(var(--background))',
					surface: 'hsl(var(--background-surface))',
					elevated: 'hsl(var(--background-elevated))'
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground))',
					muted: 'hsl(var(--foreground-muted))',
					subtle: 'hsl(var(--foreground-subtle))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					hover: 'hsl(var(--primary-hover))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					elevated: 'hsl(var(--card-elevated))'
				},
				input: {
					DEFAULT: 'hsl(var(--input))',
					border: 'hsl(var(--input-border))',
					focus: 'hsl(var(--input-focus))'
				},
				border: {
					DEFAULT: 'hsl(var(--border))',
					subtle: 'hsl(var(--border-subtle))'
				},
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))',
				error: 'hsl(var(--error))'
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glow': 'var(--gradient-glow)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'elevated': 'var(--shadow-elevated)',
				'glow': 'var(--shadow-glow)'
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				pulseGlow: {
					'0%': { boxShadow: '0 0 20px rgba(229, 9, 20, 0.3)' },
					'100%': { boxShadow: '0 0 30px rgba(229, 9, 20, 0.6)' }
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
