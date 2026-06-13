import CardsGrid from "@/components/cards-grid";
import SideNav from "@/components/sidenav";

function CocktailsPage() {
  return (
    <div className="mx-auto w-full h-[calc(100vh-3.5rem)] flex flex-row">
      <SideNav />
      <CardsGrid />
    </div>
  );
}

export default CocktailsPage;
