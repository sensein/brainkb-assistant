# BrainKB Assistant Enhanced Styling Examples

## 🎨 New Features in v1.0.6

### ✅ Fixed Issues:
- **Z-index**: Now uses `z-index: 999999` to ensure visibility
- **Positioning**: Always defaults to bottom-right for better visibility
- **Color Contrast**: Enhanced color options with fallbacks
- **CSS Conflicts**: Added `!important` declarations to override site CSS

### 🚀 New Styling Options:

## Basic Configuration with Enhanced Styling

```typescript
import BrainKBAssistant from 'brainkb-assistant';

const config = {
  branding: {
    title: 'BrainKB Assistant',
    subtitle: 'Knowledge Helper',
    primaryColor: 'from-purple-600 to-blue-600'
  },
  ui: {
    position: 'bottom-right', // Always defaults to bottom-right
    zIndex: 999999, // Much higher z-index
    styling: {
      // Button styling
      buttonColor: 'from-blue-600 to-purple-600',
      buttonHoverColor: 'from-blue-700 to-purple-700',
      
      // Chat window styling
      chatBackground: 'bg-white',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200',
      shadowColor: 'shadow-lg',
      
      // Force positioning to override site CSS
      forcePosition: false,
      
      // Custom CSS classes
      customClasses: {
        container: 'my-custom-container',
        button: 'my-custom-button',
        chat: 'my-custom-chat',
        header: 'my-custom-header'
      }
    }
  },
  features: {
    enableQuickActions: true,
    enableFileUpload: true,
    enableContextDetection: true,
    enableMarkdown: true
  },
  customization: {
    welcomeMessage: 'Hello and welcome to BrainKB Assistant! 👋',
    placeholderText: 'Ask about Knowledge Graph or anything',
    errorMessage: 'Sorry, I encountered an error. Please try again.',
    loadingMessage: 'Thinking...'
  }
};

export default function MyApp() {
  return <BrainKBAssistant config={config} />;
}
```

## High Contrast Mode for Better Visibility

```typescript
const highContrastConfig = {
  ui: {
    position: 'bottom-right',
    zIndex: 999999,
    styling: {
      buttonColor: 'from-gray-800 to-gray-900',
      chatBackground: 'bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-white',
      shadowColor: 'shadow-2xl',
      customClasses: {
        button: 'brainkb-assistant-high-contrast',
        chat: 'brainkb-assistant-high-contrast'
      }
    }
  }
};
```

## Custom Color Schemes

### Purple Theme
```typescript
const purpleConfig = {
  ui: {
    styling: {
      buttonColor: 'from-purple-500 to-purple-700',
      chatBackground: 'bg-purple-50',
      textColor: 'text-purple-900',
      borderColor: 'border-purple-200'
    }
  }
};
```

### Green Theme
```typescript
const greenConfig = {
  ui: {
    styling: {
      buttonColor: 'from-green-500 to-green-700',
      chatBackground: 'bg-green-50',
      textColor: 'text-green-900',
      borderColor: 'border-green-200'
    }
  }
};
```

### Red Theme
```typescript
const redConfig = {
  ui: {
    styling: {
      buttonColor: 'from-red-500 to-red-700',
      chatBackground: 'bg-red-50',
      textColor: 'text-red-900',
      borderColor: 'border-red-200'
    }
  }
};
```

## Position Override Examples

### Force Top-Left Position
```typescript
const topLeftConfig = {
  ui: {
    position: 'top-left',
    styling: {
      forcePosition: true, // This will override the default bottom-right
      customClasses: {
        container: 'brainkb-assistant-top-left'
      }
    }
  }
};
```

### Force Bottom-Left Position
```typescript
const bottomLeftConfig = {
  ui: {
    position: 'bottom-left',
    styling: {
      forcePosition: true,
      customClasses: {
        container: 'brainkb-assistant-bottom-left'
      }
    }
  }
};
```

## Custom CSS Classes

```typescript
const customCSSConfig = {
  ui: {
    styling: {
      customClasses: {
        container: 'my-floating-chat-container',
        button: 'my-custom-floating-button',
        chat: 'my-custom-chat-window',
        header: 'my-custom-chat-header'
      }
    }
  }
};
```

## Responsive Design

The component automatically adapts to different screen sizes:

- **Desktop**: Full size chat window
- **Mobile**: Responsive width with touch-friendly buttons
- **Tablet**: Optimized layout for medium screens

## CSS Override Examples

### Custom CSS for Better Visibility
```css
/* Override site CSS to ensure visibility */
.my-custom-floating-button {
  position: fixed !important;
  z-index: 999999 !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
}

.my-custom-chat-window {
  background: white !important;
  border: 2px solid #e5e7eb !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}
```

## Troubleshooting

### If the button is not visible:

1. **Check z-index**: Ensure no other elements have higher z-index
2. **Check positioning**: Verify the position is set correctly
3. **Check CSS conflicts**: Use `forcePosition: true` to override site CSS
4. **Check color contrast**: Use high contrast mode if needed

### If colors are not visible on certain websites:

1. **Use high contrast mode**:
```typescript
const config = {
  ui: {
    styling: {
      customClasses: {
        button: 'brainkb-assistant-high-contrast',
        chat: 'brainkb-assistant-high-contrast'
      }
    }
  }
};
```

2. **Use custom colors with better contrast**:
```typescript
const config = {
  ui: {
    styling: {
      buttonColor: 'from-black to-gray-800',
      chatBackground: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-black'
    }
  }
};
```

## Migration from v1.0.5

If you're upgrading from the previous version, the new styling options are backward compatible. Your existing configuration will continue to work, but you can now add the enhanced styling options:

```typescript
// Old config (still works)
const oldConfig = {
  ui: {
    position: 'bottom-right',
    zIndex: 9999
  }
};

// New config with enhanced styling
const newConfig = {
  ui: {
    position: 'bottom-right',
    zIndex: 999999, // Higher z-index
    styling: {
      buttonColor: 'from-blue-600 to-purple-600',
      forcePosition: false,
      customClasses: {
        container: 'brainkb-assistant-container'
      }
    }
  }
};
```

## Best Practices

1. **Always use high z-index**: `zIndex: 999999`
2. **Default to bottom-right**: Best visibility across websites
3. **Use high contrast for dark sites**: `brainkb-assistant-high-contrast`
4. **Test on different backgrounds**: Ensure colors are visible
5. **Use custom CSS for complex sites**: Override conflicting styles

The enhanced styling options ensure the BrainKB Assistant is always visible and properly positioned on any website! 🚀 