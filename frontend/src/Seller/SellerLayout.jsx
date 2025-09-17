import SideNavSeller from "./SideNavSeller";

function SellerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideNavSeller />

      {/* Main content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

export default SellerLayout;
