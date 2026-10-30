// 猪猪侠主题色阶（取色自角色原图）。primary 与 ggbond-red 共用同一份数据。
// red 500 及以上与白色对比度 >= 4.5（WCAG AA），可用于白字按钮和白底正文。
const red = {
  50: '#FFF3F1',
  100: '#FFE3DF',
  200: '#FFC4BC',
  300: '#FF978A',
  400: '#F65A4B',
  500: '#E2231A', // 头套红
  600: '#C8191A',
  700: '#A81313',
  800: '#8A0F11',
  900: '#6E0D0F',
  950: '#3F0506'
}

// 眉饰黄。只配深色文字（与白字对比度不足）。
const yellow = {
  50: '#FFFBEA',
  100: '#FFF3C4',
  200: '#FFE685',
  300: '#FFD84A',
  400: '#FFC81F',
  500: '#FFB703',
  600: '#DB8C00',
  700: '#B26500',
  800: '#8F4E06',
  900: '#76410B',
  950: '#442100'
}

// 角色肤色，用于浅色底和卡片
const skin = {
  50: '#FFFAF6',
  100: '#FFF3EA',
  200: '#FCE3D2',
  300: '#F6CDB4',
  400: '#EBA08A',
  500: '#D9806A'
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: red,
        // 辅助色 - 中性灰蓝（与改色前一致）
        accent: {
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
        },
        'ggbond-red': red,
        'ggbond-yellow': yellow,
        'ggbond-skin': skin,
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
        glow: '0 0 20px rgba(226, 35, 26, 0.3)',
        'glow-lg': '0 0 40px rgba(226, 35, 26, 0.4)',
        'glow-red': '0 4px 20px rgba(226, 35, 26, 0.35)',
        'glow-yellow': '0 4px 20px rgba(255, 183, 3, 0.45)',
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'card-ggbond': '0 8px 24px rgba(168, 19, 19, 0.10), 0 2px 6px rgba(168, 19, 19, 0.06)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #E2231A 0%, #A81313 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, rgba(226, 35, 26, 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255, 183, 3, 0.10) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(226, 35, 26, 0.06) 0px, transparent 50%)'
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
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        twinkle: 'twinkle 3s ease-in-out infinite'
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
          '0%': { boxShadow: '0 0 20px rgba(226, 35, 26, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(226, 35, 26, 0.5)' }
        },
        // 猪猪侠主题新增动画
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' }
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
