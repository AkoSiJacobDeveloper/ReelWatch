export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white font-[Poppins] antialiased">
            {children}
        </div>
    );
};