```md
# Yuvabe Minimal Figma Setup Spec
Version: 0.1  
Purpose: Minimum structure and styles needed for a Figma MCP to set up the initial design system  
Scope: Foundations, variables, text styles, basic components, and page structure only

---

## 1. Goal

This spec is only for setting up the **minimal Figma design system structure**.

It should include:
- page setup
- color variables
- spacing variables
- radius variables
- shadow styles
- text styles
- a very small first component set

It should not include:
- long brand explanation
- governance notes
- marketing copy rules
- extended templates
- speculative future patterns

---

## 2. Figma file structure

Create these pages in this order:

1. `Foundations`
2. `Variables`
3. `Text Styles`
4. `Components`
5. `Patterns`
6. `Playground`
7. `Archive`

### 2.1 Purpose of each page

#### `Foundations`
Static reference for:
- logo usage samples
- brand colors preview
- typography preview
- icon style preview
- gradient preview

#### `Variables`
All design tokens as Figma variables:
- color
- spacing
- radius
- shadow
- motion if needed later

#### `Text Styles`
Published text styles for:
- display
- headings
- body
- labels
- caption

#### `Components`
Core reusable components only:
- button
- input
- textarea
- select
- checkbox
- radio
- toggle
- badge
- card
- alert or callout
- navbar
- footer

#### `Patterns`
Basic layout blocks using components:
- hero
- feature section
- CTA band
- contact form block

#### `Playground`
Free experimentation area for testing compositions before publishing.

#### `Archive`
Deprecated or replaced styles and components.

---

## 3. Variable collections

Create these variable collections:

1. `Color`
2. `Spacing`
3. `Radius`
4. `Shadow`

Do not create more collections unless needed.

---

## 4. Color variables

### 4.1 Primitive brand colors

Create these primitive variables:

- `purple/500 = #5829C7`
- `yellow/500 = #FFCA2D`

- `orange/500 = #F9A91F`
- `orange/200 = #FADF90`
- `green/500 = #90C645`
- `green/200 = #C8E3A2`
- `lavender/500 = #9688C0`
- `lavender/200 = #CBC3DF`
- `cyan/500 = #2BB7C7`
- `cyan/200 = #94DBE4`
- `red-orange/500 = #F04E28`
- `peach/200 = #F7A793`

### 4.2 Primitive neutral colors

Create these neutral variables:

- `neutral/0 = #FFFFFF`
- `neutral/25 = #FCFCFD`
- `neutral/50 = #F8F8FA`
- `neutral/100 = #F1F2F4`
- `neutral/200 = #E5E7EB`
- `neutral/300 = #D1D5DB`
- `neutral/400 = #9CA3AF`
- `neutral/500 = #6B7280`
- `neutral/600 = #4B5563`
- `neutral/700 = #374151`
- `neutral/800 = #1F2937`
- `neutral/900 = #111827`
- `neutral/950 = #0B0F19`

### 4.3 Semantic color variables

Create these semantic variables:

#### Text
- `color/text/primary = neutral/900`
- `color/text/secondary = neutral/700`
- `color/text/tertiary = neutral/500`
- `color/text/inverse = neutral/0`
- `color/text/brand = purple/500`

#### Icons
- `color/icon/primary = neutral/800`
- `color/icon/secondary = neutral/600`
- `color/icon/inverse = neutral/0`
- `color/icon/brand = purple/500`

#### Background
- `color/background/canvas = neutral/25`
- `color/background/surface = neutral/0`
- `color/background/surface-subtle = neutral/50`
- `color/background/brand = purple/500`
- `color/background/brand-subtle = lavender/200`
- `color/background/warm = yellow/500`

#### Border
- `color/border/default = neutral/200`
- `color/border/strong = neutral/300`
- `color/border/brand = purple/500`
- `color/border/focus = purple/500`

#### Actions
- `color/action/primary/bg = purple/500`
- `color/action/primary/text = neutral/0`
- `color/action/primary/hover = #4C24AB`

- `color/action/secondary/bg = neutral/0`
- `color/action/secondary/text = neutral/900`
- `color/action/secondary/border = neutral/300`
- `color/action/secondary/hover = neutral/50`

- `color/action/ghost/text = neutral/800`
- `color/action/ghost/hover = neutral/100`

#### Feedback
- `color/feedback/success/bg = #EAF6D8`
- `color/feedback/success/text = #335C12`

