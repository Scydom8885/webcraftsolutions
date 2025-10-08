const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Portfolio data
const portfolioProjects = [
  {
    id: 'ecoshop',
    title: 'EcoShop ',
    category: 'Design Showcase',
    client: 'Concept Development',
    shortDescription: 'A modern e-commerce design concept showcasing sustainable retail website development approach.',
    fullDescription: 'A comprehensive e-commerce design concept created to demonstrate modern web development approaches for sustainable retail brands. This concept showcases clean design principles, user experience planning, and technical architecture suitable for eco-conscious businesses targeting millennial consumers.',
    mobileDescription: 'Modern e-commerce design concept showcasing sustainable retail development approach.',
    features: [
      'Product catalog with filters',
      'Shopping cart',
      'Inventory management system',
      'Customer reviews & ratings',
      'Wishlist',
      'Payment integration ',
      'SEO-friendly page structure',

    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Express.js'],
    designFeatures: [
      'Clean, trust-building eco-friendly design',
      'Mobile-first responsive approach',
      'Optimized product discovery flow',
      'Professional admin dashboard concept'
    ],
    designPhilosophy: {
      text: "This concept demonstrates my approach to e-commerce design: focusing on user trust, clean aesthetics, and conversion-optimized layouts. Every element serves a purpose in guiding users toward purchase decisions.",
      approach: "User-Centered Design",
      focus: "Trust & Conversion Optimization"
    },
    images: {
      hero: '/images/portfolio1/ecoshop-hero.png',
      heroMobile: '/images/portfolio1/ecoshop-hero-mobile.webp',
      heroDesktop: '/images/portfolio1/ecoshop-hero-desktop.webp',
      desktop: '/images/portfolio1/ecoshop-desktop.png',
      mobile: '/images/portfolio1/ecoshop-mobile.png',
      dashboard: '/images/portfolio1/ecoshop-dashboard.png',

    },
    liveUrl: 'https://ecoshop-demo.com',
    featured: true
  },
  {
    id: 'braisedporkking',
    title: 'Braised Pork King',
    category: 'F&B Website',
    client: 'Restaurant Business',
    shortDescription: 'A delicious restaurant website showcasing authentic braised pork dishes.',
    fullDescription: 'A comprehensive restaurant website designed to showcase authentic braised pork dishes and create an appetizing online presence for the business.',
    mobileDescription: 'Restaurant website for Braised Pork King - showcasing authentic dishes.',
    features: [
      'Menu showcase',
      'Online ordering',
      'Location & hours',
      'Photo gallery',
      'Customer testimonials',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    designFeatures: [
      'Appetizing food photography',
      'Mobile-first responsive design',
      'Easy-to-navigate menu',
      'Fast loading optimized images'
    ],
    designPhilosophy: {
      text: "This design focuses on making visitors hungry through beautiful food photography and easy navigation to drive orders.",
      approach: "Visual-First Design",
      focus: "Conversion & Appetite Appeal"
    },
    images: {
      hero: '/images/portfolio2/bpk_bpk_desktop.webp',
      heroMobile: '/images/portfolio2/bpk_bpk_mobile.webp',
      heroDesktop: '/images/portfolio2/bpk_bpk_desktop.webp',
    },
    liveUrl: '#',
    featured: true
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    pageTitle: 'Web Craft Solutions | Professional Web Development for Businesses',
    portfolioProjects: portfolioProjects.filter(p => p.featured)
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { 
    pageTitle: 'Our Portfolio | Web Craft Solutions',
    portfolioProjects
  });
});

app.get('/portfolio/:id', (req, res) => {
  const project = portfolioProjects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).render('404', {
      pageTitle: 'Project Not Found | Web Craft Solutions'
    });
  }
  res.render('project-detail', { 
    pageTitle: `${project.title} | Web Craft Solutions Portfolio`,
    project
  });
});

app.get('/price',(req,res) => {
  res.render('price',{
    pageTitle:'Package Plan | Pricing | Quatation '
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', { 
    pageTitle: 'Contact Us | Web Craft Solutions'
  });
});

// Contact form handler
app.post('/contact', (req, res) => {
  const { name, email, phone, projectType, budget, message } = req.body;
  
  // Here you would typically send an email or save to database
  console.log('Contact form submission:', { name, email, phone, projectType, budget, message });
  
  res.json({ success: true, message: 'Thank you! We\'ll contact you within 2 hours.' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found | Web Craft Solutions'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Web Craft Solutions server running on http://localhost:${PORT}`);
  console.log(`💼 Ready to showcase amazing portfolios!`);
});