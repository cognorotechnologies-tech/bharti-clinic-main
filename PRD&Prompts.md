🌸
BHARTI CLINIC
Heal Naturally. Live Beautifully.
PRODUCT REQUIREMENTS DOCUMENT
Full-Stack Ayurvedic Wellness Platform
with E-Commerce, Admin Portal & AI-Powered Design

Version	1.0.0
Date	February 2026
Status	Ready for Development
Client	Bharti Clinic (bhartiveda.com)
Toolkit	Antigravity Kit (vudovn/antigravity-kit)
 
1. Executive Summary

Bharti Clinic is a premier Ayurvedic wellness centre offering traditional therapies, herbal products, and holistic healing programs rooted in ancient Indian medicine. The clinic currently operates a basic informational website at bhartiveda.com and wishes to transform this into a world-class digital wellness platform.
This PRD defines the full requirements for building a stunning, full-stack web application that includes an animated public-facing website, a complete e-commerce store for Ayurvedic products, a therapy booking system, a rich media gallery, and a powerful admin portal for managing all operations.
The entire project will be built using the Antigravity Kit (by vudovn) — a curated collection of 20 AI specialist agents, 37 domain-specific skills, and 11 slash-command workflows — running inside an AI-powered editor such as Cursor or Windsurf. This ensures every phase of development is guided by expert-level AI assistance for architecture, UI/UX, backend, security, testing, and deployment.

Project Vision
"To create an immersive digital sanctuary that mirrors the serene, healing ambience of Bharti Clinic — where every scroll feels like a breath of fresh, herb-scented air, and every click brings a patient closer to their wellness journey."

 
2. Project Metadata & Tech Stack

2.1 Technology Stack
Layer	Technology	Purpose
Frontend	React 18 + TypeScript + Vite	Component-based SPA with type safety & fast HMR
Styling	TailwindCSS + Framer Motion	Utility-first CSS + silky animations
Icons	Lucide React + React Icons	Consistent, beautiful icon system
Backend	Node.js + Express.js	RESTful API server with middleware support
Database	PostgreSQL + Prisma ORM	Relational DB with type-safe schema & migrations
Auth	JWT + bcryptjs	Secure token-based authentication for admin
File Storage	Multer + Local/S3	Image & video upload handling
State Mgmt	React Context + useReducer	Cart, auth, and UI state management
Routing	React Router v6	Client-side page navigation
HTTP Client	Axios + React Query	API calls with caching & loading states
Dev Toolkit	Antigravity Kit (vudovn/ag-kit)	20 agents, 37 skills, 11 workflows
AI Editor	Cursor or Windsurf IDE	AI-powered development environment

2.2 Antigravity Kit Setup
Before writing a single line of code, initialise the Antigravity Kit in the project root. This installs the .agent/ folder containing all agents, skills, and workflow slash commands.
# Step 1: Initialise Antigravity Kit
npx @vudovn/ag-kit init

# Step 2: Keep .agent/ indexed by AI editor (do NOT .gitignore it)
echo ".agent/" >> .git/info/exclude

# Step 3: Open in Cursor or Windsurf and verify slash commands appear
ag-kit status

2.3 Available Antigravity Workflows
Slash Command	When to Use It
/brainstorm	Before any new feature — explore architecture options first
/plan	Break a large task (e.g., admin portal) into sequential steps
/create	Scaffold new components, pages, APIs, or database schemas
/ui-ux-pro-max	Design hero sections, cards, animations, and landing pages
/enhance	Refactor existing code, add types, improve performance
/debug	Systematic debugging of API errors, UI glitches, DB issues
/test	Generate unit tests, integration tests, E2E test scenarios
/deploy	Set up CI/CD, environment configs, and production deployment
/preview	Preview changes locally before committing
/status	Get a summary of current project progress
/orchestrate	Coordinate multiple agents for complex multi-domain tasks

 
3. Design System & Visual Identity

3.1 Colour Palette — Lotus Pink & Ivory White
Token	Hex	Usage
--color-ivory	#FFFDF7	Primary page background — warm, creamy white
--color-lotus-light	#FAE8EE	Section backgrounds, card fills, subtle tints
--color-lotus	#E8A0A0	Primary accent — borders, highlights, icons
--color-lotus-deep	#C0686D	Secondary accent — hover states, links
--color-rose-dark	#B5476A	Headings, primary CTA buttons, logo text
--color-maroon	#7A2040	Sub-headings, footer, premium labels
--color-gold	#D4A847	Offer badges, star ratings, premium sparkle
--color-charcoal	#2D2D2D	Body text — never pure black for softness
--color-muted	#888888	Captions, metadata, secondary text
--color-white	#FFFFFF	Cards, modals, input fields

3.2 Typography
Role	Font Family	Weight	Usage
Display	Playfair Display	700 Bold	Hero headlines, section titles
Headings	Georgia / Playfair Display	600 SemiBold	Page & card headings
Body	DM Sans	400 Regular	Paragraphs, descriptions, UI labels
Accent	Cormorant Garamond	400 Italic	Quotes, testimonials, poetry-feel text
Mono	JetBrains Mono	400	Admin code blocks, order IDs, SKUs

3.3 Animation & Motion Language
All animations use Framer Motion. The motion language is inspired by Ayurvedic rhythms — slow, intentional, and deeply calming.
Element	Animation Type	Duration	Effect
Hero Petals	Canvas particle system	Infinite loop	Lotus petals drift gently across hero
Hero Headline	Fade up + typewriter	1.2s ease-out	Words appear letter by letter
Hero CTA Button	Breathing pulse scale	Infinite 2s	Subtle scale 1.0 → 1.04 → 1.0
Section Entries	Fade up on scroll	0.6s staggered	Elements slide in as user scrolls
Product Cards	Scale + shadow lift	0.3s ease	Card lifts on hover like a held leaf
Mandala BG	Slow rotation	Infinite 60s	Background mandala rotates slowly
Therapy Cards	Parallax scroll	Tied to scroll	Background image moves at different rate
Nav	Glass blur on scroll	0.3s	Navbar becomes frosted glass on scroll
Page Transitions	Cross-fade	0.4s	Smooth fade between route changes
Counter Numbers	Count-up animation	2s ease-out	Stats count up when they enter viewport

 
4. Information Architecture & Site Map

4.1 Public Website Routes
Route	Page Name	Key Sections
/	Homepage	Hero, Trust Bar, About Snippet, Therapies Preview, Products Preview, Testimonials, Gallery Teaser, Booking CTA, Footer
/about	About Us	Clinic Story, Dr. Bharti Profile, Team, Timeline, Certifications
/therapies	All Therapies	Therapy category grid with filters
/therapies/:slug	Therapy Detail	Description, Benefits, Duration, Price, Book Now
/packages	Wellness Packages	Bundle cards with savings, timelines, Book Now
/shop	Product Store	Filters, Product grid, Sorting
/shop/:slug	Product Detail	Images, Description, Reviews, Add to Cart
/cart	Shopping Cart	Cart items, Quantity editor, Order summary
/checkout	Checkout	Address, Payment, Order Review, Confirm
/order-confirmed	Order Confirmed	Thank you, Order ID, Summary
/gallery	Gallery	Photo tab, Video tab, Category filter, Lightbox
/blog	Wellness Blog	Article cards with categories
/blog/:slug	Article Detail	Full article with related posts
/appointments	Book Appointment	Booking form, Therapy selector, Date/Time picker
/contact	Contact	Map, Address, Phone, WhatsApp, Contact form

