import headphonesImg from '@/assets/product-headphones.jpg';
import watchImg from '@/assets/product-watch.jpg';
import keyboardImg from '@/assets/product-keyboard.jpg';
import speakerImg from '@/assets/product-speaker.jpg';
import phoneImg from '@/assets/product-phone.jpg';
import vrImg from '@/assets/product-vr.jpg';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'audio' | 'wearable' | 'gaming' | 'smart' | 'vr';
  description: string;
  features: string[];
  aiGenerated?: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  trending?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Quantum Wireless Headphones',
    trending: true,
    price: 299,
    image: headphonesImg,
    category: 'audio',
    description: 'Experience audio like never before with AI-enhanced sound processing and adaptive noise cancellation.',
    features: [
      'AI-Powered Sound Enhancement',
      'Active Noise Cancellation',
      '40-Hour Battery Life',
      'Premium Comfort Design'
    ],
    aiGenerated: true,
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    name: 'Aura SmartWatch Pro',
    price: 449,
    image: watchImg,
    category: 'wearable',
    description: 'Your intelligent health companion with holographic interface and real-time biometric monitoring.',
    features: [
      'Holographic Display',
      'Health Monitoring AI',
      'Water Resistant',
      '7-Day Battery'
    ],
    aiGenerated: true,
    rating: 4.9,
    reviews: 189,
    inStock: true
  },
  {
    id: 3,
    name: 'Neon Gaming Keyboard',
    trending: true,
    price: 199,
    image: keyboardImg,
    category: 'gaming',
    description: 'Mechanical precision meets RGB brilliance. AI-driven key optimization for your gaming style.',
    features: [
      'Mechanical Switches',
      'RGB Customization',
      'AI Key Mapping',
      'Anti-Ghosting Tech'
    ],
    aiGenerated: true,
    rating: 4.7,
    reviews: 312,
    inStock: true
  },
  {
    id: 4,
    name: 'Echo Sphere Speaker',
    price: 349,
    image: speakerImg,
    category: 'audio',
    description: '360° immersive sound with AI room adaptation for perfect acoustics anywhere.',
    features: [
      '360° Sound Field',
      'Room Adaptation AI',
      'Voice Assistant',
      'Premium Materials'
    ],
    aiGenerated: true,
    rating: 4.6,
    reviews: 156,
    inStock: true
  },
  {
    id: 5,
    name: 'Holograph Phone X',
    price: 999,
    image: phoneImg,
    category: 'smart',
    description: 'The future of mobile technology with holographic display and AI assistant integration.',
    features: [
      'Holographic Interface',
      'AI Personal Assistant',
      '5G Connectivity',
      'Quantum Processor'
    ],
    aiGenerated: true,
    rating: 4.9,
    reviews: 423,
    inStock: true
  },
  {
    id: 6,
    name: 'Vision VR Headset',
    price: 699,
    image: vrImg,
    category: 'vr',
    description: 'Step into the metaverse with our most advanced VR system featuring eye-tracking and haptic feedback.',
    features: [
      'Eye Tracking',
      'Haptic Feedback',
      '4K Per Eye',
      'Wireless Freedom'
    ],
    aiGenerated: true,
    rating: 4.8,
    reviews: 267,
    inStock: true
  }
];

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'audio', label: 'Audio' },
  { id: 'wearable', label: 'Wearables' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'smart', label: 'Smart Devices' },
  { id: 'vr', label: 'Virtual Reality' }
];
