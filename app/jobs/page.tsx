
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

const PAGE_SIZE = 10;

const CATEGORIES: Record<string, string> = {
  it: "IT & Software",
  design: "Design",
  marketing: "Marketing",
  business: "Business & HR",
  finance: "Finance & Accounting",
  data: "Data & AI",
  "customer-support": "Customer Support",
  supply: "Supply Chain & Logistics",
  education: "Education",
  engineering: "Engineering",
};

type CategoryKey = keyof typeof CATEGORIES;

// Every supplied job title is manually assigned to one category.
// Do not add category values to Supabase.

const CATEGORY_JOBS: Record<CategoryKey, string[]> = {
  // 1. IT & SOFTWARE
  it: [
    ".NET Developer Fresher",
    "Android Developer Intern",
    "Angular Developer Fresher",
    "Application Support Associate",
    "C++ Developer Trainee",
    "Cloud Engineer Trainee",
    "Cybersecurity Analyst Trainee",
    "Database Administrator Trainee",
    "DevOps Engineer Trainee",
    "Ethical Hacking Intern",
    "Flutter App Developer Intern",
    "Frontend Developer Intern",
    "Full Stack Developer Intern",
    "Game Developer Intern",
    "Helpdesk Support Trainee",
    "iOS Developer Intern",
    "IT Support Associate",
    "Java Backend Developer (Fresher)",
    "Manual Tester Fresher",
    "Network Engineer Trainee",
    "Node.js Developer Trainee",
    "PHP Developer Trainee",
    "Python Developer Intern",
    "QA Test Engineer Trainee",
    "React Developer Trainee",
    "React Native Developer Intern",
    "Service Desk Analyst",
    "Site Reliability Engineer Trainee",
    "Software Developer Trainee",
    "Software Engineer Trainee",
    "SQL Developer Intern",
    "Technical Support Engineer",
    "UI Developer Intern",
    "Vue.js Developer Intern",
  ],

  // 2. DESIGN
  design: [
    "3D Artist Intern",
    "Animation Designer Intern",
    "Brand Designer Trainee",
    "CAD Designer Intern",
    "Creative Design Intern",
    "Design Production Assistant",
    "Design Research Assistant",
    "Exhibition Designer Intern",
    "Fashion Design Assistant",
    "Figma Designer Intern",
    "Graphic Designer Intern",
    "Illustrator Intern",
    "Interaction Designer Trainee",
    "Interior Design Assistant",
    "Junior CAD Drafter",
    "Layout Designer Trainee",
    "Motion Graphics Designer Intern",
    "Multimedia Designer Trainee",
    "Packaging Designer Trainee",
    "Photo Editor Trainee",
    "Photoshop Designer Intern",
    "Presentation Designer Intern",
    "Print Designer Trainee",
    "Product Design Intern",
    "UI UX Designer Intern",
    "UI/UX Design Intern",
    "UX Research Intern",
    "Video Editor Intern",
    "Visual Designer Intern",
    "Web Designer Trainee",
  ],

  // 3. MARKETING
  marketing: [
    "Advertising Operations Intern",
    "Affiliate Marketing Intern",
    "Brand Associate Trainee",
    "Brand Marketing Intern",
    "Campaign Management Intern",
    "Community Manager Intern",
    "Content Marketing Intern",
    "Content Strategist Intern",
    "Content Writer Intern",
    "Copywriter Trainee",
    "Digital Campaign Assistant",
    "Digital Marketing Executive",
    "E-commerce Marketing Intern",
    "Email Marketing Intern",
    "Growth Marketing Associate",
    "Influencer Marketing Intern",
    "Lead Generation Executive",
    "Market Development Associate",
    "Market Research Intern",
    "Marketing Analyst Trainee",
    "Marketing Communications Trainee",
    "Marketing Operations Associate",
    "Performance Marketing Intern",
    "Public Relations Intern",
    "SEO Executive Trainee",
    "Social Media Analyst Trainee",
    "Social Media Manager Intern",
    "Social Media Marketing Intern",
    "Technical Content Writer",
  ],

  // 4. BUSINESS & HR
  business: [
    "Admin Executive",
    "Business Analyst Trainee",
    "Business Development Associate",
    "Business Development Intern",
    "Business Operations Analyst",
    "Business Planning Intern",
    "Business Process Associate",
    "Client Relationship Executive",
    "Client Service Coordinator",
    "Compensation and Benefits Trainee",
    "Compliance Associate Intern",
    "Compliance Operations Associate",
    "Corporate Relations Associate",
    "EdTech Operations Associate",
    "Employee Engagement Intern",
    "Executive Assistant Trainee",
    "HR Generalist Trainee",
    "HR Operations Executive",
    "HR Recruiter Trainee",
    "Learning and Development Intern",
    "Management Consulting Trainee",
    "Management Trainee",
    "Office Coordinator Trainee",
    "Operations Executive Trainee",
    "Project Coordinator Trainee",
    "Recruitment Coordinator Intern",
    "School Administration Trainee",
    "Sourcing Associate",
    "Strategy Analyst Intern",
    "Talent Acquisition Associate",
    "Workforce Planning Assistant",
  ],

  // 5. FINANCE & ACCOUNTING
  finance: [
    "Accounts Audit Intern",
    "Accounts Executive Trainee",
    "Accounts Payable Associate",
    "Accounts Receivable Associate",
    "Audit Associate Trainee",
    "Banking Operations Trainee",
    "Banking Relationship Executive",
    "Billing Executive Trainee",
    "Collections Executive",
    "Cost Accounting Trainee",
    "Credit Analyst Trainee",
    "Finance Operations Executive",
    "Financial Analyst Trainee",
    "Financial Operations Associate",
    "Financial Planning Assistant",
    "GST and Taxation Executive",
    "Insurance Operations Associate",
    "Investment Operations Associate",
    "Investment Research Intern",
    "Junior Accountant",
    "KYC Analyst Trainee",
    "Loan Processing Associate",
    "Mortgage Processing Associate",
    "Payroll Associate Trainee",
    "Reconciliation Analyst Trainee",
    "Risk Analyst Trainee",
    "Tax Associate Intern",
    "Trade Finance Trainee",
    "Treasury Operations Intern",
  ],

  // 6. DATA & AI
  data: [
    "AI Data Annotator",
    "AI Research Intern",
    "AI/ML Research Assistant",
    "Analytics Consultant Intern",
    "Big Data Intern",
    "Business Intelligence Analyst Trainee",
    "Computer Vision Intern",
    "Customer Feedback Analyst",
    "Customer Insights Intern",
    "Data Analyst Trainee",
    "Data Engineer Trainee",
    "Data Entry Operator",
    "Data Governance Intern",
    "Data Migration Associate",
    "Data Operations Intern",
    "Data Processing Associate",
    "Data Quality Analyst Trainee",
    "Data Scientist Intern",
    "Data Visualization Intern",
    "Healthcare Data Analyst Trainee",
    "Junior Data Analyst",
    "Junior Reporting Analyst",
    "Machine Learning Intern",
    "Machine Learning Operations Intern",
    "NLP Research Intern",
    "Power BI Developer Intern",
    "Predictive Analytics Trainee",
    "Python Data Analyst Trainee",
    "Research Data Assistant",
    "Statistical Analyst Trainee",
    "Tableau Developer Intern",
  ],

  // 7. CUSTOMER SUPPORT
  "customer-support": [
    "After-Sales Support Executive",
    "Bilingual Support Associate",
    "Call Center Associate",
    "Chat Support Executive",
    "Client Support Associate",
    "Complaint Resolution Executive",
    "Customer Care Executive",
    "Customer Experience Associate",
    "Customer Onboarding Executive",
    "Customer Relations Executive",
    "Customer Retention Associate",
    "Customer Service Representative",
    "Customer Success Associate",
    "Customer Support Associate",
    "Customer Support Associate (Chat)",
    "Customer Support Associate (Voice)",
    "Customer Support Executive",
    "E-commerce Support Executive",
    "Email Support Associate",
    "Escalation Management Trainee",
    "Product Support Associate",
    "Support Operations Trainee",
    "Technical Customer Support Intern",
  ],

  // 8. SUPPLY CHAIN & LOGISTICS
  supply: [
    "Demand Planning Intern",
    "Dispatch Coordinator",
    "Distribution Executive Trainee",
    "Export Documentation Assistant",
    "Fleet Operations Coordinator",
    "Freight Operations Trainee",
    "Import Export Assistant",
    "Inventory Coordinator",
    "Logistics Coordinator Trainee",
    "Logistics Data Entry Associate",
    "Logistics Support Executive",
    "Materials Management Trainee",
    "Order Fulfilment Associate",
    "Packaging Operations Trainee",
    "Procurement Analyst Trainee",
    "Procurement Executive Trainee",
    "Purchase Executive Trainee",
    "Route Planning Intern",
    "Shipping Operations Associate",
    "Stock Control Associate",
    "Stores Executive Trainee",
    "Supply Chain Analyst Trainee",
    "Supply Chain Executive Trainee",
    "Supply Chain Operations Intern",
    "Supply Planning Trainee",
    "Transport Coordinator",
    "Vendor Management Executive",
    "Warehouse Documentation Assistant",
    "Warehouse Operations Associate",
  ],

  // 9. EDUCATION
  education: [
    "Academic Content Reviewer",
    "Academic Counselor Trainee",
    "Academic Documentation Assistant",
    "Assessment Developer Intern",
    "Course Development Assistant",
    "Curriculum Developer Intern",
    "Digital Learning Assistant",
    "E-learning Content Developer",
    "Education Program Coordinator",
    "Educational Content Writer",
    "Educational Research Intern",
    "English Language Tutor",
    "Exam Coordinator Intern",
    "Instructional Design Intern",
    "Language Trainer Trainee",
    "Learning Experience Designer Intern",
    "Learning Support Assistant",
    "Library Assistant Trainee",
    "Mathematics Tutor Intern",
    "Online Learning Support Associate",
    "Online Tutor (Computer Science)",
    "Science Tutor Trainee",
    "Special Education Assistant",
    "Student Success Associate",
    "Subject Matter Expert Intern",
    "Teaching Assistant",
    "Teaching Fellow",
    "Training Coordinator Intern",
  ],

  // 10. ENGINEERING
  engineering: [
    "Automation Engineer Trainee",
    "Automation Test Engineer Trainee",
    "Automobile Engineer Trainee",
    "Biomedical Engineer Intern",
    "Civil Site Engineer Trainee",
    "Drafting Engineer Intern",
    "Electrical Engineer Trainee",
    "Electrical Maintenance Trainee",
    "Electronics Engineer Trainee",
    "Embedded Systems Engineer Trainee",
    "Environmental Engineer Intern",
    "HVAC Design Trainee",
    "Industrial Engineer Intern",
    "Instrumentation Engineer Trainee",
    "Maintenance Engineer Trainee",
    "Manufacturing Engineer Trainee",
    "Materials Engineer Trainee",
    "Mechanical Design Engineer Trainee",
    "Mechanical Testing Engineer",
    "Mechatronics Engineer Intern",

    "Plant Operations Engineer",
    "Process Engineer Intern",
    "Production Engineer Trainee",
    "Production Planning Assistant",
    "Quality Assurance Engineer Trainee",
    "Quality Control Engineer Trainee",
    "Quality Inspection Associate",
    "Renewable Energy Engineer Intern",
    "Robotics Engineer Intern",
    "Site Planning Engineer Trainee",
    "Solar Design Engineer Trainee",
    "Structural Design Assistant",
  ],
};

