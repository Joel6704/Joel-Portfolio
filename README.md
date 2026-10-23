# Joel Thomas — Personal Portfolio Website (Reference-Based Dark & Purple Design)

A personal brand and creative portfolio website for **Joel Thomas** (Digital Marketing & Business Development Professional), redesigned with a modern dark theme and vibrant purple accents matching the reference aesthetic.

---

## 🎨 Visual Identity & Color Palette

- **Main Background**: Deep Midnight Navy `#090D1B`
- **Secondary Background / Cards**: Dark Navy `#101329`
- **Primary Purple Accent**: `#7965FF`
- **Purple Glow Accent**: `#5141C8`
- **Primary Text**: White `#FFFFFF`
- **Secondary Text**: Soft Gray `#B8BDCC`
- **Borders**: Muted Lavender with Transparency (`rgba(121, 101, 255, 0.2)`)
- **Radial Ambient Glow**: Smooth purple radial gradient centered on hero profile area

---

## 🌟 Homepage (Hero) — Reference Architecture

1. **Top Greeting**:
   - `Hello There! 👋` in clean, medium-weight light-gray typography.
2. **Circular Profile Photo**:
   - 200–220px desktop circular image with purple ambient glow (`shadow-[0_0_50px_rgba(121,101,255,0.4)]`).
   - Supports natural photos with `object-cover` without distortion.
   - Built-in elegant JT monogram fallback placeholder until you drop `profile.jpg` into `public/`.
3. **Main Headline**:
   - `I'm Joel Thomas` ("I'm " in white, "Joel Thomas" in vibrant purple `#7965FF`).
4. **Professional Role**:
   - Large white typography (`Digital Marketing`), with smooth transitions between:
     - *Digital Marketing*
     - *Social Media Management*
     - *Business Development*
     - *SEO & Analytics*
5. **Tagline**:
   - *“Turning creative ideas into meaningful business growth.”*
6. **Experience Badge**:
   - Rounded pill-shaped badge: `1+ Years of Experience` with transparent purple background and purple text.
7. **Primary Call-to-Action**:
   - Outlined pill button: `View My Work` with thin lavender border, white text, smooth purple glow and fill on hover.
8. **Secondary CTA**:
   - `Let's Connect` scrolling directly to `#contact`.

---

## 📑 Website Sections

1. **Navbar**: Minimal sticky dark header with `JOEL THOMAS` brand wordmark, quick section navigation, and mobile hamburger drawer.
2. **About Me**: Heading *"A Little About Me"* with white text and purple highlight words, 6 competency cards, and the 3-step *"My Approach"* principles.
3. **Skills & Expertise**: Heading *"My Expertise"* with dark cards (`#101329`) and purple hover glows across Business Development, Social Media Management, SEO & Analytics, and AI / Cloud.
4. **Professional Experience**: Heading *"My Professional Journey"* with a purple vertical connecting timeline for Prep Academy and PIXELBOHO Digital Marketing Agency.
5. **Selected Projects**: Heading *"Selected Projects"* with category filters (*All, Social Media, Campaigns, SEO, Lead Gen*), dark thumbnails with purple tags, and interactive case study modals.
6. **My Creative Process**: Heading *"From Idea to Impact"* featuring a 5-step timeline (*Discover → Strategize → Create → Execute → Analyze*).
7. **Education & Continuous Learning**: BCA, Digital Marketing & AI certification, and ongoing Microsoft Azure cloud learning.
8. **Personal Strengths**: 6 clean dark cards with purple line icons.
9. **Contact**: Heading *"Let's Create Something Meaningful."* with email, phone, LinkedIn, and an interactive message form.
10. **Footer**: Midnight navy footer with monogram, navigation links, and back-to-top button.

---

## 🚀 Running Locally

```bash
# In the portfolio directory:
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Create Production Build
```bash
npm run build
```
Optimized assets are generated in `dist/`.

---

## 📷 How to Add Your Real Profile Photo
Simply place your professional headshot file in the `public/` directory named:
```
public/profile.jpg
```
The website will immediately display your photo in the circular glow frame on the homepage without needing code changes!
