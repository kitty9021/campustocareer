import StudentNav from "@/app/components/StudentNav";

export default function MyApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudentNav />
      {children}
    </>
  );
}