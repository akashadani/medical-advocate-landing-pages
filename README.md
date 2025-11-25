# Medical Advocate Landing Pages

A collection of high-converting, mobile-optimized landing pages for medical bill negotiation services. Built for A/B testing with targeted ads for different audiences.

## 🎯 Landing Page Variants

All pages are designed for different target audiences:

1. **Generic** (`medical-advocate-generic.html`) - **Broad Audience**
   - Headline: "Reduce Your Medical Bills by 40-80%"
   - Badge: "NO WIN, NO FEE"
   - Target: Anyone with high medical bills

2. **New Parents** (`medical-advocate-parents.html`) - **Hospital Birth Bills**
   - Headline: "Hospital Birth Bills Shouldn't Bankrupt Your Family"
   - Badge: "FOR NEW PARENTS"
   - Target: New parents facing shocking delivery and newborn care charges

3. **Pet Owners** (`medical-advocate-pets.html`) - **Veterinary Bills**
   - Headline: "Your Pet Deserves Care Without the Financial Stress"
   - Badge: "FOR PET OWNERS"
   - Target: Pet owners with expensive emergency vet bills

## 🎨 Design Features

- **Navy blue gradient background** (#0a1128 → #1e3a5f → #2c5282)
- **Green accent color** (#10b981) for calls to action
- **Mobile-first** responsive design (max-width: 400px)
- **Glassmorphic UI** with backdrop blur effects
- **Above the fold** - Everything visible without scrolling
- **Toast notifications** for form submission feedback

## 📊 A/B Testing Setup

Each landing page automatically tracks its source for A/B testing:

- Generic: `?source=generic`
- New Parents: `?source=new-parents`
- Pet Owners: `?source=pet-owners`

Example URL for Facebook/Google Ads:
```
https://yourdomain.com/medical-advocate-generic.html?source=fb-ad-campaign-1
```

## 🔧 Setup Instructions

### 1. Google Apps Script Setup

The pages currently use the same Google Apps Script as the class action pages. All submissions go to Google Sheets with:
- **Timestamp** - When the form was submitted
- **Email** - User's email address
- **Source** - URL parameter for A/B test tracking
- **Project** - Set to "medical-advocate"

### 2. Deploy to Your Domain

Upload all HTML files to your web server or hosting platform (e.g., Vercel, Netlify).

## 📱 Testing Locally

Open any HTML file directly in your browser:

```bash
open medical-advocate-generic.html
```

Or serve with a local server:

```bash
python3 -m http.server 8000
```

Then visit: http://localhost:8000/medical-advocate-generic.html

## 📈 Tracking & Analytics

All form submissions are captured in Google Sheets with:
- **Timestamp** - When the form was submitted
- **Email** - User's email address
- **Source** - URL parameter for A/B test tracking
- **Project** - "medical-advocate" to separate from other projects

## 🚀 Optimization Tips

1. **Test different audiences** - Compare performance across generic, new parents, and pet owners
2. **Adjust the source parameter** - Track which ad campaign performs best
3. **Monitor conversion rates** - See which audience resonates most
4. **Refine messaging** - Update headlines based on performance data

## 🎯 Target Audiences

1. **Generic**: Anyone facing high medical bills who needs help negotiating
2. **New Parents**: People with newborns facing hospital delivery and NICU bills
3. **Pet Owners**: People with emergency vet bills for their pets

## 📝 License

Private project - All rights reserved
