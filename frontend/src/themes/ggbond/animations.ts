/**
 * GGbond Theme Animations
 * 猪猪侠主题的趣味性动画配置
 */

export const animations = {
  // 动画类名
  'fade-in': 'fadeIn 0.3s ease-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'slide-in-right': 'slideInRight 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'shimmer': 'shimmer 2s linear infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',

  // 猪猪侠主题专属动画
  'bounce-slow': 'bounce 2s infinite',
  'wiggle': 'wiggle 1s ease-in-out infinite',
  'float': 'float 3s ease-in-out infinite',
  'spin-slow': 'spin 3s linear infinite',
  'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
  'rotate-tilt': 'rotateTilt 0.3s ease-out',
}

export const keyframes = {
  // 原有动画
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
    '50%': { transform: 'rotate(3deg)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  rotateTilt: {
    '0%': { transform: 'rotate(0deg)' },
    '50%': { transform: 'rotate(3deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
}

export default {
  animations,
  keyframes
}