4.2 Admin Portal Routes
Route	Module	Capabilities
/admin/login	Auth Gate	Secure login with JWT, rate limiting
/admin/dashboard	Dashboard	Stats overview, alerts, quick actions, recent activity
/admin/products	Product Manager	CRUD products, bulk edit, image upload, stock toggle
/admin/inventory	Inventory	Stock levels, low-stock alerts, restock logging
/admin/therapies	Therapy Manager	CRUD therapies, set prices, apply discounts
/admin/packages	Package Manager	Create bundles, expiry dates, coupon codes
/admin/orders	Order Manager	View/filter orders, update status, customer details
/admin/appointments	Appointment Manager	Confirm/cancel bookings, calendar view, filters
/admin/gallery	Gallery Manager	Upload photos/videos, organise categories, delete
/admin/testimonials	Reviews Manager	Approve, reject, delete patient reviews
/admin/blog	Blog Manager	Create/edit/publish posts, rich text editor
/admin/settings	Site Settings	Clinic info, banners, announcements, SEO

 
5. Detailed Feature Specifications

5.1 Homepage — Hero Section (HIGH IMPACT)
This is the single most important screen. It must immediately convey trust, beauty, and healing. The experience should feel like opening your eyes in a lush forest spa at dawn.
Feature	Specification
Background	Full-viewport gradient: deep rose (top-left) → warm ivory (bottom-right) with a subtle bokeh circle overlay
AI Hero Illustration	CSS/SVG rendered botanical scene — lotus pond, soft mist, sun rays, neem leaves — no stock photos
Particle System	60–80 floating lotus petals rendered on HTML Canvas, drifting with physics-like gravity and gentle spin
Headline	Playfair Display 72px: "Heal Naturally. Live Beautifully." — typewriter animation on load
Sub-headline	"Ancient Ayurvedic wisdom, reimagined for modern living. Your journey to wholeness starts here."
CTA Buttons	Primary: "Book a Consultation" (lotus pink, breathing pulse) | Secondary: "Explore Therapies" (outlined)
Scroll Indicator	Animated lotus petal bouncing gently at bottom of hero
Mandala	50% opacity rotating mandala behind main content as atmospheric depth layer
Responsive	Full-screen on desktop, 90vh on tablet, 85vh on mobile with re-stacked layout

5.2 E-Commerce — Product Store
Feature	Specification
Product Categories	Oils & Ghee, Herbal Powders, Capsules & Tablets, Skincare, Teas & Kashayam, Chyawanprash
Product Card	Image, Name, Category badge, Star rating, Price, "Add to Cart" button with bounce animation on click
Filters	Category, Price range slider, Rating filter, In-stock toggle, Sort by (Popular/Price/Newest)
Product Detail	Image gallery (zoom), Full description, Ingredients list, How to use, Customer reviews, Related products
Cart	Slide-in drawer cart, Quantity +/-, Remove item, Running total, "Proceed to Checkout" CTA
Checkout	Multi-step form: Contact → Shipping → Payment method → Review → Confirm
Inventory	Real-time stock display, "Only X left" badge when stock < 10, "Out of Stock" state with notify button
Admin Control	Price edit, Stock quantity, Product visibility toggle, Featured product pin, Image management

5.3 Therapies & Packages
Bharti Clinic offers authentic Panchakarma and allied Ayurvedic therapies. Each therapy must be presented with care and depth — not just a price list, but a journey description.
Therapy	Description
Panchakarma	5-fold detox program: Vamana, Virechana, Basti, Nasya, Raktamokshana — 7/14/21-day programs
Shirodhara	Continuous warm oil stream on forehead for deep mental relaxation and stress relief
Abhyanga	Full-body warm medicated oil massage — 60 or 90 min sessions
Nasya	Nasal cleansing therapy using medicated oils for sinus, headaches, and clarity
Kizhi (Pinda Sweda)	Herbal poultice massage with heated boluses for joint pain and stiffness
Udvartana	Herbal powder massage for weight loss, skin brightening, and lymphatic drainage
Netra Tarpana	Eye rejuvenation therapy with pure ghee — for screen fatigue and eye health
Kati Basti	Warm medicated oil pool on lower back for lumbar pain and disc issues

Package Feature	Specification
Package Types	Detox Reset (7 days), Deep Rejuvenation (14 days), Stress Buster Bundle, Weight Management Program, Skin Glow Package
Pricing Display	Original price crossed out, discounted price prominent, savings badge ("Save ₹2,400"), per-session breakdown
Urgency Elements	"Limited slots available", expiry countdown timer if offer has end date, "X people booked this week"
Admin Controls	Set base price, apply % or flat discount, set offer start/end date, toggle visibility, add/remove therapies from bundle

5.4 Gallery Module
Feature	Specification
Photos Tab	Masonry grid layout, category filter pills (Clinic, Therapies, Events, Before-After), hover overlay with expand icon
Lightbox	Full-screen image view with prev/next navigation, caption display, download option, keyboard support
Videos Tab	Thumbnail grid with play button overlay, embedded YouTube OR direct video player, category filter
Categories	Clinic Interior, Therapy Sessions, Team & Doctors, Patient Moments, Events & Camps, Product Showcase
Admin Upload	Drag-and-drop uploader, bulk upload, auto-thumbnail generation, category assignment, caption editor
Access Control	Gallery is public read-only. All uploads, edits, and deletes require admin authentication.

5.5 Admin Portal — Full Specification
The admin portal is a private, password-protected dashboard accessible only to authorised clinic staff. It provides complete operational control over every aspect of the website.
Module	Features
Dashboard	KPI cards (Revenue today/week/month, Orders pending, Appointments today, Low stock count), Recent orders table, Upcoming appointments list, Activity feed, Quick action buttons
Product Manager	Data table with search/filter, Add product form (name, description, price, category, images, stock), Inline price edit, Stock quantity stepper, Visibility toggle, Bulk actions (delete, feature)
Inventory Manager	Stock level per product, Set low-stock threshold (default: 10), Color-coded alerts (red <5, orange <10, green ≥10), Restock entry form with supplier note, Stock history log
Therapy Manager	Add/edit/delete therapies, Rich text description editor, Set duration, Set base price, Apply discount (% or flat), Set discount expiry date, Toggle "Featured" and "Active" status
Package Manager	Create bundle from existing therapies, Set package name & description, Set total price, Apply coupon codes, Set validity period, Toggle visibility
Order Manager	Orders list with status filter (Pending/Confirmed/Shipped/Delivered/Cancelled), Order detail view, Update status dropdown, Customer contact info, Items ordered with pricing
Appointment Manager	Calendar view + list view, Filter by therapy/date/status, Confirm or Cancel with note, Contact patient button (WhatsApp link), Export to CSV
Gallery Manager	Media grid with type indicator (photo/video), Drag-and-drop uploader supporting JPG/PNG/MP4/WebM, Category assignment, Caption editor, Delete with confirmation
Review Manager	Review moderation queue, Approve/Reject toggle, Patient name and star rating, Reply from clinic option, Delete permanently
Blog Manager	Rich text editor (Quill or TipTap), Category tags, SEO meta fields (title, description, slug), Draft/Published toggle, Featured image upload
Settings	Clinic name, address, phone, email, WhatsApp number, Working hours, Homepage hero text, Announcement bar (text + color + active toggle), Social media links, Google Maps embed code

 
6. Database Schema (PostgreSQL + Prisma)

