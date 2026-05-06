---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]
inputDocuments:
  - /Users/hoanghieu/Documents/Workspace/BMAD/wedding/_bmad-output/planning-artifacts/prd.md
---

# UX Design Specification wedding

**Author:** Hoanghieu
**Date:** 2026-05-06

---

## Executive Summary

### Project Vision

Wedding is a mobile-first wedding website focused on helping invited guests quickly access event information and submit RSVP responses with minimal confusion. The product should feel elegant and personal, while prioritizing clarity, speed, and reliability over decorative complexity.

The UX direction should support a single-page flow where guests can understand the event, find logistics, and complete the RSVP journey without needing to learn the interface or create an account. The experience should reduce follow-up questions for guests and reduce manual coordination work for the administrator.

### Target Users

The primary users are invited wedding guests, including family members, friends, and colleagues. Their technical comfort will vary, so the experience should use familiar interaction patterns, clear labels, and highly readable content. Most users are expected to access the site from a mobile phone, often by opening a shared link from a messaging app.

The secondary user is the single site administrator, Hoanghieu, who needs to review RSVP submissions, verify whether responses were received, identify non-responders, export RSVP data, and support reminder workflows.

### Key Design Challenges

The first challenge is balancing wedding-style visual polish with fast comprehension. Guests must be able to identify the most important logistics immediately without being slowed down by dense layouts, decorative motion, or content that hides key details.

The second challenge is delivering a reliable mobile-first experience. The site must work well on narrow screens, support touch interaction comfortably, and preserve readability without zooming.

The third challenge is making RSVP feel short, trustworthy, and unambiguous. Guests should know what is being asked, what has been submitted, and whether the submission succeeded, without encountering unclear states or unnecessary friction.

### Design Opportunities

The strongest design opportunity is to create a calm, elegant, content-led experience that feels personal without sacrificing usability. Strong hierarchy, restrained visuals, and clear call-to-action placement can make the site feel polished while keeping the guest journey simple.

Another opportunity is to design the page as a smooth single-page narrative with clearly separated sections for event details, venue, schedule, RSVP, FAQ, and contact information. This can reduce confusion and help guests find what they need quickly.

A third opportunity is to turn RSVP into a very efficient core interaction with minimal fields, mobile-friendly form controls, and explicit confirmation feedback. A well-designed RSVP flow can improve completion rate and reduce admin support effort.

## Core User Experience

### Defining Experience

The core experience of Wedding is helping invited guests quickly understand the event and complete their RSVP without friction. The experience should feel immediate, calm, and trustworthy, especially for users opening the site from a phone in a messaging app context.

The most important recurring user behavior is reviewing logistics and responding to the invitation. The most critical interaction to get right is RSVP submission, because it directly affects guest confidence and the administrator's operational workload. If the RSVP experience is short, clear, and reliable, the product delivers most of its practical value.

The overall experience should support a simple single-page journey where guests can move from orientation to logistics to action without confusion. Every major interaction should feel familiar and require little or no learning.

### Platform Strategy

Wedding should be designed as a mobile-first web application delivered through a single-page experience. The primary usage mode is mobile, with most guests expected to access the site through shared links in messaging apps. Desktop support remains important, but the design should be optimized for narrow screens and touch interaction first.

The interface should rely on standard modern browser capabilities and should not depend on offline support or device-specific integrations. The platform strategy should prioritize fast loading, smooth scrolling, strong readability, and reliable behavior across Safari on iPhone, Chrome on Android, and major desktop browsers.

### Effortless Interactions

Guests should be able to identify the most important event details immediately after opening the site. The date, venue, RSVP call-to-action, and schedule context should be easy to find without effort.

Navigation through the page should feel natural and uninterrupted. Moving from section to section should feel like reading a well-structured story rather than operating a tool. Venue and map access should require minimal effort, ideally through a single clear action.

The RSVP form should feel short and mobile-friendly. Form inputs should use appropriate field types, clear labels, and minimal required fields. Submission feedback should appear immediately and make it obvious whether the response was successfully recorded.

Returning visitors should also be able to re-open the site and recover core information quickly without needing to re-learn the interface.

