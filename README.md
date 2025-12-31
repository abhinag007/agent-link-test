# TravelBot AI - Travel Agent Frontend

A modern, beautiful AI-powered travel assistant built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🤖 Intelligent Chat Interface
- Real-time conversational AI travel assistant
- Context-aware responses based on user queries
- Smart suggestion chips for quick interactions
- Typing indicators for better UX

### 🎨 Modern UI/UX
- Beautiful gradient design with blue and purple theme
- Responsive layout that works on all devices
- Smooth animations and transitions
- Clean, intuitive interface

### ✈️ Travel-Specific Features
- **Quick Actions Sidebar**: One-click access to common travel queries
  - Beach vacations
  - City tours
  - Adventure trips
  - Budget travel options

- **Popular Destinations**: Quick view of trending destinations with pricing
- **Travel Tips**: Helpful advice for travelers
- **24/7 Support Indicator**: Always available assistance

### 💬 Chat Features
- Message history with timestamps
- User and bot message differentiation
- Contextual suggestion buttons
- Smooth auto-scrolling to latest messages

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd agent-link-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
agent-link-test/
├── app/
│   ├── page.tsx          # Main chat interface component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind imports
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Key Components

### Main Chat Interface (`app/page.tsx`)
- **Message State Management**: Handles chat messages with TypeScript interfaces
- **Bot Response Logic**: Context-aware responses based on user input
- **Suggestion System**: Dynamic suggestion chips based on conversation context
- **Responsive Design**: Sidebar hidden on mobile, visible on desktop

### Features Breakdown

#### Sidebar (Desktop Only)
- **Quick Actions**: Pre-defined travel queries
- **Popular Destinations**: Trending locations with pricing
- **Travel Tips**: Helpful travel advice

#### Chat Area
- **Header**: Shows bot status and support availability
- **Messages**: Scrollable message history
- **Input**: Text input with send button

## Customization

### Adding New Bot Responses
Edit the `getBotResponse()` function in `app/page.tsx`:

```typescript
const getBotResponse = (userText: string): string => {
  // Add your custom logic here
  if (userText.includes('your-keyword')) {
    return "Your custom response";
  }
  // ...
}
```

### Modifying Suggestions
Edit the `getContextualSuggestions()` function:

```typescript
const getContextualSuggestions = (userText: string): string[] => {
  // Return array of suggestion strings
  return ['Suggestion 1', 'Suggestion 2'];
}
```

### Styling
The project uses Tailwind CSS. Modify classes directly in the JSX or update `globals.css` for global styles.

## Future Enhancements

- [ ] Integration with real AI backend (OpenAI, Anthropic, etc.)
- [ ] Real-time flight and hotel search
- [ ] User authentication and saved trips
- [ ] Booking functionality
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Image generation for destinations
- [ ] Calendar integration
- [ ] Price alerts and notifications

## Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email your-email@example.com or open an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
