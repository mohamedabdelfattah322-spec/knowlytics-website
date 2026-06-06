import { MetadataRoute } from "next";
import courses from "@/data/courses.json";
import blog from "@/data/blog.json";

const BASE_URL = "https://knowlyticshub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages (AR is default, no prefix)
  const staticPages = [
    { path: "", priority: 1.0, changeFreq: "daily" as const },
    { path: "/courses", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/student-projects", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/services", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/about", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/instructor", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/testimonials", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/contact", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/excel-assessment", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/interview-assessment", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/lms", priority: 0.6, changeFreq: "monthly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(({ path, priority, changeFreq }) => [
    // Arabic (default — no prefix)
    {
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: changeFreq,
      priority,
      alternates: {
        languages: {
          ar: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    },
    // English
    {
      url: `${BASE_URL}/en${path}`,
      lastModified: now,
      changeFrequency: changeFreq,
      priority: priority - 0.05,
      alternates: {
        languages: {
          ar: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    },
  ]);

  // Course pages
  const courseEntries: MetadataRoute.Sitemap = courses.flatMap((course) => [
    {
      url: `${BASE_URL}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          ar: `${BASE_URL}/courses/${course.slug}`,
          en: `${BASE_URL}/en/courses/${course.slug}`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
    },
  ]);

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = blog.flatMap((post) => [
    {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          ar: `${BASE_URL}/blog/${post.slug}`,
          en: `${BASE_URL}/en/blog/${post.slug}`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.70,
    },
  ]);

  return [...staticEntries, ...courseEntries, ...blogEntries];
}
