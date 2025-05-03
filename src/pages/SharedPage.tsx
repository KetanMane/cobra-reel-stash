
import { SidebarProvider } from "@/hooks/useSidebar";
import { ReelsProvider, useReels } from "@/hooks/useReels";
import { Sidebar } from "@/components/Sidebar";
import { ReelCard } from "@/components/ReelCard";
import { EmptyState } from "@/components/EmptyState";
import { useSidebar } from "@/hooks/useSidebar";

// Separate component that uses the hooks inside the providers
function SharedContent() {
  const { reels } = useReels();
  const { isExpanded } = useSidebar();
  
  // For now, we'll show a placeholder since we don't have actual sharing functionality
  const sharedReels = reels.slice(0, 2); // Just showing a couple of reels as "shared" for demonstration
  
  return (
    <div className="flex-1 ml-16">
      <div className={`flex-1 container py-6 space-y-6 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png" alt="CobraSave" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Shared</h1>
          </div>
        </div>
        
        <div className="space-y-4">
          {sharedReels.length === 0 ? (
            <EmptyState type="all" category="All" />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sharedReels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main export wraps the content with providers
export default function SharedPage() {
  return (
    <SidebarProvider>
      <ReelsProvider>
        <div className="flex">
          <Sidebar />
          <SharedContent />
        </div>
      </ReelsProvider>
    </SidebarProvider>
  );
}
