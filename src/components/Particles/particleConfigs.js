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
    colors: ['rgba(255, 255, 255, 0.03)', 'rgba(59, 130, 246, 0.03)', 'rgba(147, 51, 234, 0.02)'],
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
    colors: ['rgba(244, 67, 54, 0.05)', 'rgba(33, 150, 243, 0.05)', 'rgba(76, 175, 80, 0.05)', 'rgba(255, 235, 59, 0.05)'],
    blur: false
  }
};
