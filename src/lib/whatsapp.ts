// Shared by client buttons and the tracker: one place for the number and the course message.
export const WA_NUMBER = "201226929392";

export const WA_COURSE = {
  slug: "excel-powerbi-ai-freelance",
  name: "Excel + Power BI + AI + Freelancing",
  message: "مرحبًا، عايز أستفسر عن كورس Excel + Power BI + AI + Freelancing.",
};

export const waCourseUrl = () => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_COURSE.message)}`;

// Attributes the click tracker reads; keeps campaign data out of the WhatsApp message itself.
export const waCourseAttrs = (location: string) => ({ "data-wa-location": location, "data-wa-course": WA_COURSE.name });