The following tables form the core of the Bharti Clinic database. All tables include createdAt and updatedAt timestamps by default via Prisma.
Table	Key Fields	Relationships
users	id, email, passwordHash, role (ADMIN/STAFF), name, lastLogin	Owns orders, appointments (admin)
products	id, name, slug, description, price, comparePrice, stock, categoryId, imageUrls[], isActive, isFeatured	belongs to category, has reviews, in order_items
categories	id, name, slug, type (PRODUCT/THERAPY), imageUrl	has many products & therapies
therapies	id, name, slug, description, duration (mins), basePrice, discountedPrice, discountExpiry, isActive, isFeatured, categoryId, imageUrl	in packages, booked in appointments
packages	id, name, slug, description, totalPrice, originalPrice, validFrom, validTo, couponCode, isActive	has many therapies (via package_therapies join)
orders	id, userId, status, totalAmount, shippingAddress (JSON), paymentMethod, paymentStatus, notes	has many order_items
order_items	id, orderId, productId, quantity, priceAtPurchase	belongs to order & product
appointments	id, patientName, phone, email, therapyId, preferredDate, preferredTime, status, notes	belongs to therapy
gallery_items	id, type (PHOTO/VIDEO), url, thumbnailUrl, category, caption, sortOrder, isActive	standalone
reviews	id, productId, patientName, rating, comment, status (PENDING/APPROVED/REJECTED)	belongs to product
blog_posts	id, title, slug, content, excerpt, imageUrl, tags[], status (DRAFT/PUBLISHED), authorId, publishedAt	belongs to user
settings	key (unique), value, type (STRING/JSON/BOOLEAN)	key-value store for site config
inventory_logs	id, productId, changeAmount, newStock, reason, adminId, createdAt	belongs to product & user

 
7. API Endpoint Specification

7.1 Public API (No Auth Required)
Method	Endpoint	Description
GET	/api/products	List products with filters (category, price, sort, page)
GET	/api/products/:slug	Get single product with reviews
GET	/api/categories	List all categories
GET	/api/therapies	List therapies with optional category filter
GET	/api/therapies/:slug	Get single therapy detail
GET	/api/packages	List wellness packages
GET	/api/gallery	List gallery items with type/category filter
GET	/api/reviews/:productId	Get approved reviews for a product
GET	/api/blog	List published blog posts
GET	/api/blog/:slug	Get single blog post
POST	/api/orders	Create a new order (cart checkout)
POST	/api/appointments	Book an appointment
POST	/api/reviews	Submit a product review (pending approval)
POST	/api/contact	Send a contact message (email trigger)
GET	/api/settings/public	Get public site settings (name, hours, socials, announcements)

7.2 Admin API (JWT Auth Required)
Method	Endpoint	Description
POST	/api/admin/login	Admin login, returns JWT
GET	/api/admin/dashboard	Dashboard stats (revenue, orders, appointments, stock alerts)
POST/PUT/DELETE	/api/admin/products/:id	Create, update, delete product
PUT	/api/admin/products/:id/stock	Update stock quantity with log entry
POST/PUT/DELETE	/api/admin/therapies/:id	Manage therapies
POST/PUT/DELETE	/api/admin/packages/:id	Manage packages
GET/PUT	/api/admin/orders/:id	View and update order status
GET/PUT	/api/admin/appointments/:id	View and update appointment status
POST/DELETE	/api/admin/gallery	Upload or delete gallery items
PUT	/api/admin/reviews/:id/status	Approve, reject, or delete review
POST/PUT/DELETE	/api/admin/blog/:id	Manage blog posts
GET/PUT	/api/admin/settings	Get and update all site settings
GET	/api/admin/inventory/logs	View inventory change history

 
8. Sequential Build Prompts (Antigravity Kit)

The following prompts are designed to be run inside Cursor or Windsurf with the Antigravity Kit installed. Copy each prompt exactly into your AI chat. The prompts are ordered to respect dependencies — never skip ahead.

⚠️  IMPORTANT: Run npx @vudovn/ag-kit init in your project root before executing any prompt below. Ensure you are inside Cursor or Windsurf IDE for slash commands to work.

Phase 0 — Project Foundation
PROMPT 0.1: Project Scaffolding
/plan

Set up a full-stack monorepo project called "bharti-clinic" with the following structure:

FRONTEND:
- React 18 + TypeScript + Vite
- TailwindCSS with custom theme (Lotus Pink & Ivory White palette)
- React Router v6 for routing
- Framer Motion for animations
- Axios + React Query for API calls
- Lucide React for icons
- Folder structure: src/components, src/pages, src/hooks, src/context, src/types, src/api, src/assets

BACKEND:
- Node.js + Express.js + TypeScript
- Prisma ORM with PostgreSQL
- JWT authentication middleware
- Multer for file uploads
- Cors, Helmet, rate-limiter middleware
- Folder structure: src/routes, src/controllers, src/middleware, src/services, src/types

DATABASE:
- PostgreSQL
- Prisma schema with all tables defined in PRD Section 6

Create package.json for both frontend and backend with all dependencies.
Create a root-level package.json with "dev" script that starts both concurrently.
Create .env.example files for both frontend and backend.
Create a basic README.md with setup instructions.

PROMPT 0.2: Prisma Database Schema
/create

Create the complete Prisma schema (schema.prisma) for the Bharti Clinic platform.

Include all these models with proper relations, field types, and indexes:
1. User (id, email, passwordHash, name, role enum: ADMIN/STAFF, createdAt, updatedAt)
2. Category (id, name, slug, type enum: PRODUCT/THERAPY, imageUrl, createdAt)
3. Product (id, name, slug, description, price Decimal, comparePrice Decimal?, stock Int, categoryId, imageUrls String[], isActive, isFeatured, createdAt, updatedAt)
4. Therapy (id, name, slug, description, durationMinutes Int, basePrice Decimal, discountedPrice Decimal?, discountExpiry DateTime?, isActive, isFeatured, categoryId, imageUrl, createdAt, updatedAt)
5. Package (id, name, slug, description, totalPrice Decimal, originalPrice Decimal, validFrom DateTime?, validTo DateTime?, couponCode String?, isActive, therapies: Therapy[] via join table)
6. Order (id, patientName, phone, email, status enum: PENDING/CONFIRMED/SHIPPED/DELIVERED/CANCELLED, items Json, totalAmount Decimal, shippingAddress Json, paymentMethod String, paymentStatus enum: PENDING/PAID/FAILED, createdAt, updatedAt)
7. Appointment (id, patientName, phone, email, therapyId, preferredDate DateTime, preferredTime String, status enum: PENDING/CONFIRMED/CANCELLED, notes String?, createdAt)
8. GalleryItem (id, type enum: PHOTO/VIDEO, url, thumbnailUrl String?, category String, caption String?, sortOrder Int default 0, isActive Boolean default true, createdAt)
9. Review (id, productId, patientName, rating Int 1-5, comment String, status enum: PENDING/APPROVED/REJECTED, createdAt)
10. BlogPost (id, title, slug, content String, excerpt String, imageUrl String?, tags String[], status enum: DRAFT/PUBLISHED, authorId, publishedAt DateTime?, createdAt, updatedAt)
11. Setting (key String @unique, value String, type enum: STRING/JSON/BOOLEAN)
12. InventoryLog (id, productId, changeAmount Int, newStock Int, reason String, adminId, createdAt)