- `color/feedback/warning/bg = #FFF3CC`
- `color/feedback/warning/text = #7A5900`

- `color/feedback/error/bg = #FDE3DC`
- `color/feedback/error/text = #8A2E18`

- `color/feedback/info/bg = #DDF3F6`
- `color/feedback/info/text = #0E5D66`

---

## 5. Spacing variables

Use a lean 8px-based spacing scale.

Create these variables:

- `space/025 = 2`
- `space/050 = 4`
- `space/100 = 8`
- `space/150 = 12`
- `space/200 = 16`
- `space/300 = 24`
- `space/400 = 32`
- `space/500 = 40`
- `space/600 = 48`
- `space/800 = 64`
- `space/1000 = 80`
- `space/1200 = 96`

---

## 6. Radius variables

Create these variables:

- `radius/none = 0`
- `radius/sm = 4`
- `radius/md = 8`
- `radius/lg = 12`
- `radius/xl = 16`
- `radius/pill = 999`

Use as defaults:
- buttons: `radius/md`
- inputs: `radius/md`
- cards: `radius/lg`
- large panels: `radius/xl`

---

## 7. Shadow styles

Create these shadow styles or effect tokens:

- `shadow/none = none`
- `shadow/sm = 0 1px 2px rgba(11,15,25,0.06)`
- `shadow/md = 0 6px 16px rgba(11,15,25,0.08)`
- `shadow/lg = 0 16px 32px rgba(11,15,25,0.12)`

Use only these three visible elevation levels.

---

## 8. Typography setup

### 8.1 Font families

Create font references:
- `Display = Clash Display`
- `Body = Gilroy`

### 8.2 Font weights

Use only:
- Clash Display: `500`, `600`
- Gilroy: `400`, `500`, `600`

### 8.3 Text styles

Create these text styles exactly:

#### Display
- `Text/Display/XL`
  - Font: Clash Display
  - Weight: 600
  - Size: 64
  - Line height: 72
  - Letter spacing: -2%

- `Text/Display/LG`
  - Font: Clash Display
  - Weight: 600
  - Size: 48
  - Line height: 56
  - Letter spacing: -2%

#### Headings
- `Text/Heading/XL`
  - Font: Clash Display
  - Weight: 600
  - Size: 40
  - Line height: 48
  - Letter spacing: -2%

- `Text/Heading/LG`
  - Font: Clash Display
  - Weight: 600
  - Size: 32
  - Line height: 40
  - Letter spacing: -1.5%

- `Text/Heading/MD`
  - Font: Clash Display
  - Weight: 500
  - Size: 24
  - Line height: 32
  - Letter spacing: -1%

- `Text/Heading/SM`
  - Font: Gilroy
  - Weight: 600
  - Size: 20
  - Line height: 28
  - Letter spacing: -1%

#### Body
- `Text/Body/LG`
  - Font: Gilroy
  - Weight: 400
  - Size: 18
  - Line height: 28
  - Letter spacing: 0%

- `Text/Body/MD`
  - Font: Gilroy
  - Weight: 400
  - Size: 16
  - Line height: 24
  - Letter spacing: 0%

- `Text/Body/SM`
  - Font: Gilroy
  - Weight: 400
  - Size: 14
  - Line height: 20
  - Letter spacing: 0%

#### Labels
- `Text/Label/LG`
  - Font: Gilroy
  - Weight: 500
  - Size: 16
  - Line height: 24
  - Letter spacing: 0%

- `Text/Label/MD`
  - Font: Gilroy
  - Weight: 500
  - Size: 14
  - Line height: 20
  - Letter spacing: 0%

- `Text/Label/SM`
  - Font: Gilroy
  - Weight: 500
  - Size: 12
  - Line height: 16
  - Letter spacing: 1%

#### Caption
- `Text/Caption`
  - Font: Gilroy
  - Weight: 400
  - Size: 12
  - Line height: 16
  - Letter spacing: 1%

### 8.4 Typography usage rule

Use Clash Display only for:
- hero text
- major headings
- section titles

Use Gilroy for:
- body text
- labels
- buttons
- forms
- navigation
- cards
- captions

---

## 9. Base grids and frames

Create these base frame presets:

### Desktop
- Width: `1440`
- Columns: `12`
- Margin: `80`
- Gutter: `24`

### Tablet
- Width: `1024`
- Columns: `8`
- Margin: `40`
- Gutter: `20`