### Critical Success Moments

The first key success moment happens when a guest opens the link and immediately understands whose wedding it is, when it happens, and where to look next. This first impression must establish clarity within seconds.

The second critical success moment happens during RSVP completion. Guests should feel confident that the form is simple, understandable, and not asking for unnecessary effort.

The most important moment of reassurance happens after submission, when the guest sees a clear confirmation state and understands what was successfully recorded. This is the point where trust in the product is either reinforced or lost.

The make-or-break journey is the flow from hero to event details to RSVP to confirmation. If this path feels slow, unclear, or fragile, the overall experience will fail even if the rest of the content is well designed.

### Experience Principles

1. **Clarity over decoration**  
   Important information must always be easier to understand than the visual styling is to admire.

2. **Mobile-first touch interaction**  
   Layout, spacing, controls, and reading flow should be designed for touch devices before desktop refinement.

3. **Immediate confidence in critical actions**  
   Guests should always understand what is happening during RSVP and whether their response was successfully captured.

4. **Single-page narrative flow**  
   The site should feel like a smooth, guided progression from introduction to logistics to action, without unnecessary branching or interruption.

## Desired Emotional Response

### Primary Emotional Goals

Wedding should make guests feel calm, confident, and welcomed from the moment they open the site. The experience should feel clear and reassuring rather than overwhelming or overly decorative.

The strongest emotional outcome should be confidence: confidence that they understand the event, confidence that they know what action to take, and confidence that their RSVP has been successfully received. A secondary goal is to make the experience feel warm and personal, reflecting the emotional tone of a wedding without sacrificing usability.

For the administrator, the emotional goal is confidence and control. The system should reduce uncertainty and manual follow-up effort by making RSVP status and guest information easy to verify.

### Emotional Journey Mapping

When guests first arrive, they should feel welcomed and quickly oriented. The opening impression should communicate that this is a personal and meaningful event, while also making the next step obvious.

As guests move through the site, they should feel informed and at ease. Reading logistics, viewing the venue, checking the schedule, and understanding RSVP expectations should all feel straightforward and low-pressure.

During RSVP submission, guests should feel confident and in control. The form should avoid creating uncertainty, hesitation, or the sense that they might make a mistake.

After submission, guests should feel reassured and complete. The confirmation state should remove ambiguity and leave them with a clear sense that the task is finished.

When returning later, guests should feel familiarity and efficiency. The interface should feel easy to re-enter, with important information quickly recoverable.

### Micro-Emotions

The most important micro-emotion is confidence rather than confusion. Guests should always understand where they are, what they are looking at, and what they should do next.

Trust is also essential, especially during RSVP submission. Guests should never feel uncertain about whether their response was recorded or whether the form is behaving correctly.

Satisfaction is more important than surprise. This product does not need novelty-driven delight; it needs a polished, dependable experience that feels complete and well considered.

A sense of accomplishment should appear at the end of the RSVP flow. Guests should feel that they have successfully completed an important task, not that they need to verify it elsewhere.

### Design Implications

To support calm and confidence, the interface should use strong hierarchy, readable typography, consistent spacing, and restrained motion. The design should avoid clutter, dense information presentation, and decorative effects that compete with logistics.

To support trust, RSVP interactions should provide immediate validation, clear button labeling, explicit success or failure states, and confirmation content that reflects what the guest submitted.

To support a welcoming emotional tone, the visual design should feel warm and personal without becoming visually noisy. This can be achieved through elegant imagery, a restrained palette, and clear section pacing.

To reduce anxiety, the experience should avoid hidden states, unclear transitions, or any point where users must guess whether something worked. Contact information should remain accessible for reassurance if needed.

### Emotional Design Principles

1. **Reassurance at every critical step**  
   Important actions, especially RSVP, should always leave the user feeling certain about what just happened.

2. **Warmth without clutter**  
   The design should feel personal and emotionally appropriate for a wedding, but never at the cost of clarity.

3. **Confidence through clarity**  
   Layout, copy, hierarchy, and form behavior should consistently reduce hesitation and uncertainty.

4. **Completion should feel complete**  
   When users finish an important task, the interface should provide enough feedback to make the experience feel resolved.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