After creating schema, generate and run migration:
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed (create seed.ts with sample Ayurvedic products, therapies, categories, and admin user)

 
Phase 1 — Design System & Global Components
PROMPT 1.1: TailwindCSS Design System
/ui-ux-pro-max

Set up the Bharti Clinic design system in TailwindCSS.

In tailwind.config.ts, extend the theme with:

COLOURS (extend colors):
- ivory: { DEFAULT: '#FFFDF7', 50: '#FFFFFF', 100: '#FEFCF2' }
- lotus: { light: '#FAE8EE', DEFAULT: '#E8A0A0', deep: '#C0686D', dark: '#B5476A' }
- maroon: { DEFAULT: '#7A2040', light: '#9A3558' }
- gold: { DEFAULT: '#D4A847', light: '#E8C06A' }
- charcoal: { DEFAULT: '#2D2D2D', light: '#444444', muted: '#888888' }

FONTS (extend fontFamily):
- display: ['Playfair Display', 'Georgia', 'serif']
- body: ['DM Sans', 'sans-serif']
- accent: ['Cormorant Garamond', 'Georgia', 'serif']

ANIMATIONS (extend keyframes & animation):
- float: { 0%/100%: transform translateY(0px), 50%: transform translateY(-20px) }
- breathe: { 0%/100%: scale(1), 50%: scale(1.04) }
- rotate-slow: { from: rotate(0deg), to: rotate(360deg) }
- fade-up: { from: { opacity:0, transform: translateY(20px) }, to: { opacity:1, translateY(0) } }
- drift-left: { from: translateX(110vw), to: translateX(-10vw) }
- typewriter: character reveal animation

In index.css:
- Import Google Fonts: Playfair Display, DM Sans, Cormorant Garamond from Google Fonts CDN
- Set body background to ivory, font to DM Sans
- Custom scrollbar styling (thin, lotus pink thumb)
- Smooth scroll behaviour

PROMPT 1.2: Reusable UI Component Library
/create

Create a comprehensive set of reusable UI components for Bharti Clinic in src/components/ui/:

1. Button.tsx — variants: primary (lotus pink), secondary (outlined), ghost, gold; sizes: sm, md, lg; with loading spinner state and breathe animation on primary

2. Card.tsx — white card with lotus-pink shadow on hover, scale up 1.02 on hover, rounded-2xl, smooth transition

3. Badge.tsx — variants: category, discount (gold), new, out-of-stock, featured

4. Modal.tsx — centered overlay with backdrop blur, slide-up animation, close on backdrop click or Escape key

5. Input.tsx & Textarea.tsx — styled with ivory bg, lotus-pink focus ring, error state in red, label animation float up on focus

6. Select.tsx — custom styled dropdown with lotus theme

7. StarRating.tsx — interactive or display-only star rating with gold stars, half-star support

8. Spinner.tsx — lotus petal spinner animation (CSS, not just a circle)

9. Toast.tsx — notification toasts (success/error/info) with slide-in from top-right, lotus theme

10. Breadcrumb.tsx — navigational breadcrumb with lotus separator

11. SectionTitle.tsx — consistent section heading with decorative lotus divider line beneath

12. ImageWithFallback.tsx — img tag that shows a beautiful Ayurvedic placeholder SVG on error

All components must be fully typed with TypeScript interfaces.

PROMPT 1.3: Layout Components
/create

Create the main layout wrapper components for Bharti Clinic:

NAVBAR (src/components/layout/Navbar.tsx):
- Logo: "Bharti Clinic" in Playfair Display + small lotus SVG icon
- Navigation links: Home, Therapies, Packages, Shop, Gallery, About, Blog, Contact
- "Book Now" CTA button in lotus pink (pulsing animation)
- Cart icon with item count badge
- Transparent on hero, becomes frosted glass (backdrop-blur-md, bg-white/80) on scroll
- Hamburger menu for mobile with full-screen drawer
- Scroll behaviour via useScrollPosition custom hook

FOOTER (src/components/layout/Footer.tsx):
- 4-column grid: About snippet + logo | Quick Links | Therapies | Contact
- Warm ivory background, maroon text
- Social links: Instagram, Facebook, YouTube, WhatsApp
- Google Maps embed placeholder
- Working hours display
- Newsletter signup input
- Bottom bar: © 2026 Bharti Clinic. All rights reserved | Made with ♡ for wellness
- Subtle mandala watermark SVG at 5% opacity

ANNOUNCEMENT BAR (src/components/layout/AnnouncementBar.tsx):
- Dismissible top bar for promotions (content pulled from site settings API)
- Gold background, maroon text, close X button

Page wrapper that composes: AnnouncementBar + Navbar + main content + Footer

 
Phase 2 — Homepage (Highest Priority)
PROMPT 2.1: Animated Hero Section
/ui-ux-pro-max

Create the stunning hero section for Bharti Clinic homepage (src/components/home/HeroSection.tsx).

This is the most important component — it MUST be visually breathtaking.

CANVAS PARTICLE SYSTEM:
- Use HTML Canvas API for floating lotus petals
- 60 petals with random: size (8–24px), speed (0.3–1.2), opacity (0.4–0.9), rotation angle, drift direction
- Each petal is a simple SVG-like path drawn on canvas — a teardrop/ellipse with slight taper
- Physics: slight gravity pulling down, gentle horizontal drift, continuous rotation
- Loop via requestAnimationFrame, cleanup on unmount

