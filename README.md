# MentoLoop - NP Student & Preceptor Platform

A modern, responsive single-page application that connects nurse practitioner students with experienced preceptors through smart matching and mentorship-first approach.

## 🌟 Features

- **Smart Matching**: MentorFit™ algorithm pairs students and preceptors based on compatibility
- **Responsive Design**: Mobile-first design with beautiful healthcare aesthetic
- **Real-time Form Validation**: Comprehensive validation with user-friendly error messages
- **Email Integration**: Automated welcome emails via SendGrid
- **Database Integration**: Supabase backend with secure data handling
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, Vite

## 🚀 Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Email Service**: SendGrid
- **Form Handling**: React Hook Form + Zod validation
- **Build Tool**: Vite
- **Hosting**: Netlify
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/apex-ai-net/Mentoloop-Waitlist
   cd mentoloop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_SENDGRID_API_KEY=your_sendgrid_api_key
   VITE_SENDGRID_FROM_EMAIL=noreply@mentoloop.com
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL schema from `database.sql` in your Supabase SQL editor
   - Update your environment variables with the Supabase credentials

5. **Configure SendGrid**
   - Create a SendGrid account and get an API key
   - Add your API key to the environment variables
   - Verify your sender email address in SendGrid

6. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Hero section with CTA
│   ├── About.tsx         # About section with features
│   ├── WaitlistForm.tsx  # Waitlist signup form
│   └── Footer.tsx        # Footer component
├── services/
│   ├── supabase.ts       # Supabase client and functions
│   └── sendgrid.ts       # SendGrid email service
├── types/
│   └── index.ts          # TypeScript type definitions
├── utils/
│   └── validation.ts     # Form validation schemas
├── styles/
│   └── globals.css       # Global styles and Tailwind
├── App.tsx               # Main app component
└── main.tsx              # App entry point
```

## 🎨 Design System

### Colors
- **Primary**: Professional healthcare blue (#2563EB)
- **Secondary**: Trust-building green (#059669)
- **Accent**: Warm orange for CTAs (#EA580C)
- **Neutrals**: Clean grays and whites

### Typography
- **Headers**: Poppins (modern, professional)
- **Body**: Inter (readable, clean)

### Components
- Consistent spacing using Tailwind utilities
- Smooth animations and transitions
- Accessible form elements with proper focus states
- Mobile-first responsive design

## 📱 Responsive Design

- **Mobile**: < 768px - Single column, touch-friendly
- **Tablet**: 768px - 1024px - Two-column layouts
- **Desktop**: > 1024px - Full multi-column layouts

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `database.sql`
3. Configure Row Level Security policies
4. Add your project URL and anon key to `.env`

### SendGrid Setup
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key
3. Verify your sender email
4. Add credentials to `.env`

### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy automatically on push

## 🧪 Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Form Validation
- Real-time validation using Zod schemas
- User-friendly error messages
- Email format validation
- Required field handling

### API Integration
- Automatic retry logic for failed requests
- Graceful error handling
- Loading states for better UX
- Success/error feedback

## 🚀 Deployment

### Netlify (Recommended)
1. Push to your Git repository
2. Connect repository to Netlify
3. Set environment variables
4. Deploy automatically

### Manual Deployment
1. Run `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure redirects for SPA routing

## 🔒 Security

- Input sanitization and validation
- XSS protection headers
- CSRF protection via Supabase RLS
- Rate limiting considerations
- Secure environment variable handling

## 📊 Analytics & Monitoring

The application is set up to easily integrate with:
- Google Analytics
- Hotjar for user behavior
- Sentry for error monitoring
- PostHog for product analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

[Add your license information here]

## 📞 Support

For questions or support, contact [hello@mentoloop.com](mailto:hello@mentoloop.com)

---

Built with ❤️ for the nursing education community