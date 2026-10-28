import StudentNav from "@/app/components/StudentNav";

export default function JobsLayout({
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