Three products were selected as primary inspiration sources based on their relevance to the wedding website's core needs: clear information presentation, efficient form interaction, and premium yet functional design.

**Airbnb** demonstrates excellent hierarchy and visual balance. The product solves the complex problem of helping users make booking decisions quickly by presenting essential information (price, location, rating, availability) without overwhelming the interface. The hero image approach is particularly strong: large, beautiful imagery that establishes emotional context while keeping critical information and calls-to-action clearly visible. Navigation uses a sticky header pattern that keeps key actions accessible, and the card-based layout creates clear visual separation between content blocks. The mobile experience is optimized for touch with smooth swipe gestures, instant search feedback, and a date picker designed specifically for mobile interaction. Error handling is transparent, with clear validation messages and helpful suggestions when results are empty.

**Notion** excels at creating a calm, spacious interface that handles complex information without feeling cluttered. The product's strength is in its spacing philosophy and typography hierarchy. Generous whitespace, subtle borders, and a neutral palette keep the interface from feeling visually noisy. The navigation sidebar remains accessible but can collapse to maximize content space. Inline editing removes mode-switching friction, and auto-save with clear indicators builds trust. Empty states provide guidance rather than leaving users uncertain. The overall visual approach prioritizes readability and focus over decoration.

**Apple's event invitations and calendar interface** represent premium design through restraint rather than embellishment. The product makes event information immediately actionable with one-tap "Add to Calendar" integration. Information hierarchy is clear and vertical: most important details at the top, secondary information below. Typography and spacing create the premium feel rather than visual decoration. The San Francisco font with careful hierarchy, generous line height, and subtle dividers make the interface feel polished and trustworthy. RSVP states are explicit, map integration is seamless, and the entire experience feels effortless.

### Transferable UX Patterns

**Navigation Patterns:**

Single-page vertical scroll is the strongest pattern to adopt. This approach, seen in Apple invitations, works naturally for wedding content where information has an inherent sequence: introduction, event details, venue, schedule, RSVP, FAQ, contact. Guests can move through the content like reading a story rather than navigating a tool.

Sticky call-to-action placement, borrowed from Airbnb, ensures the RSVP button remains accessible as guests scroll through content. This reduces friction for users who want to respond immediately after reading key details.

Progressive disclosure, also from Airbnb, can be applied to secondary content like FAQ sections. Show overview information first, with details available on demand through expand/collapse interactions.

**Interaction Patterns:**

One-tap actions from Apple should be applied to all critical interactions. "Add to Calendar," "Open Map," and "RSVP" should require minimal steps and provide immediate feedback.

Inline validation from Notion should be adapted for the RSVP form. Validate fields as guests fill them rather than waiting for submission, reducing uncertainty and preventing submission errors.

Clear confirmation states from Apple's RSVP system should be applied after RSVP submission. Guests must see an explicit success state with a summary of what was submitted, removing any ambiguity about whether the response was recorded.

Auto-save indicators from Notion can be adapted if the RSVP form supports draft saving. Clear visual feedback about save state builds trust and reduces anxiety about losing progress.

**Visual Patterns:**

Hero image with key information overlay, inspired by Airbnb, should be used for the opening section. A large couple photo with names and date overlaid establishes emotional context while immediately communicating the most important details.

Card-based section separation, also from Airbnb, creates clear visual boundaries between content blocks. Each major section (venue, schedule, FAQ) should feel distinct and easy to identify.

Generous spacing from Notion should be applied throughout, especially on mobile. Avoid cramped layouts that make content harder to parse on small screens.

Typography hierarchy from Apple should drive visual structure. Use font size, weight, and spacing to create hierarchy rather than relying on color or decoration. This approach feels more premium and remains accessible.

Restrained color palette, common across all three products, should guide the visual design. Use one or two accent colors for calls-to-action and emphasis, with most of the interface remaining neutral.

### Anti-Patterns to Avoid

Hidden navigation behind hamburger menus should be avoided for critical information. Unlike Airbnb's filters, which are secondary, wedding logistics are primary and should remain visible.