// Create exact title-to-category mapping.
// Duplicate titles are automatically assigned to the same category.
const JOB_CATEGORY_MAP = new Map<string, CategoryKey>();

for (const category of Object.keys(CATEGORY_JOBS) as CategoryKey[]) {
  for (const title of CATEGORY_JOBS[category]) {
    const normalizedTitle = title.trim().toLowerCase();

    if (JOB_CATEGORY_MAP.has(normalizedTitle)) {
      console.warn(`Duplicate category mapping: ${title}`);
    }

    JOB_CATEGORY_MAP.set(normalizedTitle, category);
  }
}

function getJobCategory(title: string): CategoryKey {
  const normalizedTitle = (title ?? "").trim().toLowerCase();

  return JOB_CATEGORY_MAP.get(normalizedTitle) ?? "it";
}

type Params = Promise<{
  q?: string;
  location?: string;
  category?: string;
  page?: string;
}>;

export default function JobsPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  return (
    <main className="bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Find your first job
        </h1>

        <p className="text-gray-600 mt-1 mb-6">
          Search openings for students and freshers.
        </p>

        <Suspense
          fallback={
            <p className="text-gray-600">Loading jobs...</p>
          }
        >
          <JobsList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

// Preserve filters when changing pages
function pageLink(
  q: string | undefined,
  location: string | undefined,
  category: string | undefined,
  page: number
) {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (location) params.set("location", location);
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const s = params.toString();

  return s ? `/jobs?${s}` : "/jobs";
}

// Fetch, classify and filter jobs
async function JobsList({
  searchParams,
}: {
  searchParams: Params;
}) {
  const {
    q,
    location,
    category,
    page: pageParam,
  } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const term = (q ?? "").trim().toLowerCase();
  const loc = (location ?? "").trim().toLowerCase();

  const cat =
    category && category in CATEGORIES
      ? category as CategoryKey
      : null;

  // Fetch jobs without using the Supabase category column.
  const {
    data: allJobs,
    error,
  } = await supabase
    .from("jobs")
    .select("id, title, company, location, description, created_at")
    .order("created_at", { ascending: false });

  // Fetch current user's applications
  const { data: myApps } = await supabase
    .from("applications")
    .select("job_id, status")
    .eq("student_id", user.id);

  const appliedMap = new Map(
    (myApps ?? []).map((a) => [
      a.job_id as string,
      a.status as string,
    ])
  );

  // Classify and filter jobs before pagination
  const filteredJobs = (allJobs ?? []).filter((job) => {
    const jobCategory = getJobCategory(job.title ?? "");

    if (cat && jobCategory !== cat) {
      return false;
    }

    if (
      loc &&
      !(job.location ?? "").toLowerCase().includes(loc)
    ) {
      return false;
    }

    if (term) {
      const title = (job.title ?? "").toLowerCase();
      const jobLocation = (job.location ?? "").toLowerCase();

      if (loc) {
        if (!title.includes(term)) return false;
      } else {
        if (
          !title.includes(term) &&
          !jobLocation.includes(term)
        ) {
          return false;
        }
      }
    }

    return true;
  });

  const total = filteredJobs.length;

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE)
  );

  const requestedPage = Math.max(
    1,
    parseInt(pageParam ?? "1", 10) || 1
  );

  const page = Math.min(requestedPage, totalPages);

  const from = (page - 1) * PAGE_SIZE;
  const jobs = filteredJobs.slice(from, from + PAGE_SIZE);

  const hasFilters = Boolean(term || loc || cat);

  return (
    <>
      {/* Search Form */}
      <form className="flex flex-col sm:flex-row gap-2 mb-4">
        {cat && category && (
          <input
            type="hidden"
            name="category"
            value={category}
          />
        )}

        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Job title"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
        />

        <input
          type="text"
          name="location"
          defaultValue={location ?? ""}
          placeholder="City or location"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-red-600">
          Error: {error.message}
        </p>
      )}

      {/* Results Information */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-gray-500">
        <span>
          {total} {total === 1 ? "job" : "jobs"} found
          {cat ? ` in ${CATEGORIES[cat]}` : ""}
          {term ? ` for "${term}"` : ""}
          {loc ? ` in "${loc}"` : ""}
          {total > 0 ? ` · Page ${page} of ${totalPages}` : ""}
        </span>

        {hasFilters && (
          <Link
            href="/jobs"
            className="text-blue-600 underline"
          >
            Clear filters
          </Link>
        )}
      </div>

      {/* No Jobs Found */}
      {jobs.length === 0 && (
        <div className="bg-white p-8 rounded-xl text-center text-gray-600">
          No jobs found. Try a different title or city.
        </div>
      )}

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.map((job) => {
          const myStatus = appliedMap.get(job.id);

          return (
            <div
              key={job.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 hover:shadow-md transition"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                {(job.company ?? "C").charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h2>

                <p className="text-gray-700 text-sm">
                  {job.company}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {job.location}
                  </span>

                  {myStatus && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      ✓ {myStatus}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {job.description}
                </p>
              </div>

              <Link
                href={`/jobs/${job.id}`}
                className="sm:self-center text-center bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
              >
                {myStatus ? "View application" : "View details"}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          {page > 1 ? (
            <Link
              href={pageLink(q, location, category, page - 1)}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 text-gray-400">
              ← Previous
            </span>
          )}

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={pageLink(q, location, category, page + 1)}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 text-gray-400">
              Next →
            </span>
          )}
        </div>
      )}
    </>
  );
}
