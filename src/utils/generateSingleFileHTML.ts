/**
 * Generates the complete, 100% self-contained single-file HTML/CSS/JS code
 * for the Cruzeiro do Sul Influencer Campaign Landing Page.
 */
export function generateSingleFileHTML(activeCoupon: string = 'JULIA70'): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Cruzeiro do Sul Virtual | Campanha de Influenciadores 2026</title>
  
  <!-- Google Fonts: Plus Jakarta Sans (Headings), Inter (Body), Space Mono (Monospace Coupon) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,600;0,700;0,800;1,800&family=Space+Mono:wght@700&display=swap" rel="stylesheet">

  <style>
    /* ==========================================================================
       RESET & BASE STYLES
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      /* Brand Palette (Bold Typography Theme) */
      --bg-navy: #001A33;
      --bg-navy-card: rgba(255, 255, 255, 0.05);
      --bg-navy-border: rgba(255, 255, 255, 0.1);
      --yellow-primary: #FFCC00;
      --yellow-hover: #E6B800;
      --yellow-light: #FFF9E0;
      --form-sheet-bg: #F5F5F0;
      --text-dark: #001A33;
      --text-light: #FFFFFF;
      --text-muted: #94A3B8;
      --green-accent: #10B981;
      --green-glow: rgba(16, 185, 129, 0.2);
      
      /* Typography */
      --font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Space Mono', monospace;
    }

    body {
      background-color: var(--bg-navy);
      color: var(--text-light);
      font-family: var(--font-body);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      padding-bottom: 90px; /* Space for sticky bottom CTA */
    }

    /* Mobile Container Wrapper (Max 480px, centered on wide screens) */
    .mobile-shell {
      max-width: 480px;
      margin: 0 auto;
      background-color: var(--bg-navy);
      min-height: 100vh;
      position: relative;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
      overflow: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* ==========================================================================
       TOP BAR & HEADER
       ========================================================================== */
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      background-color: rgba(0, 26, 51, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--yellow-primary), #FF9900);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-heading);
      font-weight: 800;
      color: var(--text-dark);
      font-size: 18px;
      box-shadow: 0 2px 10px rgba(255, 209, 0, 0.3);
    }

    .brand-text {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 15px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .brand-text span {
      color: var(--yellow-primary);
      display: block;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Live status badge */
    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background-color: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 100px;
      font-size: 11px;
      font-weight: 600;
      color: #34D399;
    }

    .live-dot {
      width: 7px;
      height: 7px;
      background-color: var(--green-accent);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--green-accent);
      animation: pulse-dot 1.8s infinite;
    }

    @keyframes pulse-dot {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px var(--green-accent); }
      100% { transform: scale(0.95); opacity: 0.8; }
    }

    /* ==========================================================================
       HERO SECTION (DARK MAP / ROUTE MOTIF)
       ========================================================================== */
    .hero-section {
      padding: 24px 20px 28px;
      position: relative;
      background: radial-gradient(circle at 50% 0%, #10214D 0%, var(--bg-navy) 75%);
    }

    /* SVG Map & Route Graphic Background */
    .map-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.22;
      pointer-events: none;
      z-index: 0;
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .campaign-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 209, 0, 0.12);
      border: 1px solid rgba(255, 209, 0, 0.3);
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      color: var(--yellow-primary);
      margin-bottom: 16px;
    }

    .hero-title {
      font-family: var(--font-heading);
      font-size: 28px;
      font-weight: 800;
      line-height: 1.18;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
      color: #FFFFFF;
    }

    .hero-title highlight {
      color: var(--yellow-primary);
      background: linear-gradient(180deg, transparent 65%, rgba(255, 209, 0, 0.25) 65%);
    }

    .hero-subtitle {
      font-size: 14px;
      color: #D1D5DB;
      margin-bottom: 22px;
      line-height: 1.5;
    }

    /* Route Graphic Container (Mobility App Pin Reference) */
    .route-card {
      background: rgba(10, 19, 41, 0.85);
      border: 1px solid var(--bg-navy-border);
      border-radius: 18px;
      padding: 16px;
      margin-bottom: 24px;
      position: relative;
      backdrop-filter: blur(8px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }

    .route-step {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }

    .route-step:not(:last-child) {
      margin-bottom: 14px;
    }

    .route-line {
      position: absolute;
      left: 13px;
      top: 24px;
      bottom: -10px;
      width: 2px;
      background: dashed 2px var(--yellow-primary);
      border-left: 2px dashed rgba(255, 209, 0, 0.5);
    }

    .pin-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
      z-index: 1;
    }

    .pin-start {
      background-color: rgba(255, 255, 255, 0.15);
      color: #FFF;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .pin-end {
      background-color: var(--yellow-primary);
      color: var(--text-dark);
      box-shadow: 0 0 12px rgba(255, 209, 0, 0.6);
    }

    .route-info {
      flex: 1;
    }

    .route-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      font-weight: 600;
    }

    .route-value {
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
    }

    /* Direct Pill CTA Button */
    .pill-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 16px 20px;
      background-color: var(--yellow-primary);
      color: var(--text-dark);
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 15px;
      border-radius: 100px;
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(255, 209, 0, 0.35);
      transition: all 0.2s ease;
    }

    .pill-cta:hover, .pill-cta:active {
      background-color: var(--yellow-hover);
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(255, 209, 0, 0.45);
    }

    .pill-cta .arrow-circle {
      width: 28px;
      height: 28px;
      background-color: var(--text-dark);
      color: var(--yellow-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    /* ==========================================================================
       BENEFITS GRID (4 CARDS)
       ========================================================================== */
    .benefits-section {
      padding: 0 20px 28px;
    }

    .section-title-sm {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      font-weight: 700;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .benefit-card {
      background-color: var(--bg-navy-card);
      border: 1px solid var(--bg-navy-border);
      border-radius: 14px;
      padding: 14px;
      position: relative;
      overflow: hidden;
    }

    .benefit-icon {
      width: 34px;
      height: 34px;
      background: rgba(255, 209, 0, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin-bottom: 10px;
      color: var(--yellow-primary);
    }

    .benefit-title {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .benefit-desc {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.3;
    }

    .benefit-tag {
      display: inline-block;
      margin-top: 8px;
      font-size: 9px;
      font-weight: 700;
      color: var(--yellow-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ==========================================================================
       COUPON HIGHLIGHT CARD
       ========================================================================== */
    .coupon-section {
      padding: 0 20px 28px;
    }

    .coupon-highlight-card {
      background: linear-gradient(135deg, #0F1D40 0%, #081024 100%);
      border: 1.5px dashed var(--yellow-primary);
      border-radius: 18px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }

    .coupon-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .creator-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.08);
      padding: 4px 10px 4px 6px;
      border-radius: 100px;
    }

    .creator-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--yellow-primary);
      color: var(--text-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
    }

    .creator-handle {
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .discount-badge {
      background-color: var(--yellow-primary);
      color: var(--text-dark);
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 100px;
      letter-spacing: -0.02em;
    }

    .coupon-code-box {
      background-color: rgba(4, 9, 20, 0.8);
      border: 1px solid rgba(255, 209, 0, 0.3);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .coupon-code-text {
      font-family: var(--font-mono);
      font-size: 18px;
      font-weight: 700;
      color: var(--yellow-primary);
      letter-spacing: 0.1em;
    }

    .copy-btn {
      background: rgba(255, 255, 255, 0.12);
      border: none;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.22);
    }

    .coupon-footer-text {
      font-size: 11px;
      color: #9CA3AF;
      text-align: center;
    }

    /* ==========================================================================
       FORM CARD ("BOTTOM SHEET" LIGHT & ROUNDED)
       ========================================================================== */
    .form-section {
      padding: 0 16px 28px;
    }

    .form-sheet-card {
      background-color: var(--form-sheet-bg);
      color: var(--text-dark);
      border-radius: 28px;
      padding: 24px 20px 28px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      position: relative;
    }

    /* Drag Handle Bar (Mobility App Style) */
    .sheet-handle {
      width: 44px;
      height: 5px;
      background-color: #E5E7EB;
      border-radius: 100px;
      margin: 0 auto 16px;
    }

    .form-header {
      margin-bottom: 20px;
      text-align: center;
    }

    .form-title {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 800;
      color: var(--text-dark);
      line-height: 1.2;
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }

    .form-subtitle {
      font-size: 13px;
      color: #4B5563;
    }

    /* Form Fields & Visible Focus States */
    .field-group {
      margin-bottom: 16px;
      text-align: left;
    }

    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      color: #6B7280;
      font-size: 16px;
      pointer-events: none;
    }

    .form-input {
      width: 100%;
      padding: 14px 14px 14px 42px;
      background-color: #FFFFFF;
      border: 1.5px solid #D1D5DB;
      border-radius: 12px;
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--text-dark);
      outline: none;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    /* Visible Focus State (Required) */
    .form-input:focus {
      border-color: #0A1329;
      box-shadow: 0 0 0 3.5px rgba(10, 19, 41, 0.18);
      background-color: #FFFFFF;
    }

    .form-input.coupon-input {
      font-family: var(--font-mono);
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #0A1329;
      background-color: #FFFDF5;
      border-color: #FBBF24;
    }

    .form-input.coupon-input:focus {
      border-color: #D97706;
      box-shadow: 0 0 0 3.5px rgba(217, 119, 6, 0.2);
    }

    .coupon-status-tag {
      position: absolute;
      right: 12px;
      font-size: 11px;
      font-weight: 700;
      color: #059669;
      background-color: #D1FAE5;
      padding: 4px 8px;
      border-radius: 6px;
    }

    /* Submit Button (Confirm Ride Style with Arrow Circle) */
    .submit-btn {
      width: 100%;
      padding: 18px 20px;
      background-color: var(--yellow-primary);
      color: var(--text-dark);
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 16px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      box-shadow: 0 8px 20px rgba(255, 209, 0, 0.4);
      transition: all 0.2s ease;
    }

    .submit-btn:hover {
      background-color: var(--yellow-hover);
      box-shadow: 0 10px 25px rgba(255, 209, 0, 0.5);
    }

    .submit-btn:active {
      transform: scale(0.99);
    }

    .arrow-icon-circle {
      width: 32px;
      height: 32px;
      background-color: var(--text-dark);
      color: var(--yellow-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: transform 0.2s ease;
    }

    .submit-btn:hover .arrow-icon-circle {
      transform: translateX(3px);
    }

    /* Form Confirmation Success State */
    .confirmation-state {
      display: none;
      text-align: center;
      padding: 12px 0;
    }

    .success-icon-badge {
      width: 64px;
      height: 64px;
      background-color: #D1FAE5;
      color: #059669;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin: 0 auto 16px;
    }

    .confirmation-title {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 800;
      color: var(--text-dark);
      margin-bottom: 8px;
    }

    .confirmation-text {
      font-size: 14px;
      color: #4B5563;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .whatsapp-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 16px;
      background-color: #25D366;
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 15px;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
    }

    /* ==========================================================================
       FAQ SECTION (ACCORDION)
       ========================================================================== */
    .faq-section {
      padding: 0 20px 28px;
    }

    .faq-title-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .faq-title-icon {
      width: 28px;
      height: 28px;
      background: rgba(255, 204, 0, 0.1);
      border: 1px solid rgba(255, 204, 0, 0.3);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--yellow-primary);
      font-size: 14px;
      font-weight: 800;
    }

    .faq-title-text {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
    }

    .faq-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .faq-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .faq-item.active {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 204, 0, 0.4);
    }

    .faq-question-btn {
      width: 100%;
      background: transparent;
      border: none;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      text-align: left;
      cursor: pointer;
    }

    .faq-chevron {
      color: var(--yellow-primary);
      font-size: 12px;
      transition: transform 0.3s ease;
    }

    .faq-item.active .faq-chevron {
      transform: rotate(180deg);
    }

    .faq-answer-content {
      display: none;
      padding: 0 16px 16px;
      font-size: 12px;
      color: rgba(219, 234, 254, 0.9);
      line-height: 1.6;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      margin-top: 4px;
      padding-top: 12px;
    }

    .faq-item.active .faq-answer-content {
      display: block;
    }
      font-weight: 700;
      background: rgba(255, 255, 255, 0.08);
      padding: 4px 8px;
      border-radius: 6px;
      color: #D1D5DB;
    }

    .testimonial-scroll {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }

    .testimonial-scroll::-webkit-scrollbar {
      display: none;
    }

    .testimonial-card {
      min-width: 260px;
      background-color: var(--bg-navy-card);
      border: 1px solid var(--bg-navy-border);
      border-radius: 14px;
      padding: 16px;
      scroll-snap-align: start;
    }

    .testimonial-quote {
      font-size: 12px;
      color: #E5E7EB;
      margin-bottom: 12px;
      line-height: 1.4;
      font-style: italic;
    }

    .testimonial-user {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-avatar-dummy {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #2563EB;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
    }

    .user-info {
      font-size: 11px;
    }

    .user-name {
      font-weight: 700;
      color: #FFFFFF;
    }

    .user-course {
      color: var(--text-muted);
    }

    /* ==========================================================================
       FOOTER
       ========================================================================== */
    .footer-section {
      padding: 20px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 11px;
      color: #6B7280;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    /* ==========================================================================
       FLOATING STICKY CTA BUTTON (Appears when form is off-screen)
       ========================================================================== */
    .sticky-bottom-cta {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      padding: 12px 16px 16px;
      background: linear-gradient(0deg, rgba(4, 9, 20, 0.98) 70%, rgba(4, 9, 20, 0) 100%);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }

    .sticky-bottom-cta.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .sticky-btn {
      width: 100%;
      max-width: 440px;
      padding: 16px 20px;
      background-color: var(--yellow-primary);
      color: var(--text-dark);
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 15px;
      border-radius: 100px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 8px 25px rgba(255, 209, 0, 0.5);
    }

    /* Desktop Responsive Enhancement */
    @media (min-width: 768px) {
      body {
        padding-bottom: 0;
      }
      .mobile-shell {
        max-width: 1100px;
        border-radius: 32px;
        margin: 40px auto;
        box-shadow: 0 20px 80px rgba(0, 0, 0, 0.9);
      }
      .sticky-bottom-cta {
        display: none !important;
      }
      .hero-title {
        font-size: 38px;
      }
      .hero-subtitle {
        font-size: 16px;
      }
      .benefits-grid {
        gap: 16px;
      }
      .faq-section {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  </style>
</head>
<body>

  <div class="mobile-shell">
    
    <!-- TOP NAVIGATION BAR -->
    <header class="header-bar">
      <div class="brand-logo" style="display: flex; align-items: center; gap: 8px;">
        <img src="cruzeiro_do_sul_virtual%20amarelo.png" alt="Cruzeiro do Sul Virtual" style="height: 38px; width: auto; object-fit: contain;" />
      </div>
      <div class="live-badge">
        <span class="live-dot"></span>
        VAGAS ABRINDO AGORA
      </div>
    </header>

    <!-- HERO SECTION -->
    <section class="hero-section">
      <!-- Dark SVG Route Map Motif Background -->
      <svg class="map-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M -50 50 Q 100 200 200 100 T 450 250" fill="none" stroke="#1E2D53" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M 50 280 Q 250 80 380 180" fill="none" stroke="#FFD100" stroke-width="2.5" stroke-dasharray="6,6"/>
        <circle cx="50" cy="280" r="6" fill="#FFD100"/>
        <circle cx="380" cy="180" r="8" fill="#10B981"/>
      </svg>

      <div class="hero-content">
        <h1 class="hero-title">
          Estude na Cruzeiro do Sul com até <highlight>70% de Bolsa</highlight>
        </h1>

        <p class="hero-subtitle">
          Garanta agora seu desconto. Bolsas até 50% para você começar agora mesmo!
        </p>

        <!-- Pill CTA -->
        <button class="pill-cta" onclick="scrollToForm()">
          <span>GARANTIR DESCONTO DO CUPOM</span>
          <div class="arrow-circle">↓</div>
        </button>
      </div>
    </section>

    <!-- 4 FAST BENEFITS GRID -->
    <section class="benefits-section">
      <div class="section-title-sm">
        <span>⚡</span> POR QUE ESCOLHER A CRUZEIRO DO SUL?
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🎓</div>
          <div class="benefit-title">+200 Cursos</div>
          <div class="benefit-desc">De graduação ou pós-graduação</div>
          <div class="benefit-tag">Nota Máxima MEC</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🏷️</div>
          <div class="benefit-title">Bolsas até 50%</div>
          <div class="benefit-desc">Desconto fixo no curso todo</div>
          <div class="benefit-tag">Garantido por Cupom</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-title">Atendimento Humanizado</div>
          <div class="benefit-desc">Atendimento ágil, feito por pessoas</div>
          <div class="benefit-tag">100% Digital</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⏱️</div>
          <div class="benefit-title">Flexibilidade</div>
          <div class="benefit-desc">Cursos EAD e semipresenciais</div>
          <div class="benefit-tag">Estude do Seu Jeito</div>
        </div>
      </div>
    </section>

    <!-- FORM CARD ("BOTTOM SHEET" LIGHT & ROUNDED) -->
    <section class="form-section" id="formSection">
      <div class="form-sheet-card">
        <div class="sheet-handle"></div>

        <!-- FORM INPUTS STATE -->
        <div id="formState">
          <div class="form-header">
            <h2 class="form-title">🚀 Resgate Sua Bolsa Agora</h2>
            <p class="form-subtitle">Preencha em 30 segundos para garantir o desconto</p>
          </div>

          <form id="leadForm" onsubmit="handleFormSubmit(event)">
            <!-- Nome Completo -->
            <div class="field-group">
              <label class="field-label" for="fullName">Nome Completo</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="fullName" 
                  class="form-input" 
                  placeholder="Seu nome completo" 
                  required 
                />
              </div>
            </div>

            <!-- WhatsApp com Máscara -->
            <div class="field-group">
              <label class="field-label" for="whatsapp">WhatsApp / Telefone</label>
              <div class="input-wrapper">
                <span class="input-icon">💬</span>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  class="form-input" 
                  placeholder="(00) 90000-0000" 
                  required 
                  oninput="maskPhone(this)"
                />
              </div>
            </div>

            <!-- Modalidade do Curso -->
            <div class="field-group">
              <label class="field-label" for="courseType">Modalidade do Curso</label>
              <div class="input-wrapper">
                <span class="input-icon">🎓</span>
                <select id="courseType" class="form-input" style="appearance: auto; cursor: pointer;">
                  <option value="Graduação">Graduação</option>
                  <option value="Pós-graduação">Pós-graduação</option>
                </select>
              </div>
            </div>

            <!-- Botão de Confirmação -->
            <button type="submit" class="submit-btn">
              <span>RESGATAR BOLSA</span>
              <div class="arrow-icon-circle">➔</div>
            </button>
          </form>
        </div>

        <!-- CONFIRMATION STATE (Shows after submission) -->
        <div class="confirmation-state" id="confirmationState">
          <div class="success-icon-badge">✓</div>
          <h3 class="confirmation-title">Pré-Reserva Garantida!</h3>
          <p class="confirmation-text">
            Sua bolsa com o cupom <strong id="sentCouponCode"></strong> foi reservada com sucesso. Nosso consultor já está pronto para te atender!
          </p>
          <a href="#" id="whatsappLink" target="_blank" class="whatsapp-btn">
            <span>💬 ABBRIR NO WHATSAPP AGORA</span>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION (ACCORDIONS) -->
    <section class="faq-section">
      <div class="faq-title-header">
        <div class="faq-title-icon">?</div>
        <h2 class="faq-title-text">Dúvidas Frequentes</h2>
      </div>

      <div class="faq-container">
        <div class="faq-item active" onclick="toggleFaq(this)">
          <button type="button" class="faq-question-btn">
            <span>Como funciona o desconto com o cupom do criador?</span>
            <span class="faq-chevron">▼</span>
          </button>
          <div class="faq-answer-content">
            Ao preencher o formulário com o cupom do seu criador parceiro, você garante bolsas até 50% no valor das suas mensalidades para cursos de Graduação EAD/Semipresencial ou Pós-Graduação.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <button type="button" class="faq-question-btn">
            <span>A bolsa até 50% vale durante todo o curso?</span>
            <span class="faq-chevron">▼</span>
          </button>
          <div class="faq-answer-content">
            Sim! O desconto garantido no momento da sua inscrição nesta campanha permanece ativo do início ao fim da sua graduação ou pós-graduação.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <button type="button" class="faq-question-btn">
            <span>A Cruzeiro do Sul é reconhecida pelo MEC?</span>
            <span class="faq-chevron">▼</span>
          </button>
          <div class="faq-answer-content">
            Com certeza! A Cruzeiro do Sul Virtual possui Nota Máxima (Nota 5) no MEC. O seu diploma EAD tem exatamente o mesmo valor e reconhecimento de um diploma presencial.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <button type="button" class="faq-question-btn">
            <span>Como funciona a modalidade EAD e Semipresencial?</span>
            <span class="faq-chevron">▼</span>
          </button>
          <div class="faq-answer-content">
            No EAD você estuda com total flexibilidade de horário pela plataforma virtual interativa. No Semipresencial, você combina aulas online com momentos práticos e provas em um dos polos mais próximos.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <button type="button" class="faq-question-btn">
            <span>A mensalidade vai aumentar depois?</span>
            <span class="faq-chevron">▼</span>
          </button>
          <div class="faq-answer-content">
            A mensalidade pode ter um reajuste uma vez por ano, referente às atualizações de impostos e custos. Mas pode ficar tranquilo: o percentual da sua bolsa continua o mesmo, garantindo seu desconto durante o curso.
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-section">
      <div class="footer-links">
        <a href="#">Privacidade</a> • 
        <a href="#">Termos de Uso</a> • 
        <a href="#">Regulamento da Campanha</a>
      </div>
      <p>Universidade Cruzeiro do Sul © 2026. Todos os direitos reservados. Seus dados estão seguros nos termos da LGPD.</p>
    </footer>

    <!-- FLOATING STICKY CTA BUTTON -->
    <div class="sticky-bottom-cta" id="stickyCta">
      <button class="sticky-btn" onclick="scrollToForm()">
        <span>⚡ RESGATAR MEU DESCONTO</span>
        <span style="font-size: 18px;">➔</span>
      </button>
    </div>

  </div>

  <!-- JAVASCRIPT -->
  <script>
    // 1. URL Query Parameter Parser for Coupon (?cupom=NOMEDOCRIADOR or ?coupon=...)
    document.addEventListener('DOMContentLoaded', function() {
      const urlParams = new URLSearchParams(window.location.search);
      let couponParam = urlParams.get('cupom') || urlParams.get('coupon');

      if (couponParam && couponParam.trim() !== '') {
        const cleanCoupon = couponParam.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');
        document.getElementById('couponInput').value = cleanCoupon;
        document.getElementById('displayCouponCode').innerText = cleanCoupon;
        document.getElementById('creatorHandle').innerText = '@' + cleanCoupon.toLowerCase();
        document.getElementById('creatorAvatar').innerText = cleanCoupon.charAt(0);
      }

      setupIntersectionObserver();
    });

    // 2. WhatsApp Phone Mask Formatting: (00) 90000-0000
    function maskPhone(input) {
      let value = input.value.replace(/\\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7);
      } else if (value.length > 2) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
      } else if (value.length > 0) {
        value = '(' + value;
      }

      input.value = value;
    }

    // 3. Scroll to Form Card
    function scrollToForm() {
      const formSection = document.getElementById('formSection');
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('fullName').focus();
    }

    // 4. Copy Coupon Code to Clipboard
    function copyCouponText() {
      const code = document.getElementById('displayCouponCode').innerText;
      navigator.clipboard.writeText(code);
      const copyBtn = document.querySelector('.copy-btn');
      copyBtn.innerText = 'Copiado!';
      setTimeout(() => copyBtn.innerText = 'Copiar', 2000);
    }

    // 5. Handle Form Submit & Confirmation Message
    function handleFormSubmit(event) {
      event.preventDefault();
      const name = document.getElementById('fullName').value;
      const phone = document.getElementById('whatsapp').value;
      const coupon = document.getElementById('couponInput').value;

      document.getElementById('sentCouponCode').innerText = coupon;
      
      const whatsappMsg = encodeURIComponent("Olá! Meu nome é " + name + ". Vim pelo cupom " + coupon + " da campanha de criadores e quero garantir minha bolsa na Cruzeiro do Sul.");
      document.getElementById('whatsappLink').href = "https://wa.me/5511999999999?text=" + whatsappMsg;

      document.getElementById('formState').style.display = 'none';
      document.getElementById('confirmationState').style.display = 'block';
    }

    // 6. Floating Sticky CTA Toggle using IntersectionObserver
    function setupIntersectionObserver() {
      const formSection = document.getElementById('formSection');
      const stickyCta = document.getElementById('stickyCta');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // If form is NOT visible, show floating CTA
          if (!entry.isIntersecting) {
            stickyCta.classList.add('visible');
          } else {
            stickyCta.classList.remove('visible');
          }
        });
      }, { threshold: 0.1 });

      observer.observe(formSection);
    }
    // 7. Toggle FAQ Accordion Item
    function toggleFaq(item) {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    }
  </script>
</body>
</html>`;
}
