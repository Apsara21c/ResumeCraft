# Resume Builder - Design Guidelines

## Design Approach
**Aesthetic Direction**: Modern Glassmorphic Design System
The design draws inspiration from productivity tools like Notion and Linear, combined with the sleek glass aesthetics of Apple's design language. This creates a sophisticated, professional resume builder that feels both modern and trustworthy.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Background: 240 20% 98% (soft off-white)
- Glass Surface: 0 0% 100% with 60% opacity and backdrop blur
- Primary: 250 85% 65% (vibrant purple-blue)
- Primary Accent: 210 100% 60% (electric blue for glows)
- Text Primary: 240 10% 20%
- Text Secondary: 240 5% 45%

**Dark Mode:**
- Background: 240 15% 8% (deep slate)
- Glass Surface: 240 10% 15% with 40% opacity and backdrop blur
- Primary: 250 75% 70% (lighter purple-blue)
- Primary Accent: 210 90% 65% (bright blue for glows)
- Text Primary: 240 5% 95%
- Text Secondary: 240 5% 70%

**Gradient Accents:**
- Hero Gradient: from 250 85% 65% to 210 100% 60%
- Card Hover Gradient: from 250 70% 70% to 280 80% 75%

### B. Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Inter 700-900 (Extra Bold to Black)
  - H1: text-5xl md:text-7xl font-black
  - H2: text-3xl md:text-5xl font-bold
  - H3: text-xl md:text-2xl font-semibold
- **Body**: Inter 400-500 (Regular to Medium)
  - Base: text-base md:text-lg
  - Small: text-sm

### C. Layout System
**Spacing Units**: Use 4, 8, 12, 16, 24, 32 (p-4, p-8, p-12, etc.)
- Section Padding: py-16 md:py-24
- Card Padding: p-6 md:p-8
- Component Gap: gap-4 md:gap-6
- Container: max-w-7xl mx-auto px-4

### D. Glassmorphic Effects
**Glass Card Base:**
- Background: rgba with 60-80% opacity (light) / 30-40% opacity (dark)
- Backdrop Filter: blur(12px) to blur(20px)
- Border: 1px solid with 20% white/black
- Shadow: 0 8px 32px rgba(0,0,0,0.1)

**Glow Effects:**
- Primary Button Glow: box-shadow with 20px blur and primary color at 40% opacity
- Active Card Glow: Subtle gradient border with 0 0 20px glow
- Hover State: Increase blur to 24px, boost opacity by 10%

## Component Library

### Navigation Bar
- Fixed position with glassmorphic background
- Height: h-16 md:h-20
- Logo left, nav links center, theme toggle + CTA right
- Smooth scroll behavior to sections
- Mobile: Hamburger menu with slide-in glass panel

### Hero Section
- Full viewport height (min-h-screen)
- Centered content with animated gradient background
- Headline: Large, bold with gradient text effect
- Tagline: text-xl with subtle opacity
- CTA Button: Large (px-8 py-4) with animated glow effect on hover
- Background: Animated gradient mesh or abstract shapes

### Authentication Pages (Login/Signup)
- Centered glass card (max-w-md)
- Input fields with glass styling and focus glow animations
- Label floats up on focus (Framer Motion)
- Password strength indicator with color transitions
- Social login buttons with icon + text
- Smooth transition between login/signup forms

### Dashboard Layout
- Two-column layout on desktop (8/12 and 4/12)
- Left: Interactive cards grid (grid-cols-1 md:grid-cols-2)
- Right: Sticky resume preview panel
- Mobile: Stack vertically with preview accessible via floating button

### Dashboard Cards (Courses, Internships, Projects, Hackathons)
- Glass card with hover lift effect (translate-y-2)
- Icon at top (large, colored)
- Title and description
- "Add" button (primary) and "Edit" button (outline) at bottom
- Hover: Enhanced glow, slight scale (scale-105)

### Modal Design
- Full-screen overlay with backdrop blur
- Centered glass modal (max-w-2xl)
- Close button (top-right) with icon
- Form fields with glass styling
- Save/Cancel buttons at bottom
- Enter animation: Scale up from center with fade-in

### Resume Preview Panel
- Sticky position (top-24)
- Professional resume layout with clear sections
- Real-time updates with subtle fade transitions
- Download button at top (glass style)
- Professional typography and spacing

### Footer
- Glass panel at bottom
- Three columns on desktop: Links, Contact, Social
- Social icons: Minimal, monochrome with hover color
- Copyright text center-bottom

## Animations & Interactions

### Page Transitions (Framer Motion)
- Route changes: Fade + slide up (duration: 0.3s)
- Section reveals: Fade in on scroll with stagger

### Micro-Interactions
- Buttons: Scale(0.98) on press, glow on hover
- Input Focus: Border glow animation (0.2s ease)
- Card Hover: Lift + glow (0.3s ease-out)
- Modal: Scale(0.95 to 1) + fade (0.3s)
- Toggle Switch: Smooth slide with color transition

### Scroll Animations
- Hero CTA: Smooth scroll to dashboard/login
- Section reveals: Fade in when 20% visible
- Parallax: Subtle background movement in hero

## Dark/Light Mode Toggle
- Icon button in navigation (sun/moon)
- Smooth color transitions (0.3s ease)
- Persistent user preference (localStorage)
- All components adapt colors dynamically

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (adaptive two-column)
- Desktop: > 1024px (full layout with sidebar)

## Images
**Hero Section**: Abstract gradient background with floating geometric shapes or a soft-focus image of a professional workspace. Overlay with glass effect to maintain legibility. Image should be subtle and not distract from the call-to-action.

**No large hero images needed** - the design relies on gradients, glass effects, and animations for visual impact rather than photography.