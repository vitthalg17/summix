# Summix - AI-Powered PDF Summarization

A modern web application that transforms PDF documents into clear, actionable insights using AI-powered summarization.

## Features

- 🚀 AI-powered PDF analysis and summarization
- 📄 Upload and process PDF documents up to 8MB
- 💡 Extract key insights and important information
- 🎯 Smart, structured summaries with bullet points
- 📱 Responsive design for all devices
- 🔐 Secure user authentication with Clerk
- 📊 Usage tracking and limits
- 💾 Save and manage your summaries

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Authentication**: Clerk
- **AI/LLM**: OpenAI GPT, Google Gemini, DeepSeek
- **Database**: SQLite
- **File Upload**: UploadThing
- **PDF Processing**: pdf-parse
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Clerk account for authentication
- UploadThing account for file uploads

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/summix.git
cd summix
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `OPENAI_API_KEY` - Your OpenAI API key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `UPLOADTHING_SECRET` - UploadThing secret
- `UPLOADTHING_APP_ID` - UploadThing app ID

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
summix/
├── app/                    # Next.js app directory
│   ├── (logged-in)/       # Protected routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── summaries/        # Summary-related components
│   ├── common/           # Shared components
│   ├── home/             # Landing page components
│   ├── ui/               # UI components
│   └── upload/           # Upload functionality
├── lib/                  # Utility libraries
├── utils/                # Helper functions
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Built by [Vitthal Goel](https://vitthalgoel.com)