Auto-playing media should not be used. Many wedding websites auto-play music or video, but this creates friction, especially for users opening the site in public or quiet contexts.

Carousels for critical information should be avoided. Users often skip carousel content, so date, venue, and RSVP deadline should be presented in static, always-visible sections.

Modal overload should be prevented. Avoid popup dialogs that interrupt the reading flow or require dismissal before accessing content.

Decorative complexity such as heavy parallax effects or complex animations should be avoided. These patterns slow mobile performance and distract from content, contrary to the simplicity seen in Airbnb, Notion, and Apple.

Unclear form states should never occur. Users should never need to guess whether a form has been submitted or whether their response was recorded. This is a common failure in poorly designed RSVP systems.

Dense information presentation should be avoided. Do not cram excessive text into single sections. Follow Notion's spacing philosophy to keep content readable and scannable.

### Design Inspiration Strategy

**What to Adopt:**

Airbnb's hero and hierarchy pattern should be adopted directly. Use a large hero image with couple names and date overlay, followed by clearly separated content sections.

Notion's spacing philosophy should guide layout decisions. Generous whitespace, clear section separation, and comfortable line height should be applied throughout.

Apple's typography approach should define the visual tone. Create a premium feel through font hierarchy and spacing rather than decoration.

Airbnb's CTA prominence should be applied to the RSVP button. Make it visually clear, easy to find, and optionally sticky for persistent access.

Apple's one-tap action pattern should be applied to all key interactions. Add to Calendar, Open Map, and Contact actions should be instant and require minimal steps.

**What to Adapt:**

Airbnb's card layout should be adapted from a grid to a vertical single-page flow. Each section should feel distinct like a card but arranged in a narrative sequence.

Notion's inline editing should be adapted to inline form validation for RSVP. Validate fields as users type rather than waiting for submission.

Apple's RSVP state system should be simplified from Yes/No/Maybe to Yes/No, which is more appropriate for wedding context where definitive responses are expected.

**What to Avoid:**

Airbnb's complex filtering system is unnecessary for a wedding website. The site does not need search or filtering; it needs clear navigation through a fixed set of content.

Notion's power user features such as slash commands or advanced editing tools are not relevant. The wedding site should remain simple and accessible to all technical skill levels.

Apple's calendar conflict detection logic is too complex for this context. A basic "Add to Calendar" action is sufficient without conflict warnings or scheduling intelligence.

## Design System Foundation

### 1.1 Design System Choice

The recommended design system foundation for Wedding is a themeable system built on Tailwind CSS, supported by a small set of custom component patterns tailored to the product's wedding-specific visual tone and interaction needs.

This approach provides a strong balance between flexibility, speed, and consistency. It avoids the rigidity of highly opinionated enterprise design systems while also avoiding the cost and complexity of building a fully custom design system from scratch.

A secondary implementation option is to pair Tailwind CSS with lightweight primitive components for common interactive patterns such as accordions, dialogs, and form controls, as long as the visual layer remains fully customized to the product's design direction.

### Rationale for Selection

Wedding requires a mobile-first interface with strong control over spacing, typography, hierarchy, and responsive layout behavior. Tailwind CSS is well suited to this need because it allows precise layout and visual tuning without forcing a generic component aesthetic.

The project also needs to express a premium, calm, and personal tone inspired by Airbnb, Notion, and Apple. A themeable system supports this better than established enterprise-oriented systems such as Material UI or Ant Design, which can accelerate development but often introduce a visual language that feels too application-like for a guest-facing wedding experience.

Because this is a focused MVP with a relatively small number of core UI patterns, building a lightweight custom layer on top of Tailwind is more efficient than creating a full design system or adopting a large component framework.

### Implementation Approach

The implementation should use Tailwind CSS as the styling foundation for layout, spacing, responsive behavior, typography, and visual rhythm. On top of this foundation, the product should define a compact component set for the main user experience.

The first component layer should include:
- Hero section
- Section container
- Venue information card
- Timeline or schedule block
- RSVP form field patterns
- Primary and secondary buttons
- FAQ accordion
- Confirmation state panel
- Contact / support block

If interactive primitives are needed, they should be introduced selectively and themed consistently rather than adopted wholesale from a heavy component system.

