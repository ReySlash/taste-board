import SideNav from "@/components/side-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mx-auto w-full h-[calc(100vh-3.5rem)] flex flex-row">
        <SideNav />
        <div className="flex-1 overflow-y-auto p-2">{children}</div>
      </div>
    </>
  );
}