### Mobile
- Width: `390`
- Columns: `4`
- Margin: `16`
- Gutter: `16`

---

## 10. Foundation styles to visually preview on the Foundations page

Create simple reference blocks for:
- logo on light and dark backgrounds
- primary color palette
- accent palette
- neutral palette
- gradient sample
- typography scale preview
- radius preview
- shadow preview
- icon size preview at 16, 20, 24

This page is reference-only and should not contain editable components.

---

## 11. Minimal component set to create first

Create only these components in the first pass:

1. `Button`
2. `Input`
3. `Textarea`
4. `Select`
5. `Checkbox`
6. `Radio`
7. `Toggle`
8. `Badge`
9. `Card`
10. `Callout`
11. `Navbar`
12. `Footer`

Do not create more components in the initial MCP run.

---

## 12. Component structure rules

For each component:
- use auto layout
- use variables, not hardcoded values
- create clear variants only where needed
- include default, hover, focus, active, disabled states where relevant
- keep the number of sizes minimal
- use semantic colors

---

## 13. Initial component specs

### 13.1 Button
Create:
- `Button/Primary`
- `Button/Secondary`
- `Button/Ghost`

Sizes:
- `MD`
- `LG`

States:
- default
- hover
- focus
- disabled

Default style guidance:
- horizontal padding: `space/300`
- vertical padding: `space/150`
- gap between icon and text: `space/100`
- radius: `radius/md`

### 13.2 Input
Create:
- `Input/Default`
- `Input/Error`

States:
- default
- focus
- disabled

Structure:
- label
- field
- helper text
- error text

Default style guidance:
- field height: `44`
- horizontal padding: `space/200`
- radius: `radius/md`
- border: `color/border/default`

### 13.3 Textarea
Create:
- default
- error

Use same token structure as Input.

### 13.4 Select
Create:
- default
- open
- disabled

Use same visual language as Input.

### 13.5 Checkbox
Create:
- unchecked
- checked
- disabled

### 13.6 Radio
Create:
- unchecked
- checked
- disabled

### 13.7 Toggle
Create:
- off
- on
- disabled

### 13.8 Badge
Create:
- neutral
- brand
- success
- warning
- error

### 13.9 Card
Create:
- `Card/Default`
- `Card/Highlighted`
- `Card/Interactive`

Default guidance:
- padding: `space/300`
- radius: `radius/lg`
- background: `color/background/surface`
- border: `color/border/default`
- shadow: `shadow/sm`

### 13.10 Callout
Create:
- info
- success
- warning
- error

Default guidance:
- padding: `space/300`
- radius: `radius/lg`

### 13.11 Navbar
Create a basic responsive navbar with:
- logo slot
- nav links
- CTA button slot

### 13.12 Footer
Create a minimal footer with:
- logo slot
- link groups
- copyright text

---

## 14. Patterns page setup

Create only these patterns:
- `Pattern/Hero`
- `Pattern/Feature Grid`
- `Pattern/CTA Band`
- `Pattern/Contact Form`

Each pattern should use only published components and text styles.

---

## 15. Naming conventions

Use slash naming consistently.

### Variables
- `color/text/primary`
- `color/background/surface`
- `space/300`
- `radius/md`

### Text styles
- `Text/Display/XL`
- `Text/Heading/LG`
- `Text/Body/MD`

### Components
- `Button/Primary/LG`
- `Input/Default`
- `Card/Interactive`

### Patterns
- `Pattern/Hero`
- `Pattern/CTA Band`

---

## 16. MCP execution priorities

When rendering this in Figma, do the work in this order:

1. create pages
2. create variable collections
3. create primitive variables
4. create semantic variables
5. create text styles
6. create base grids and frame presets
7. create core components
8. create patterns using components

---

## 17. Constraints

- keep the system lean
- do not create unused variants
- do not invent extra tokens beyond this spec
- do not create dark mode
- do not create app-specific patterns
- do not create extra templates
- do not create illustrations
- do not use gradients inside components
- do not use Clash Display in forms or dense UI

---

## 18. Output expectation

At the end of setup, the Figma file should contain:
- a clean page structure
- published variables for color, spacing, radius, shadow
- published text styles
- a minimal reusable component library
- 4 basic patterns using the library

This is the minimum usable starting point for Yuvabe's Figma-based design system.
```