### Customization Strategy

Customization should focus on the visual and interaction areas that most affect guest perception: typography, spacing, color palette, button treatment, card styling, and form feedback states.

The design should establish a small set of reusable design tokens covering:
- Type scale
- Spacing scale
- Corner radius
- Elevation or shadow rules
- Primary accent color
- Neutral background and text colors
- Interaction states for hover, focus, active, error, and success

The customization strategy should preserve a calm, premium, and readable experience. Components should feel cohesive and elegant, but should remain simple enough to support fast implementation and low maintenance.

## 2. Core User Experience

### 2.1 Defining Experience

The defining experience of Wedding is enabling guests to immediately understand the event and confidently complete RSVP with minimal effort. If this experience is executed well, the rest of the product naturally supports it.

The product should feel like a fast, elegant transition from orientation to action. Guests should open the link, understand the essential event details within seconds, and respond without friction or uncertainty. The core value is not exploration or novelty, but clarity, confidence, and completion.

In practical terms, the defining experience can be summarized as: understand the event immediately, then respond confidently.

### 2.2 User Mental Model

Guests approach the product with a simple event-oriented mental model. They expect to quickly learn who is getting married, when the wedding is happening, where it takes place, whether they need to RSVP, and what details matter for attendance.

They are not approaching the site as a product to explore. They are approaching it as a reliable source of event information and a simple way to complete a small but important task.

Current alternatives usually involve scattered chat messages, invitation images, or manual RSVP through text conversations. These approaches create repeated questions, difficulty finding information again, and uncertainty about whether responses were received.

Because of this, users will expect the website to consolidate information clearly, reduce the need for follow-up, and provide confidence that their RSVP has been properly recorded.

### 2.3 Success Criteria

The defining experience is successful if guests can quickly orient themselves, complete RSVP without hesitation, and leave with confidence that the task is done.

Success should be visible through the following indicators:
- Guests identify the most important event details within the first screen or near the first scroll
- Guests understand the next action without explanation
- Guests complete RSVP in a short, low-friction flow
- Guests receive clear confirmation after submission
- Guests do not feel the need to ask follow-up questions for basic logistics or RSVP uncertainty

A successful experience should feel fast, obvious, and dependable rather than clever or surprising.

### 2.4 Novel UX Patterns

Wedding should rely primarily on established UX patterns rather than introducing novel interaction models. The audience is broad, mobile-first, and not expected to learn new interaction behaviors in order to use the site successfully.

The product should use familiar web patterns for scrolling, section navigation, form completion, validation, and confirmation. This reduces cognitive load and supports trust.

The product's uniqueness should come from refinement rather than invention. The distinctive layer should be the emotional tone, strong hierarchy, elegant typography, and well-paced RSVP flow rather than experimental interaction mechanics.

### 2.5 Experience Mechanics

**Initiation**

The experience begins when a guest opens a shared link from a messaging app or browser. The first screen should immediately communicate the couple names, wedding date, and a clear path forward through visible calls to action and obvious information hierarchy.

**Interaction**

The guest should move through the page in a natural single-page flow: hero, event details, venue, schedule, RSVP, FAQ, and contact. Each section should feel clearly separated and easy to scan.

Within RSVP, the guest should provide only the necessary information, make an attendance decision, and submit using a clear and visually prominent action.

**Feedback**

During the interaction, the interface should continuously support confidence through section clarity, clear labels, inline validation, visible button states, and explicit submission progress. Errors should be localized and understandable rather than generic or disruptive.

**Completion**

After submission, the system should present a clear confirmation state that reassures the guest that the response has been recorded. Where appropriate, the interface may also offer immediate next actions such as reviewing venue details, saving the event to a calendar, or checking contact information for follow-up questions.

The completion moment should feel resolved and trustworthy.

## Visual Design Foundation

### Color System

The color system should support a calm, elegant, and premium tone while maintaining strong readability and accessibility. The palette should feel warm and personal without becoming visually noisy or overly decorative.

**Primary Palette:**