BACKGROUND LAYERS (z-index stacking):
1. z-0: CSS gradient — radial from lotus-dark (#B5476A) at top-left to ivory at bottom-right
2. z-1: Semi-transparent mandala SVG (inline, 600px, rotating infinitely at 0.5rpm, opacity 0.08)
3. z-2: Canvas petal particles
4. z-3: Optional: blurred circle bokeh shapes in CSS (pseudo-elements or divs)
5. z-10: Hero text content

CONTENT (z-10):
- Pre-heading: "🌿 Authentic Ayurvedic Healing" — small uppercase letter-spaced text
- Main headline: "Heal Naturally.
Live Beautifully." — Playfair Display 80px, white, typewriter effect (Framer Motion)
- Sub-headline: "Ancient wisdom. Modern wellness. Personalised healing journeys crafted with love and tradition."
- Two CTA buttons:
  * "Book a Free Consultation" — lotus pink, breathing pulse animation
  * "Explore Our Therapies" — white outlined
- Trust micro-text below buttons: "✓ 15+ Years Experience  ✓ 5,000+ Happy Patients  ✓ 100% Natural"
- Scroll hint: animated bouncing lotus petal pointing down

RESPONSIVE:
- Desktop: split layout (text left 55%, botanical illustration right 45%)
- Mobile: stacked, reduced font sizes, particles count halved

Animate entry with Framer Motion: text elements stagger up with 0.2s delays.

PROMPT 2.2: Homepage Sections
/create

Build all remaining homepage sections for Bharti Clinic (each as separate component in src/components/home/):

1. TrustBar.tsx — Animated counter stats:
   "15+" Years | "5,000+" Patients Healed | "20+" Therapies | "100%" Natural
   Counters animate up when section enters viewport (Intersection Observer + Framer Motion)
   Lotus pink accents, ivory background, border-bottom lotus divider

2. AboutSnippet.tsx — Two column: Left: Heading "The Bharti Healing Story", paragraph about Dr. Bharti Veda's 15-year journey rooted in traditional Ayurveda, "Read Our Story" link. Right: Decorative framed placeholder (soft gradient with lotus watermark SVG, warm tones) — no external images

3. TherapiesPreview.tsx — Heading "Our Healing Therapies", 3-column grid of 6 featured therapy cards, each with: icon SVG (herb-themed), name, 1-line description, duration badge, price, "Learn More" button. Data fetched from GET /api/therapies?featured=true

4. WhyChooseUs.tsx — 4 icon-feature blocks: "100% Natural Ingredients" | "Certified Ayurvedic Doctors" | "Ancient Lineage Methods" | "Holistic Mind-Body Care". Lotus pink icons, soft card backgrounds.

5. FeaturedProducts.tsx — "From Our Herbal Store" heading, 4-product grid fetched from GET /api/products?featured=true, same card style as shop, Add to Cart functional.

6. Testimonials.tsx — Auto-playing carousel (3 visible on desktop, 1 on mobile), each card: patient name, city, star rating, quote in Cormorant Garamond italic, soft pink card, "—Name, City" attribution.

7. GalleryTeaser.tsx — Masonry-like 6-image grid fetched from GET /api/gallery?limit=6, hover zoom effect, "View Full Gallery" CTA.

8. PackagesBanner.tsx — Full-width lotus gradient banner showing 1 featured package with original price, discounted price, savings badge, countdown timer if expiry date exists, "View Package" CTA.

9. BookingCTA.tsx — Full-width soft ivory section with inline mini booking form: Name, Phone, Select Therapy (dropdown from API), Message, Submit. POST to /api/appointments.

Assemble all in src/pages/HomePage.tsx

 
Phase 3 — Therapies, Packages & Booking
PROMPT 3.1: Therapies Pages
/create

Build the complete Therapies section for Bharti Clinic:

1. TherapiesPage (src/pages/TherapiesPage.tsx):
- Hero banner: soft lotus gradient, "Our Healing Therapies" heading
- Category filter tabs: All, Panchakarma, Relaxation, Pain Relief, Skin & Beauty, Eye Care
- Responsive grid of therapy cards (3 col desktop, 2 tablet, 1 mobile)
- Each card: therapy image placeholder (SVG herb art), name, duration, price with discount display, benefits list (3 bullets), "Book This Therapy" + "Learn More" buttons
- Filter and search functional (client-side filter on fetched data)
- Data: GET /api/therapies

2. TherapyDetailPage (src/pages/TherapyDetailPage.tsx):
- Route: /therapies/:slug
- Hero: therapy name large + breadcrumb
- Left column (65%): Full description, What to expect, Preparation tips, Benefits list with lotus bullet icons, Contraindications
- Right column (35%) sticky: Booking card showing price, discount if active, duration, "Book Now" button opening booking modal
- Below: Related therapies (same category)
- Structured data for SEO (JSON-LD)

3. BookingModal.tsx:
- Slide-up modal with therapy pre-selected
- Fields: Full Name, Phone, Email, Preferred Date (date picker), Preferred Time (time slots), Additional Notes
- Submit: POST /api/appointments
- Success state: Confirmation animation (lotus petal bloom) + "We'll call you within 2 hours to confirm"

PROMPT 3.2: Packages Page
/create

Build the Wellness Packages page (src/pages/PackagesPage.tsx):

- Hero: "Transform Your Health — Wellness Packages" with lotus gradient background
- Package cards in 2-column grid (1 on mobile)

Each package card must include:
- Package name (bold, Playfair Display)
- Description paragraph
- Included therapies list with duration chips
- Original price (strikethrough)
- Discounted price (prominent, lotus pink)
- Savings badge in gold: "Save ₹X,XXX"
- Validity period if set
- Countdown timer if validTo date is in future (live countdown: "Offer ends in: X days Y hrs Z mins")
- "Only X slots available" urgency if set
- "Book This Package" CTA button (lotus pink, large)
- "View Details" secondary link

Data: GET /api/packages (include therapies in response)
Booking: Opens BookingModal with package context

 
Phase 4 — E-Commerce
PROMPT 4.1: Shop & Product Pages
/create

Build the complete e-commerce product store for Bharti Clinic:

1. ShopPage (src/pages/ShopPage.tsx):
- Sidebar filters: Category checkboxes, Price range slider (₹0–₹5000), Rating filter (4★+, 3★+), In Stock only toggle
- Sort dropdown: Popular, Price Low-High, Price High-Low, Newest
- Product grid (4 col desktop, 2 tablet, 1 mobile)
- Pagination or infinite scroll
- Search bar with debounced API call
- Results count: "Showing 24 of 86 products"

2. ProductCard.tsx (used across site):
- Product image (placeholder: lotus/herb SVG art in ivory card)
- Category badge
- Product name (2-line clamp)
- Star rating (from reviews)
- Price + compare price (if discount)
- "Add to Cart" button with bounce animation on click
- Quick-view hover overlay with expand icon

3. ProductDetailPage (src/pages/ProductDetailPage.tsx):
- Image gallery: main image + 4 thumbnail row, zoom on hover
- Product name, SKU, rating with review count
- Price display (current + original if discounted)
- Stock status ("In Stock", "Only 3 left!", "Out of Stock")
- Quantity selector + "Add to Cart" CTA
- Tabbed content: Description | Ingredients | How to Use | Reviews
- Reviews section with add review form (pending approval)
- Related products (same category, 4 cards)

4. Cart Context (src/context/CartContext.tsx):
- Global cart state: items[], addItem, removeItem, updateQuantity, clearCart, total
- Persisted to localStorage
- Cart count shown in navbar

5. CartDrawer.tsx:
- Slides in from right on cart icon click
- Items list with image, name, quantity stepper, price, remove button
- Order summary: subtotal, shipping note, total
- "Checkout" CTA
- "Continue Shopping" link
- Empty cart state with lotus illustration

PROMPT 4.2: Checkout Flow
/create

Build the complete checkout flow for Bharti Clinic:

1. CheckoutPage (src/pages/CheckoutPage.tsx):
Multi-step with progress indicator (Step 1 of 3):

STEP 1 - Contact & Shipping:
- Full Name, Email, Phone
- Address Line 1 & 2, City, State, PIN Code
- Form validation with inline errors
- "Continue to Payment" button

STEP 2 - Payment Method:
- Options: Cash on Delivery | Bank Transfer | UPI
- UPI: show clinic UPI ID and QR code placeholder
- Bank Transfer: show account details
- Order summary sidebar (sticky)

STEP 3 - Review & Confirm:
- Cart items summary
- Delivery address review
- Payment method selected
- "Place Order" button
- Terms & conditions checkbox

2. OrderConfirmationPage (src/pages/OrderConfirmedPage.tsx):
- Celebratory Framer Motion animation (lotus bloom effect)
- "Thank You, [Name]! 🌸" heading
- Order ID in badge format
- Order summary table
- "Continue Shopping" and "Track Order" buttons
- WhatsApp share button: "I just ordered Ayurvedic wellness products from Bharti Clinic!"

POST /api/orders with full order payload on confirmation

 
Phase 5 — Gallery, About, Contact
PROMPT 5.1: Gallery Page
/create

Build the complete Gallery page for Bharti Clinic (src/pages/GalleryPage.tsx):

PHOTOS TAB:
- Category filter pills: All | Clinic Interior | Therapy Sessions | Team & Doctors | Events | Products
- Masonry CSS grid layout (3 col desktop, 2 tablet, 1 mobile)
- Each photo: image placeholder (SVG art), caption on hover overlay
- Click opens Lightbox modal

LIGHTBOX:
- Full-screen dark overlay
- Large image display with caption
- Prev/Next arrows + keyboard arrow navigation
- Image counter: "4 / 18"
- Close on Escape or backdrop click
- Smooth transition between images

VIDEOS TAB:
- Grid of video thumbnail cards (3 col)
- Play button overlay icon
- Video title and category label
- Opens in modal with embedded video player (video element if direct upload, or YouTube embed iframe if YouTube URL)

Data: GET /api/gallery?type=PHOTO (and PHOTO for videos)
Add Framer Motion stagger animation for grid items loading in

PROMPT 5.2: About & Contact Pages
/create

Build About Us and Contact pages for Bharti Clinic:

ABOUT PAGE (src/pages/AboutPage.tsx):
- Hero: "Our Healing Story" with lotus gradient
- Section 1 — The Clinic: Story of Bharti Clinic, 15+ years heritage, philosophy of treating root causes not symptoms, 3 columns of values: Natural | Holistic | Compassionate
- Section 2 — Dr. Bharti Profile: Large profile placeholder (SVG portrait frame), Name, Qualifications (BAMS, MD Ayurveda), 15 years experience, areas of expertise, vision quote in Cormorant Garamond
- Section 3 — Our Team: 3-4 team member cards with role badges
- Section 4 — Journey Timeline: Vertical timeline of clinic milestones (Founded 2009, First Panchakarma Centre 2012, 1000 patients 2015, etc.)
- Section 5 — Certifications: Logo placeholder cards for certifications and associations

CONTACT PAGE (src/pages/ContactPage.tsx):
- Two column: Left: Contact info cards (Address, Phone, Email, WhatsApp, Working Hours), Embedded Google Maps iframe placeholder
- Right: Contact form (Name, Phone, Email, Subject, Message, Submit)
- WhatsApp floating button (bottom-right of screen, entire site)
- POST /api/contact on form submit
- Success state with lotus animation

 
Phase 6 — Backend API
PROMPT 6.1: Express Server Setup & Auth
/create

Set up the complete Node.js + Express backend for Bharti Clinic:

1. Server entry (src/index.ts):
- Express app with TypeScript
- Middleware: cors (allow frontend origin), helmet (security headers), express.json(), express.urlencoded()
- Rate limiting: express-rate-limit — 100 req/15min for public routes, 10 req/15min for auth
- Error handling middleware
- Request logging with Morgan
- Serve uploaded files from /uploads directory
- Connect to PostgreSQL via Prisma

2. Auth system (src/middleware/auth.ts + src/routes/auth.ts):
- POST /api/admin/login: validate email/password with bcrypt compare, issue JWT (24h expiry)
- verifyToken middleware: validate Bearer token, attach admin to request
- refreshToken endpoint
- Logout endpoint (client-side, stateless JWT)

3. File upload config (src/config/multer.ts):
- Multer diskStorage to /uploads/gallery, /uploads/products, /uploads/blog
- File filter: images (jpeg, png, webp) and video (mp4, webm)
- Max file size: 10MB images, 100MB videos
- Auto-generate unique filename: uuid + original extension

PROMPT 6.2: All API Routes & Controllers
/create

Build all Express routes and controllers for Bharti Clinic backend:

PUBLIC ROUTES:
- src/routes/products.ts: GET /api/products (query: category, minPrice, maxPrice, sort, page, limit, featured), GET /api/products/:slug
- src/routes/therapies.ts: GET /api/therapies (query: category, featured), GET /api/therapies/:slug
- src/routes/packages.ts: GET /api/packages (include therapies), GET /api/packages/:slug
- src/routes/gallery.ts: GET /api/gallery (query: type, category, limit)
- src/routes/orders.ts: POST /api/orders (create order, validate stock)
- src/routes/appointments.ts: POST /api/appointments
- src/routes/reviews.ts: GET /api/reviews/:productId (approved only), POST /api/reviews
- src/routes/blog.ts: GET /api/blog (published only), GET /api/blog/:slug
- src/routes/settings.ts: GET /api/settings/public (returns whitelist of public keys)
- src/routes/contact.ts: POST /api/contact

ADMIN ROUTES (all protected by verifyToken middleware):
- src/routes/admin/dashboard.ts: GET stats (orders count by status, revenue sum, appointments today, products low stock)
- src/routes/admin/products.ts: Full CRUD + stock update + image upload via multer
- src/routes/admin/therapies.ts: Full CRUD with discount fields
- src/routes/admin/packages.ts: Full CRUD with therapy associations
- src/routes/admin/orders.ts: GET list (filterable), GET detail, PUT status update
- src/routes/admin/appointments.ts: GET list (filterable by date/status), PUT status update
- src/routes/admin/gallery.ts: POST upload (multer), DELETE by id, PUT caption/category
- src/routes/admin/reviews.ts: GET all (with status filter), PUT status, DELETE
- src/routes/admin/blog.ts: Full CRUD with publish toggle
- src/routes/admin/settings.ts: GET all settings, PUT bulk update
- src/routes/admin/inventory.ts: GET logs, POST restock entry

Each controller uses Prisma client. Include proper error handling (try/catch), input validation with zod, and consistent JSON response format: { success, data, message, pagination? }

 
Phase 7 — Admin Portal
PROMPT 7.1: Admin Layout & Dashboard
/create

Build the Admin Portal for Bharti Clinic:

1. AdminLayout (src/components/admin/AdminLayout.tsx):
- Left sidebar (240px fixed): Clinic logo at top, nav items with icons (Dashboard, Products, Inventory, Therapies, Packages, Orders, Appointments, Gallery, Reviews, Blog, Settings), active state with lotus pink highlight, collapse to icons-only on mobile
- Top bar: "Bharti Clinic Admin" title, admin name + avatar, logout button, notification bell with count
- Main content area with padding
- Route protection: redirect to /admin/login if no valid JWT

2. AdminLoginPage (src/pages/admin/AdminLoginPage.tsx):
- Centered card with clinic logo
- Email + Password inputs
- Login button
- Error state: "Invalid credentials" message
- POST /api/admin/login, store JWT in httpOnly cookie or localStorage (with security note)

3. DashboardPage (src/pages/admin/DashboardPage.tsx):
- Row of 4 KPI cards: "Revenue Today" (₹), "Pending Orders" (count), "Appointments Today" (count), "Low Stock Alerts" (count) — each with trend arrow and icon
- Charts row: Orders by status (donut chart — Recharts), Revenue last 7 days (line chart — Recharts)
- Upcoming appointments table (next 5): patient, therapy, date/time, status badge, action buttons
- Recent orders table (last 5): order ID, customer, amount, status, date
- Low stock alerts list: product name, current stock, set threshold, "Restock" quick link

PROMPT 7.2: Admin Product & Inventory Manager
/create

Build the Product and Inventory management pages for Bharti Clinic admin:

PRODUCTS PAGE (src/pages/admin/ProductsPage.tsx):
- Header: "Products" title + "Add Product" button (opens modal)
- Search bar + category filter + status filter (Active/Inactive)
- Data table columns: Image thumbnail | Name | Category | Price | Stock (colour coded) | Status toggle | Actions (Edit, Delete)
- Bulk select checkboxes with "Delete Selected" bulk action
- Pagination: 20 per page

ADD/EDIT PRODUCT MODAL:
- Tabs: Basic Info | Pricing & Stock | Images | SEO
- Basic Info: Name, Category (dropdown), Description (textarea), Short description
- Pricing: Price (₹), Compare Price (₹ for strikethrough), Is Featured toggle, Is Active toggle
- Stock: Current Stock quantity, Low Stock Threshold
- Images: Drag-and-drop image uploader (up to 5 images), preview thumbnails, reorder by drag
- SEO: Slug (auto-generated from name, editable), Meta description
- POST /api/admin/products (create) or PUT /api/admin/products/:id (update)

INVENTORY PAGE (src/pages/admin/InventoryPage.tsx):
- Table: Product Name | Category | Current Stock | Threshold | Status | Last Updated | Actions
- Stock status colour: red badge (<5 "Critical"), orange (<threshold "Low"), green ("OK")
- "Restock" button per row opens mini form: quantity to add, supplier note → POST /api/admin/inventory/log
- Inventory log tab: Date | Product | Change | New Stock | Reason | Admin
- Export CSV button

PROMPT 7.3: Admin Therapy, Package & Gallery Manager
/create

Build Therapy, Package, and Gallery admin pages for Bharti Clinic:

THERAPIES PAGE (src/pages/admin/TherapiesPage.tsx):
- Table: Name | Category | Duration | Base Price | Discounted Price | Discount Expiry | Active | Featured | Actions
- Add/Edit modal:
  * Name, Category, Duration (mins), Description (rich text — react-quill or textarea)
  * Base Price (₹), Discount Type (% or flat amount), Discount Value, Discount Expiry date
  * Calculated discounted price preview (live update as you type)
  * Image upload, Is Active, Is Featured toggles
- Discount badge preview shown on card preview panel

PACKAGES PAGE (src/pages/admin/PackagesPage.tsx):
- Package cards grid view (not table, since packages are richer)
- Add/Edit modal:
  * Package name, description
  * Therapy selector: multi-select from existing therapies
  * Total price, original price (auto-sum or override)
  * Valid From/To dates, coupon code, Is Active
  * Preview of savings badge

GALLERY PAGE (src/pages/admin/GalleryPage.tsx):
- Tabs: Photos | Videos
- Media grid with: thumbnail, category label, caption, edit icon, delete icon (with confirm)
- Bulk upload: drag-and-drop zone accepting multiple files
- After upload, form appears for each: assign category, write caption, set sort order
- Category filter in admin view
- Reorder by drag-and-drop (updates sortOrder field)

PROMPT 7.4: Admin Orders, Appointments & Settings
/create

Complete the admin portal for Bharti Clinic with these final modules:

ORDERS PAGE (src/pages/admin/OrdersPage.tsx):
- Tabs: All | Pending | Confirmed | Shipped | Delivered | Cancelled
- Table: Order ID | Customer | Phone | Items count | Total | Payment | Date | Status | Actions
- Click row → Order Detail drawer/modal:
  * Customer details, shipping address
  * Items table (product, qty, price)
  * Payment status badge
  * Status update dropdown (Pending → Confirmed → Shipped → Delivered or Cancelled)
  * Internal notes field for admin
- WhatsApp link button to message customer

APPOINTMENTS PAGE (src/pages/admin/AppointmentsPage.tsx):
- Calendar view (react-calendar or simple week grid) + List view toggle
- List: Patient | Phone | Therapy | Date | Time | Status | Actions
- Status update: Pending → Confirmed | Cancelled
- Click to expand: full patient details + notes + WhatsApp link
- Export to CSV with date range filter

REVIEWS PAGE (src/pages/admin/ReviewsPage.tsx):
- Tabs: Pending Approval | Approved | Rejected
- Card list: patient name, product, stars, review text, date
- Approve / Reject / Delete buttons per card

SETTINGS PAGE (src/pages/admin/SettingsPage.tsx):
- Form sections:
  * Clinic Info: Name, tagline, phone, email, WhatsApp, address, working hours
  * Social Links: Instagram, Facebook, YouTube, Twitter URLs
  * Homepage: Hero headline, hero subheadline, announcement bar text, announcement bar active toggle
  * Google Maps: Embed iframe src URL
  * SEO: Site meta title, meta description
- Auto-save with debounce or explicit Save button
- GET /api/admin/settings and PUT /api/admin/settings on save

 
Phase 8 — Quality, Testing & Polish
PROMPT 8.1: Testing Suite
/test

Generate a comprehensive test suite for Bharti Clinic:

BACKEND UNIT TESTS (Jest + Supertest):
- Auth: test login success, wrong password, missing fields, token validation
- Products: test list (with filters), get by slug, create (admin), update stock, delete
- Orders: test create order with valid stock, create with out-of-stock product (should fail), status update
- Appointments: test create with valid therapy, create without required fields

FRONTEND COMPONENT TESTS (Vitest + React Testing Library):
- HeroSection: renders headline, renders canvas element, CTA buttons present
- ProductCard: renders name, price, add to cart triggers context
- CartContext: addItem adds correctly, removeItem works, total calculates correctly
- CheckoutPage: multi-step navigation works, form validation shows errors

E2E TEST SCENARIOS (Playwright — describe scenarios, no code yet):
1. Customer browses shop, adds 2 products to cart, completes checkout
2. Customer books a therapy appointment from therapy detail page
3. Admin logs in, updates a product price, logs out
4. Admin uploads a gallery photo with caption and category
5. Customer submits a review, admin approves it, it appears on product page

PROMPT 8.2: Performance & SEO
/enhance

Optimise Bharti Clinic website for performance, SEO, and accessibility:

PERFORMANCE:
- Lazy load all route components with React.lazy + Suspense (show lotus petal spinner)
- Image optimisation: convert to WebP where possible, add width/height attributes, loading="lazy"
- Code split: vendor chunk, admin bundle separate from public site bundle
- React Query: set staleTime 5 min for product/therapy lists, use prefetching on hover
- Memoize heavy components (product grid, gallery) with React.memo
- Reduce canvas petal count on mobile (30 instead of 60)

SEO:
- Add react-helmet-async for per-page meta tags
- Each page: unique title, meta description, og:title, og:description, og:image
- Product pages: JSON-LD Product schema
- Therapy pages: JSON-LD Service schema  
- Blog posts: JSON-LD Article schema
- Sitemap.xml generation script
- robots.txt (allow all, disallow /admin)

ACCESSIBILITY:
- All interactive elements have aria-labels
- Colour contrast ratios meet WCAG AA
- Keyboard navigation for all modals and drawers
- Skip-to-content link at top
- Alt text on all images
- Focus management in modal open/close

PROMPT 8.3: Responsive Polish & Cross-Browser
/enhance

Final responsive design pass for Bharti Clinic website:

BREAKPOINTS:
- Mobile: 320px–767px
- Tablet: 768px–1023px  
- Desktop: 1024px–1439px
- Large Desktop: 1440px+

MOBILE-SPECIFIC:
- Hero: 1 column, 60vh min height, 48px headline, 30 petals on canvas
- Navbar: hamburger → full-screen overlay menu, WhatsApp button replaces some nav items
- Product grid: 1 column
- Cart: full-screen drawer
- Admin sidebar: hidden by default, toggle with hamburger

TABLET-SPECIFIC:
- Hero: partial layout, centered
- Product grid: 2 columns
- Admin sidebar: icon-only collapsed

CROSS-BROWSER:
- Test canvas particle system on Safari (ensure requestAnimationFrame works)
- CSS backdrop-filter fallback for older browsers
- Custom scrollbar CSS with -webkit prefix

FINAL POLISH:
- Ensure all hover states have 200–300ms transitions
- All form submission loading states with spinner
- All error states handled gracefully with friendly messages
- 404 page with lotus illustration and "Return Home" button
- Loading skeleton screens for product/therapy grids while data fetches

PROMPT 8.4: Deployment Setup
/deploy

Set up deployment configuration for Bharti Clinic full-stack application:

ENVIRONMENT VARIABLES:
Frontend (.env):
- VITE_API_BASE_URL=https://api.bhartiveda.com
- VITE_SITE_URL=https://bhartiveda.com

Backend (.env):
- DATABASE_URL=postgresql://user:password@host:5432/bharticlinic
- JWT_SECRET=<random 64-char string>
- JWT_EXPIRES_IN=24h
- PORT=5000
- UPLOAD_DIR=./uploads
- MAX_FILE_SIZE_MB=10
- CORS_ORIGIN=https://bhartiveda.com

DOCKER SETUP:
- Dockerfile for backend (Node 20 Alpine)
- docker-compose.yml: backend service + PostgreSQL service + volume for uploads
- Health check endpoint: GET /api/health

DEPLOYMENT OPTIONS (provide configs for both):
Option A — VPS (DigitalOcean / AWS EC2):
- PM2 config for backend process management (ecosystem.config.js)
- Nginx reverse proxy config: frontend static on port 80/443, API proxy to port 5000
- SSL with Let's Encrypt Certbot command

Option B — Platform-as-a-Service:
- Frontend: Vercel (vercel.json config)
- Backend: Railway or Render (Procfile + build commands)
- Database: Railway PostgreSQL or Supabase

GITHUB ACTIONS CI/CD:
- .github/workflows/deploy.yml
- On push to main: install deps, run tests, build frontend, deploy

 
Phase 9 — Final Review
PROMPT 9.1: Pre-Launch Checklist
/status

Run a complete pre-launch audit of the Bharti Clinic website and provide a checklist covering:

FUNCTIONALITY:
[ ] All public pages load without errors
[ ] Product filters and search work correctly
[ ] Add to cart, quantity update, remove from cart all functional
[ ] Full checkout flow completes successfully (POST /api/orders succeeds)
[ ] Appointment booking form submits and saves to DB
[ ] Gallery loads photos and videos, lightbox opens/closes
[ ] Admin login works with correct credentials
[ ] Admin can create/edit/delete product and see changes on public site
[ ] Admin can upload gallery image and it appears on gallery page
[ ] Admin can set therapy discount and see it reflected on therapy page
[ ] All API endpoints return proper error responses for invalid inputs
[ ] JWT token expires correctly and admin is redirected to login

DESIGN:
[ ] Hero section animations run smoothly (60fps on desktop)
[ ] Lotus petal canvas renders correctly on mobile
[ ] All fonts (Playfair Display, DM Sans, Cormorant Garamond) load
[ ] Colour palette is consistent throughout
[ ] Hover states on all interactive elements work
[ ] All transitions are smooth (no janky reflows)

PERFORMANCE:
[ ] Lighthouse score: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 90
[ ] First Contentful Paint < 2.5s
[ ] No console errors in production build

SECURITY:
[ ] Admin routes blocked without valid JWT
[ ] SQL injection not possible (Prisma parameterised queries)
[ ] XSS not possible (React escapes by default)
[ ] File upload validates type and size
[ ] Rate limiting active on auth and order endpoints

 
9. Ayurvedic Content Reference

9.1 Sample Products for Seeding
Product Name	Category	Price (₹)	Compare Price (₹)
Ashwagandha Root Powder (500g)	Herbal Powders	499	699
Panchatikta Ghrita (200ml)	Oils & Ghee	650	850
Triphala Churna (250g)	Herbal Powders	299	—
Neem & Turmeric Face Pack (100g)	Skincare	349	449
Brahmi Hair Oil (200ml)	Oils & Ghee	399	549
Chyawanprash Special (1kg)	Chyawanprash	899	1199
Tulsi Green Tea (50 bags)	Teas	249	—
Mahanarayan Oil (450ml)	Oils & Ghee	750	950
Kanchanar Guggulu (60 tabs)	Capsules & Tablets	550	—
Kumkumadi Tailam (30ml)	Skincare	1299	1699

9.2 Sample Therapies for Seeding
Therapy	Duration	Base Price (₹)	Discounted (₹)
Panchakarma — Full Program	7 days (daily sessions)	25,000	21,000
Shirodhara	60 mins	2,500	2,000
Abhyanga Full Body Massage	60 mins	1,800	—
Nasya Therapy	30 mins	1,200	—
Kizhi (Pinda Sweda)	45 mins	2,200	1,800
Udvartana	60 mins	2,000	—
Netra Tarpana	30 mins	1,500	1,200
Kati Basti	45 mins	1,800	—
Greeva Basti	45 mins	1,800	—
Mukhaabhyanga (Face Massage)	30 mins	1,200	999

9.3 Sample Packages for Seeding
Package	Includes	Total Price (₹)	Original (₹)
7-Day Detox Reset	Panchakarma + Shirodhara (daily) + Abhyanga	35,000	42,000
Stress Buster Bundle	Shirodhara x3 + Abhyanga x2 + Nasya	9,500	12,500
Skin Glow Package	Mukhaabhyanga x4 + Kumkumadi treatment + Udvartana x2	8,200	10,800
Pain Relief Package	Kizhi x4 + Kati Basti x2 + Greeva Basti x2	12,000	16,400
Eye Wellness Package	Netra Tarpana x3 + Nasya x3	7,500	10,200

 
10. Estimated Development Timeline

Phase	Description	Estimated Hours	Cumulative
Phase 0	Project scaffolding, DB schema, seed data	8–10 hrs	10 hrs
Phase 1	Design system, UI components, layout	10–14 hrs	24 hrs
Phase 2	Homepage (hero + all sections)	12–16 hrs	40 hrs
Phase 3	Therapies, Packages, Booking	10–12 hrs	52 hrs
Phase 4	E-Commerce (shop, cart, checkout)	14–18 hrs	70 hrs
Phase 5	Gallery, About, Contact, Blog	8–10 hrs	80 hrs
Phase 6	Backend API (all routes + controllers)	14–18 hrs	98 hrs
Phase 7	Admin Portal (full dashboard)	18–24 hrs	122 hrs
Phase 8	Testing, SEO, performance, deployment	10–14 hrs	136 hrs
Phase 9	QA, bug fixes, final polish, launch	8–12 hrs	148 hrs
TOTAL	Complete full-stack platform	112–148 hours	~8–10 weeks (solo)


🌸 Built with Love for Bharti Clinic 🌸
Heal Naturally. Live Beautifully.
PRD Version 1.0 — February 2026 — Prepared with Antigravity Kit
