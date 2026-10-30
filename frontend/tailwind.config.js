// 猪猪侠主题色阶。primary/accent 与 ggbond-* 共用同一份数据。
// 500 及以上与白色对比度 >= 4.5（WCAG AA），可用于白字按钮和白底正文；
// 品牌亮粉 #FF69B4 放在 400，只用于装饰（光晕、Logo、暗色模式文字）。
const pink = {
  50: '#FFF0F7',
  100: '#FFE1EF',
  200: '#FFC2DF',
  300: '#FF94C6',
  400: '#FF69B4',
  500: '#DB2777',
  600: '#C70A72',
  700: '#A50D5E',
  800: '#8A0A50',
  900: '#6B0842',
  950: '#42042A'
}

const purple = {
  50: '#F5F3FF',
  100: '#EDE9FE',
  200: '#DDD6FE',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#6A5ACD',
  600: '#5B4BC6',
  700: '#4B3BB8',
  800: '#3C2C9E',
  900: '#4B0082',
  950: '#2D004E'
}

// 金色只配深色文字（#FFD700 与白字对比度仅 1.4）
const gold = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#FFD700',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#451A03'
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: pink,
        accent: purple,
        'ggbond-pink': pink,
        'ggbond-purple': purple,
        'ggbond-gold': gold,
        'ggbond-sky': {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#00CED1',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49'
        },
        // 深色模式背景
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif'
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.06)',
        glow: '0 0 20px rgba(219, 39, 119, 0.3)',
        'glow-lg': '0 0 40px rgba(219, 39, 119, 0.4)',
        'glow-pink': '0 4px 20px rgba(219, 39, 119, 0.35)',
        'glow-purple': '0 4px 20px rgba(106, 90, 205, 0.35)',
        'glow-gold': '0 4px 20px rgba(255, 215, 0, 0.35)',
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'card-ggbond': '0 4px 16px rgba(219, 39, 119, 0.12), 0 2px 8px rgba(106, 90, 205, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'inner-glow-pink': 'inset 0 2px 8px rgba(219, 39, 119, 0.15)',
        'button-ggbond': '0 4px 12px rgba(219, 39, 119, 0.3)',
        'button-gold': '0 4px 12px rgba(255, 215, 0, 0.4)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #DB2777 0%, #C70A72 100%)',
        'gradient-purple': 'linear-gradient(135deg, #6A5ACD 0%, #4B0082 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, rgba(255, 105, 180, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(106, 90, 205, 0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(255, 215, 0, 0.08) 0px, transparent 50%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        // 猪猪侠主题新增动画
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(219, 39, 119, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(219, 39, 119, 0.5)' }
        },
        // 猪猪侠主题新增动画
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        '4xl': '2rem',
        'ggbond': '16px'  // 猪猪侠主题圆角
      }
    }
  },
  plugins: []
}