The primary accent color should be a soft, warm tone such as muted rose, soft gold, or sage green. This color should be used sparingly for calls-to-action, highlights, and moments where wedding warmth is appropriate. The accent should feel elegant rather than bright or saturated.

The neutral base should use an off-white background such as #FAFAFA or #F8F8F8 rather than pure white. This creates a softer, more refined feel that reduces visual harshness on screens.

Text colors should follow a three-tier hierarchy:
- Primary text in near-black (#1A1A1A) for main content
- Secondary text in medium gray (#6B6B6B) for metadata and labels
- Tertiary text in light gray (#A0A0A0) for hints and placeholders

**Semantic Colors:**

Success states should use soft green tones, error states should use soft red tones, and warning states should use soft amber tones. All semantic colors should maintain sufficient contrast for accessibility while feeling restrained rather than alarming.

**Accessibility:**

All text and interactive elements must meet WCAG AA contrast requirements at minimum. Primary text should achieve at least 4.5:1 contrast ratio, and large text should achieve at least 3:1 contrast ratio.

### Typography System

The typography system should create strong hierarchy through size, weight, and spacing rather than relying on color or decoration. The approach should feel premium and readable, inspired by Apple's typographic restraint.

**Font Strategy:**

For fastest implementation and most reliable rendering, the product should use system font stacks for both headings and body text. This approach provides zero load time, excellent cross-platform rendering, and an Apple-like premium feel.

The recommended stack is: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`

If additional personality is needed after MVP, headings may be refined with a web font such as a serif typeface (Playfair Display, Lora, or Crimson Pro) while keeping body text in a highly readable sans-serif or system font.

**Type Scale:**

The type scale should be designed mobile-first with the following baseline sizes:
- Hero heading (H1): 2.5rem with line-height 1.1 and weight 700
- Section heading (H2): 1.875rem with line-height 1.2 and weight 600
- Subsection heading (H3): 1.5rem with line-height 1.3 and weight 600
- Large body text: 1.125rem with line-height 1.6 and weight 400
- Standard body text: 1rem with line-height 1.6 and weight 400
- Small body text: 0.875rem with line-height 1.5 and weight 400
- Label text: 0.75rem with line-height 1.4, weight 500, uppercase with letter-spacing

On desktop, hero and section headings should scale up approximately 20% to maintain visual impact on larger screens.

### Spacing & Layout Foundation

The spacing system should create generous breathing room, especially on mobile, to support calm and readability. The foundation should use an 8px base unit with a consistent scale.

**Spacing Scale:**

The spacing scale should follow: 4px (xs), 8px (sm), 16px (md), 24px (lg), 32px (xl), 48px (2xl), 64px (3xl), and 96px (4xl).

**Layout Principles:**

Sections should be separated by at least 64px on mobile and 96px on desktop to create clear visual boundaries. Body text should be constrained to a comfortable reading width of approximately 65 characters and centered within its container.

All interactive elements should meet a minimum touch target size of 44x44px to support comfortable mobile interaction. Section containers should use 24px padding on mobile and 32px padding on desktop.

**Grid System:**

Mobile layouts should use a single-column approach with full-width sections and consistent side padding. Tablet layouts should use an 8-column grid, and desktop layouts should use a 12-column grid with a maximum container width of approximately 1200px.

**Visual Refinement:**

Buttons and form inputs should use an 8px corner radius for a friendly, approachable feel. Cards and section containers should use a 12px corner radius for a softer, more elegant appearance. Small UI elements should use a 4px corner radius.

Elevation should be applied subtly. Standard elements should use a light shadow such as `0 1px 3px rgba(0,0,0,0.08)`. Hovered cards should use `0 4px 12px rgba(0,0,0,0.12)`. Modals and dialogs should use `0 8px 24px rgba(0,0,0,0.16)`.

### Accessibility Considerations

All color choices must meet WCAG AA contrast requirements. Text contrast should achieve at least 4.5:1 for normal text and 3:1 for large text.

Focus states should use a clear 2px outline in the accent color to support keyboard navigation. All interactive elements should meet the minimum 44x44px touch target size.

Motion and animation should respect the `prefers-reduced-motion` user preference. When this preference is detected, animations should be disabled or significantly reduced.

Semantic HTML should be used throughout, with proper heading hierarchy, form labels, and ARIA attributes where appropriate to support screen readers and assistive technologies.

## Design Direction Decision

### Design Directions Explored

The design direction was established through synthesis of the visual foundation, inspiration analysis, and core experience requirements rather than through multiple divergent mockup explorations. This approach was appropriate given the well-defined wedding website structure and the clear design principles already established.

The exploration focused on a single cohesive direction that integrates:
- Airbnb's hero image and hierarchy approach
- Notion's generous spacing and calm interface philosophy
- Apple's typography-driven premium feel
- Mobile-first responsive behavior
- Clarity-over-decoration principle

### Chosen Direction

The chosen design direction is **Elegant Clarity**, which prioritizes immediate comprehension, calm confidence, and wedding-appropriate warmth without sacrificing usability.

**Layout Structure:**

The layout uses a full-width hero section with couple photo and overlaid names and date, followed by a vertical single-page flow of clearly separated content sections. Each section feels distinct through card-based visual treatment with subtle elevation and generous spacing. The maximum content width is constrained to approximately 1200px and centered, with consistent side padding on mobile.

**Visual Weight:**

The visual weight is light to medium density. The interface avoids cramped layouts while also avoiding excessive sparseness. Hierarchy is created primarily through typography size, weight, and spacing rather than through color or decoration. Imagery is elegant and purposeful rather than decorative or distracting.

**Interaction Style:**

All interactions use established web patterns. Guests scroll vertically through content, tap clear buttons and links, and complete forms using familiar input controls. Validation happens inline as fields are completed. Primary calls-to-action are visually prominent and may use sticky positioning for persistent access. One-tap actions such as "Add to Calendar" and "Open Map" provide immediate utility without unnecessary steps.

**Component Approach:**

The component set includes:
- Hero section with full-width image and text overlay
- Section containers with subtle card styling and generous padding
- RSVP form with clear labels, appropriate input types, and inline validation
- FAQ accordion using progressive disclosure
- Confirmation panel with explicit success messaging and response summary
- Venue card with map integration
- Timeline or schedule block with clear visual separation
- Contact block with direct action links

**Color Application:**

The accent color is a soft warm tone such as muted rose, soft gold, or sage green, applied sparingly to calls-to-action, highlights, and moments requiring emphasis. The base background uses off-white (#FAFAFA) to create a softer feel than pure white. Text follows a three-tier hierarchy with near-black primary text, medium gray secondary text, and light gray tertiary text. Semantic colors use soft green for success, soft red for errors, and soft amber for warnings.

**Typography Application:**

The typography uses system font stacks for fastest rendering and Apple-like premium feel. Hierarchy is created through size and weight rather than color. Body text uses a generous 1.6 line-height for comfortable reading. Hero and section headings scale up approximately 20% on desktop to maintain visual impact.

### Design Rationale

This direction was chosen because it directly supports the core experience goals and emotional design principles established earlier in the specification.

The Airbnb-inspired hero immediately orients guests with couple names, date, and visual context. The Notion-inspired spacing creates calm and reduces cognitive load. The Apple-inspired typography creates premium feel through restraint rather than decoration.

The single-page vertical flow matches the mental model of guests who expect to move through event information in a natural sequence. The card-based section separation creates clear visual boundaries without requiring complex navigation.

The restrained color palette and typography-driven hierarchy support the "clarity over decoration" principle. The mobile-first responsive approach ensures the experience works well for the primary usage context.

### Implementation Approach

Implementation should begin with the hero section and progress through the vertical flow in the order guests will encounter content: hero, event details, venue, schedule, RSVP, FAQ, contact.

Each section should be built as a self-contained component with consistent padding, spacing, and visual treatment. The RSVP form should receive special attention to ensure inline validation, clear error states, and explicit confirmation feedback.

Responsive behavior should be tested continuously during implementation, with mobile layouts validated before desktop refinements. Typography scale, spacing, and touch target sizes should be verified against the established foundation.

The visual design should remain flexible enough to accommodate real content and imagery without breaking hierarchy or readability. Component styling should support both light and dense content gracefully.
