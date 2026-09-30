export type BlogCategory =
  | "hospital"
  | "diagnosis"
  | "manufacturing";

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  image: string;
  slug: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Understanding the Importance of Regular Health Checkups",
    excerpt:
      "Regular health checkups can help identify potential health concerns early and support better long-term health.",
    category: "hospital",
    date: "2026-09-30",
    image: "/images/hospital/hospital-hero1.jpg",
    slug: "importance-of-regular-health-checkups",
    content: [
      "Regular health checkups are an important part of maintaining good health. They can help healthcare professionals identify potential health concerns and provide appropriate guidance.",

      "Many health conditions may not show obvious symptoms during their early stages. Regular medical consultations and appropriate screening can therefore provide valuable information about a person's health.",

      "At Afilas General Hospital, our healthcare professionals are committed to providing patient-centered healthcare services and supporting individuals in making informed decisions about their health.",

      "A healthy lifestyle, regular medical checkups, appropriate nutrition, physical activity, and early attention to health concerns can all contribute to better long-term wellbeing.",
    ],
  },

  {
    id: 2,
    title: "Why Accurate Diagnosis Matters in Modern Healthcare",
    excerpt:
      "Modern diagnostic services play an important role in helping healthcare professionals make informed treatment decisions.",
    category: "diagnosis",
    date: "2026-09-28",
    image: "/images/diagnosis/diagnosis-hero1.jpg",
    slug: "importance-of-accurate-diagnosis",
    content: [
      "Accurate diagnosis is an important part of modern healthcare. Healthcare professionals rely on clinical information, laboratory testing, imaging, and other diagnostic services to better understand a patient's condition.",

      "Reliable diagnostic information can support healthcare professionals when developing appropriate treatment and care plans.",

      "At Afilas Diagnosis Center, our goal is to provide dependable diagnostic services supported by appropriate technology and professional expertise.",

      "Patients should discuss their test results and health concerns with qualified healthcare professionals who can provide appropriate medical guidance.",
    ],
  },

  {
    id: 3,
    title: "Quality and Innovation in Pharmaceutical Manufacturing",
    excerpt:
      "Learn how quality standards, technology, and innovation contribute to reliable pharmaceutical manufacturing.",
    category: "manufacturing",
    date: "2026-09-26",
    image: "/images/manufacturing/manufacture11.jpg",
    slug: "quality-and-innovation-in-pharmaceutical-manufacturing",
    content: [
      "Pharmaceutical manufacturing plays an important role in making quality healthcare products available to communities.",

      "Quality control, appropriate manufacturing processes, research, technology, and regulatory compliance are important components of pharmaceutical manufacturing.",

      "Afilas Drug Manufacturing focuses on building capabilities that support the production of quality pharmaceutical products while promoting innovation and continuous improvement.",

      "The pharmaceutical industry continues to evolve as technology, research, and healthcare needs change.",
    ],
  },

  {
    id: 4,
    title: "Healthy Habits for a Better Life",
    excerpt:
      "Small and consistent lifestyle choices can contribute to healthier living and overall wellbeing.",
    category: "hospital",
    date: "2026-09-24",
    image: "/images/hospital/hospital-hero2.jpg",
    slug: "healthy-habits-for-a-better-life",
    content: [
      "Healthy habits can play an important role in supporting overall wellbeing and maintaining a balanced lifestyle.",

      "Regular physical activity, balanced nutrition, adequate rest, and appropriate medical care can contribute to long-term health.",

      "Small and consistent changes to daily routines can help individuals build healthier habits over time.",

      "If you have specific health concerns, it is important to discuss them with a qualified healthcare professional.",
    ],
  },

  {
    id: 5,
    title: "The Role of Laboratory Testing in Healthcare",
    excerpt:
      "Laboratory testing provides valuable information that supports diagnosis, monitoring, and treatment.",
    category: "diagnosis",
    date: "2026-09-22",
    image: "/images/diagnosis/diagnosis-hero2.jpg",
    slug: "role-of-laboratory-testing",
    content: [
      "Laboratory testing provides valuable information that can support healthcare professionals in understanding a patient's health condition.",

      "Different laboratory tests can provide information about blood, urine, and other samples depending on the patient's healthcare needs.",

      "Accurate laboratory results can support diagnosis, monitoring, and treatment decisions when interpreted by qualified healthcare professionals.",

      "At Afilas Diagnosis Center, dependable diagnostic services are an important part of supporting quality healthcare.",
    ],
  },

  {
    id: 6,
    title: "Building a Stronger Pharmaceutical Future",
    excerpt:
      "Discover how pharmaceutical manufacturing can support access to quality healthcare products.",
    category: "manufacturing",
    date: "2026-09-20",
    image: "/images/manufacturing/manufacture22.jpg",
    slug: "building-a-stronger-pharmaceutical-future",
    content: [
      "Pharmaceutical manufacturing can contribute to the availability of healthcare products and support the development of local healthcare capabilities.",

      "Technology, research, quality systems, skilled professionals, and appropriate manufacturing processes are important components of a strong pharmaceutical industry.",

      "Continuous improvement and innovation can help pharmaceutical manufacturers respond to changing healthcare needs.",

      "Afilas Drug Manufacturing aims to contribute to a stronger pharmaceutical future through quality-focused manufacturing and continuous development.",
    ],
  },
];