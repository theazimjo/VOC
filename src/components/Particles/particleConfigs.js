export const particleConfigs = {
  ios: {
    type: 'orbs',
    count: 12,
    minSize: 80,
    maxSize: 220,
    minSpeedY: -0.1,
    maxSpeedY: 0.1,
    minSpeedX: -0.1,
    maxSpeedX: 0.1,
    colors: ['rgba(0, 162, 232, 0.03)', 'rgba(34, 197, 94, 0.03)', 'rgba(249, 115, 22, 0.02)'],
    blur: true
  },
  android: {
    type: 'material',
    count: 25,
    minSize: 15,
    maxSize: 40,
    minSpeedY: -0.2,
    maxSpeedY: -0.05,
    minSpeedX: -0.1,
    maxSpeedX: 0.1,
    colors: ['rgba(16, 185, 129, 0.05)', 'rgba(59, 130, 246, 0.05)', 'rgba(245, 158, 11, 0.04)'],
    blur: false
  }
};
